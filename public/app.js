// ============================================
// Student Gift Marketplace — Frontend Logic
// ============================================

// State
let currentCategory = '';
let currentSearch = '';
let currentSort = 'newest';
let currentOfferTypes = [];
let currentLocationTypes = [];
let allBrands = [];
let nextCursor = null;
let isLoading = false;
let hasMore = true;
let claimedGiftIds = new Set(); // Track which gifts the user has claimed

// Auth guard — redirect to login if no token
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '/login.html';
}

// Decode JWT to get student name (simple base64 decode, no validation)
function getStudentName() {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.username || 'Student';
    } catch {
        return 'Student';
    }
}

// Display student name
document.getElementById('studentName').textContent = getStudentName().toUpperCase();

// Logout
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}

// Show message toast
function showMessage(text, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Fetch brands for sidebar
async function loadBrands() {
    try {
        const response = await fetch('/api/brands');
        if (response.ok) {
            allBrands = await response.json();
            renderBrandFilters();
        }
    } catch (error) {
        console.error('Failed to load brands:', error);
    }
}

// Render brand checkboxes
function renderBrandFilters() {
    const container = document.getElementById('brandsSection');
    allBrands.forEach(brand => {
        const div = document.createElement('div');
        div.className = 'filter-option';
        div.innerHTML = `
            <input type="checkbox" id="brand_${brand.id}" value="${brand.name}" class="brand-checkbox">
            <label for="brand_${brand.id}">${brand.name}</label>
        `;
        container.appendChild(div);
    });

    // Add change listeners
    document.querySelectorAll('.brand-checkbox').forEach(cb => {
        cb.addEventListener('change', () => {
            resetAndLoad();
        });
    });
}

// Build query string from current filters
function buildQueryString() {
    const params = new URLSearchParams();
    params.append('limit', 9); // 3x3 grid

    if (currentCategory) params.append('category', currentCategory);
    if (currentSearch) params.append('search', currentSearch);
    if (currentSort) params.append('sort', currentSort);
    if (currentOfferTypes.length > 0) params.append('offer_type', currentOfferTypes[0]);
    if (currentLocationTypes.length > 0) params.append('location_type', currentLocationTypes[0]);

    // Brand filter — append each checked brand separately for multi-brand support
    const checkedBrands = Array.from(document.querySelectorAll('.brand-checkbox:checked'));
    checkedBrands.forEach(cb => {
        params.append('brand', cb.value);
    });

    // Cursor-based pagination for infinite scroll
    if (nextCursor) {
        params.append('cursor', nextCursor);
    }

    return params.toString();
}

// Reset state and reload gifts (called when filters change)
function resetAndLoad() {
    nextCursor = null;
    hasMore = true;
    document.getElementById('giftsContainer').innerHTML = '';
    loadGifts();
}

// Load gifts from API (appends to existing content for infinite scroll)
async function loadGifts() {
    if (isLoading || !hasMore) return;
    isLoading = true;

    const container = document.getElementById('giftsContainer');
    const loading = document.getElementById('loadingMessage');
    const scrollLoading = document.getElementById('scrollLoading');

    // Show initial loading only on first load
    if (!nextCursor) {
        loading.style.display = 'block';
    } else {
        scrollLoading.style.display = 'block';
    }

    try {
        const response = await fetch(`/api/gifts?${buildQueryString()}`);

        if (response.status === 401) {
            logout();
            return;
        }

        const result = await response.json();
        loading.style.display = 'none';
        scrollLoading.style.display = 'none';

        if (!nextCursor && result.data.length === 0) {
            container.innerHTML = '<p style="padding: 40px; text-align: center; color: #666;">No gifts found.</p>';
            hasMore = false;
            isLoading = false;
            return;
        }

        renderGifts(result.data);

        // Update cursor for next page
        nextCursor = result.meta.nextCursor;
        hasMore = nextCursor !== null;

    } catch (error) {
        loading.style.display = 'none';
        scrollLoading.style.display = 'none';
        if (!nextCursor) {
            container.innerHTML = '<p style="padding: 40px; text-align: center; color: #c00;">Failed to load gifts.</p>';
        }
    }

    isLoading = false;
}

// Render gift cards (appends to container for infinite scroll)
function renderGifts(gifts) {
    const container = document.getElementById('giftsContainer');

    gifts.forEach(gift => {
        const card = document.createElement('div');
        card.className = 'gift-card';

        const expiryDate = gift.expiry_date ? new Date(gift.expiry_date).toLocaleDateString() : 'No expiry';
        const isClaimed = claimedGiftIds.has(gift.id);

        card.innerHTML = `
            <div class="gift-card-image">[IMAGE]</div>
            <div class="gift-card-content">
                <div class="gift-card-title">${gift.title}</div>
                <div class="gift-card-meta">${gift.category.toUpperCase()} • ${gift.offer_type} • Expires: ${expiryDate}</div>
                <div class="gift-card-description">${gift.description || ''}</div>
                <div class="gift-card-terms">${gift.terms || ''}</div>
                <div class="gift-card-brand">${gift.brand_name}</div>
                <button
                    class="btn-claim${isClaimed ? ' claimed' : ''}"
                    id="claim-btn-${gift.id}"
                    onclick="claimGift(${gift.id})"
                    ${isClaimed ? 'disabled' : ''}
                >${isClaimed ? 'Claimed' : 'Claim'}</button>
            </div>
        `;

        container.appendChild(card);
    });
}

// Claim a gift
async function claimGift(giftId) {
    try {
        const response = await fetch(`/api/gifts/${giftId}/claim`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Gift claimed successfully!', 'success');
            // Mark as claimed and update the button
            claimedGiftIds.add(giftId);
            const btn = document.getElementById(`claim-btn-${giftId}`);
            if (btn) {
                btn.textContent = 'Claimed';
                btn.disabled = true;
                btn.classList.add('claimed');
            }
        } else if (response.status === 409) {
            // Already claimed — update UI to reflect
            claimedGiftIds.add(giftId);
            const btn = document.getElementById(`claim-btn-${giftId}`);
            if (btn) {
                btn.textContent = 'Claimed';
                btn.disabled = true;
                btn.classList.add('claimed');
            }
            showMessage('You have already claimed this gift', 'error');
        } else {
            showMessage(data.error || 'Failed to claim gift', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    }
}

// Category tab clicks
document.getElementById('categoryTabs').addEventListener('click', (e) => {
    if (e.target.classList.contains('tab')) {
        // Update active state
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');

        // Update filter
        currentCategory = e.target.dataset.category;
        resetAndLoad();
    }
});

// Search input
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        currentSearch = e.target.value.trim();
        resetAndLoad();
    }, 500); // Debounce 500ms
});

// Sort radio buttons
document.querySelectorAll('input[name="sortOrder"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        currentSort = e.target.value;
        resetAndLoad();
    });
});

// Offer type checkboxes
document.getElementById('filterOnline').addEventListener('change', (e) => {
    currentOfferTypes = e.target.checked ? ['online'] : [];
    // Uncheck the other
    if (e.target.checked) document.getElementById('filterInstore').checked = false;
    resetAndLoad();
});

document.getElementById('filterInstore').addEventListener('change', (e) => {
    currentOfferTypes = e.target.checked ? ['in-store'] : [];
    // Uncheck the other
    if (e.target.checked) document.getElementById('filterOnline').checked = false;
    resetAndLoad();
});

// Location type checkboxes
['locNationwide', 'locLocal', 'locOnlineOnly'].forEach(id => {
    document.getElementById(id).addEventListener('change', (e) => {
        if (e.target.checked) {
            currentLocationTypes = [e.target.value];
            // Uncheck others
            ['locNationwide', 'locLocal', 'locOnlineOnly'].forEach(otherId => {
                if (otherId !== id) {
                    document.getElementById(otherId).checked = false;
                }
            });
        } else {
            currentLocationTypes = [];
        }
        resetAndLoad();
    });
});

// Infinite scroll — load more when near bottom
window.addEventListener('scroll', () => {
    if (isLoading || !hasMore) return;

    const scrollY = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Trigger load when within 200px of bottom
    if (scrollY >= docHeight - 200) {
        loadGifts();
    }
});

// Initialize
loadBrands();
loadGifts();
