// ============================================
// Student Gift Marketplace — Frontend Logic
// ============================================

// State
let currentPage = 1;
let currentCategory = '';
let currentSearch = '';
let currentOfferTypes = [];
let currentLocationTypes = [];
let currentBrandFilter = '';
let allBrands = [];

// Auth guard — redirect to login if no token
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '/login.html';
}

// Decode JWT to get student name (simple base64 decode, no validation)
function getStudentEmail() {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.email || 'Student';
    } catch {
        return 'Student';
    }
}

// Display student name
document.getElementById('studentName').textContent = getStudentEmail().split('@')[0].toUpperCase();

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
            currentPage = 1;
            loadGifts();
        });
    });
}

// Build query string from current filters
function buildQueryString() {
    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', 9); // 3x3 grid

    if (currentCategory) params.append('category', currentCategory);
    if (currentSearch) params.append('search', currentSearch);
    if (currentOfferTypes.length > 0) params.append('offer_type', currentOfferTypes[0]);
    if (currentLocationTypes.length > 0) params.append('location_type', currentLocationTypes[0]);

    // Brand filter uses search
    const checkedBrands = Array.from(document.querySelectorAll('.brand-checkbox:checked'));
    if (checkedBrands.length > 0) {
        // Just search for the first checked brand
        params.set('search', checkedBrands[0].value);
    }

    return params.toString();
}

// Load gifts from API
async function loadGifts() {
    const container = document.getElementById('giftsContainer');
    const loading = document.getElementById('loadingMessage');
    const paginationContainer = document.getElementById('paginationContainer');

    loading.style.display = 'block';
    container.innerHTML = '';
    paginationContainer.innerHTML = '';

    try {
        const response = await fetch(`/gifts?${buildQueryString()}`);

        if (response.status === 401) {
            logout();
            return;
        }

        const result = await response.json();
        loading.style.display = 'none';

        if (result.data.length === 0) {
            container.innerHTML = '<p style="padding: 40px; text-align: center; color: #666;">No gifts found.</p>';
            return;
        }

        renderGifts(result.data);
        renderPagination(result.meta);

    } catch (error) {
        loading.style.display = 'none';
        container.innerHTML = '<p style="padding: 40px; text-align: center; color: #c00;">Failed to load gifts.</p>';
    }
}

// Render gift cards
function renderGifts(gifts) {
    const container = document.getElementById('giftsContainer');

    gifts.forEach(gift => {
        const card = document.createElement('div');
        card.className = 'gift-card';

        const expiryDate = gift.expiry_date ? new Date(gift.expiry_date).toLocaleDateString() : 'No expiry';

        card.innerHTML = `
            <div class="gift-card-image">[IMAGE]</div>
            <div class="gift-card-content">
                <div class="gift-card-title">${gift.title}</div>
                <div class="gift-card-meta">${gift.category.toUpperCase()} • ${gift.offer_type} • Expires: ${expiryDate}</div>
                <div class="gift-card-description">${gift.description || ''}</div>
                <div class="gift-card-terms">${gift.terms || ''}</div>
                <div class="gift-card-brand">${gift.brand_name}</div>
                <button class="btn-claim" onclick="claimGift(${gift.id})">Claim</button>
            </div>
        `;

        container.appendChild(card);
    });
}

// Render pagination
function renderPagination(meta) {
    const container = document.getElementById('paginationContainer');

    for (let i = 1; i <= meta.totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = `page-btn ${i === meta.page ? 'active' : ''}`;
        btn.textContent = i;
        btn.onclick = () => {
            currentPage = i;
            loadGifts();
        };
        container.appendChild(btn);
    }
}

// Claim a gift
async function claimGift(giftId) {
    try {
        const response = await fetch(`/gifts/${giftId}/claim`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Gift claimed successfully!', 'success');
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
        currentPage = 1;
        loadGifts();
    }
});

// Search input
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        currentSearch = e.target.value.trim();
        currentPage = 1;
        loadGifts();
    }, 500); // Debounce 500ms
});

// Offer type checkboxes
document.getElementById('filterOnline').addEventListener('change', (e) => {
    currentOfferTypes = e.target.checked ? ['online'] : [];
    currentPage = 1;
    loadGifts();
});

document.getElementById('filterInstore').addEventListener('change', (e) => {
    currentOfferTypes = e.target.checked ? ['in-store'] : [];
    currentPage = 1;
    // Uncheck the other
    document.getElementById('filterOnline').checked = false;
    loadGifts();
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
        currentPage = 1;
        loadGifts();
    });
});

// Initialize
loadBrands();
loadGifts();
