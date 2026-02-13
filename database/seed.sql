-- ============================================
-- Student Gift Marketplace — Seed Data
-- ============================================

-- ============================
-- Students (password: password123)
-- Hash generated with bcryptjs, 10 rounds
-- ============================
INSERT OR IGNORE INTO students (username, email, password_hash) VALUES
    ('student1', 'student1@university.edu', '$2b$10$y7iMiTW4./Tihk/kAbLUmuzIfdgmC7347Vq4WdvR/o/MPwWldb/b6'),
    ('student2', 'student2@university.edu', '$2b$10$y7iMiTW4./Tihk/kAbLUmuzIfdgmC7347Vq4WdvR/o/MPwWldb/b6');

-- ============================
-- Brands
-- ============================
INSERT OR IGNORE INTO brands (id, name, logo_url) VALUES
    (1, 'PizzaFan',     'https://example.com/logos/pizzafan.png'),
    (2, 'CoffeeIsland', 'https://example.com/logos/coffeeisland.png'),
    (3, 'Plaisio',      'https://example.com/logos/plaisio.png'),
    (4, 'Alterlife',    'https://example.com/logos/alterlife.png'),
    (5, 'Zara',         'https://example.com/logos/zara.png'),
    (6, 'Cosmote',      'https://example.com/logos/cosmote.png');

-- ============================
-- Gifts (12 total)
-- ============================

-- PizzaFan gifts
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (1,  1, '20% Off Any Large Pizza',       'Get 20% off any large pizza of your choice.',                   'food',     'Valid on orders above €10. Cannot combine with other offers.', 'https://example.com/gifts/pizza-discount.jpg',   'in-store',  'nationwide', '2026-01-15 10:00:00', '2026-06-30 23:59:59'),
    (2,  1, 'Free Garlic Bread',             'Free garlic bread with any pizza order.',                       'food',     'One per order. Dine-in only.',                                'https://example.com/gifts/garlic-bread.jpg',     'in-store',  'local',      '2026-02-01 12:00:00', '2026-05-15 23:59:59');

-- CoffeeIsland gifts
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (3,  2, 'Buy 1 Get 1 Free Freddo',       'Buy one freddo espresso and get one free.',                    'food',     'Available at all CoffeeIsland locations.',                    'https://example.com/gifts/freddo-bogo.jpg',      'in-store',  'nationwide', '2026-01-20 09:00:00', '2026-04-30 23:59:59'),
    (4,  2, '€2 Off Any Brunch Combo',        'Get €2 off any brunch combo meal.',                            'food',     'Valid Monday-Friday only.',                                   'https://example.com/gifts/brunch-discount.jpg',   'in-store',  'local',      '2026-02-05 08:00:00', '2026-07-31 23:59:59');

-- Plaisio gifts
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (5,  3, '15% Off Laptop Accessories',     'Get 15% off all laptop accessories — cases, chargers & more.', 'tech',     'Online and in-store. Excludes Apple accessories.',            'https://example.com/gifts/laptop-acc.jpg',        'both',      'nationwide', '2026-01-10 10:00:00', '2026-08-31 23:59:59'),
    (6,  3, 'Free Wireless Mouse',            'Free wireless mouse with any laptop purchase over €500.',      'tech',     'While stocks last. One per customer.',                        'https://example.com/gifts/wireless-mouse.jpg',    'both',      'nationwide', '2026-02-10 11:00:00', '2026-05-31 23:59:59');

-- Alterlife gifts
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (7,  4, '30% Off Protein Supplements',    'Save 30% on all protein powders and bars.',                    'fitness',  'Cannot combine with loyalty discounts.',                      'https://example.com/gifts/protein.jpg',           'both',      'nationwide', '2026-01-25 14:00:00', '2026-06-15 23:59:59'),
    (8,  4, 'Free Gym Bag',                   'Get a free Alterlife gym bag with purchases over €40.',        'fitness',  'While stocks last.',                                          'https://example.com/gifts/gym-bag.jpg',           'in-store',  'local',      '2026-02-08 10:00:00', '2026-04-15 23:59:59');

-- Zara gifts
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (9,  5, '€10 Off on Orders Above €50',    'Get €10 off when you spend €50 or more.',                      'fashion',  'Online only. One use per student.',                           'https://example.com/gifts/zara-discount.jpg',     'online',    'online-only','2026-01-30 16:00:00', '2026-07-15 23:59:59'),
    (10, 5, 'Free Shipping on All Orders',    'Enjoy free shipping on any order — no minimum.',               'fashion',  'Valid for standard shipping only.',                           'https://example.com/gifts/zara-shipping.jpg',     'online',    'online-only','2026-02-12 09:00:00', '2026-09-30 23:59:59');

-- Cosmote gifts
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (11, 6, '5GB Free Mobile Data',           'Get 5GB of free mobile data for 30 days.',                     'telecom',  'New activations only. Auto-expires after 30 days.',           'https://example.com/gifts/cosmote-data.jpg',      'online',    'online-only','2026-02-01 00:00:00', '2026-12-31 23:59:59'),
    (12, 6, '50% Off Student Mobile Plan',    'Get 50% off the Cosmote Student plan for 6 months.',           'telecom',  'Requires student ID verification.',                           'https://example.com/gifts/cosmote-plan.jpg',      'both',      'nationwide', '2026-01-18 10:00:00', '2026-08-15 23:59:59');
