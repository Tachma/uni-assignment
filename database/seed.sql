-- ============================================
-- Student Gift Marketplace — Seed Data
-- ============================================

-- ============================
-- Students (password: password123)
-- Hash generated with bcryptjs, 10 rounds
-- ============================
INSERT OR IGNORE INTO students (username, email, password_hash) VALUES
    ('student1', 'student1@university.edu', '$2b$10$y7iMiTW4./Tihk/kAbLUmuzIfdgmC7347Vq4WdvR/o/MPwWldb/b6');

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
-- Gifts (36 total — 6 per brand)
-- ============================

-- PizzaFan gifts (brand_id = 1, category = food)
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (1,  1, '20% Off Any Large Pizza',       'Get 20% off any large pizza of your choice.',                   'food',     'Valid on orders above €10. Cannot combine with other offers.', 'https://example.com/gifts/pizza-discount.jpg',   'in-store',  'nationwide', '2026-01-15 10:00:00', '2026-06-30 23:59:59'),
    (2,  1, 'Free Garlic Bread',             'Free garlic bread with any pizza order.',                       'food',     'One per order. Dine-in only.',                                'https://example.com/gifts/garlic-bread.jpg',     'in-store',  'local',      '2026-02-01 12:00:00', '2026-05-15 23:59:59'),
    (13, 1, 'Family Pizza Deal',             'Buy 2 large pizzas and get a 3rd one free.',                    'food',     'Dine-in and takeaway. Valid on weekends only.',               'https://example.com/gifts/family-deal.jpg',      'in-store',  'nationwide', '2026-01-05 09:00:00', '2026-07-15 23:59:59'),
    (14, 1, 'Free Dessert Pizza',            'Get a free dessert pizza with any order over €15.',             'food',     'While stocks last. One per order.',                            'https://example.com/gifts/dessert-pizza.jpg',    'in-store',  'local',      '2026-02-10 14:00:00', '2026-04-30 23:59:59'),
    (15, 1, '€5 Off Online Orders',          'Get €5 off your next online order over €20.',                   'food',     'Online orders only. One use per student.',                     'https://example.com/gifts/pizza-online.jpg',     'online',    'online-only','2026-01-22 11:00:00', '2026-08-31 23:59:59'),
    (16, 1, 'Student Lunch Special',         'Any personal pizza + drink for €5.99.',                         'food',     'Valid Mon-Fri, 11am-3pm. Dine-in only.',                       'https://example.com/gifts/lunch-special.jpg',    'in-store',  'local',      '2026-02-06 08:00:00', '2026-06-15 23:59:59');

-- CoffeeIsland gifts (brand_id = 2, category = food)
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (3,  2, 'Buy 1 Get 1 Free Freddo',       'Buy one freddo espresso and get one free.',                    'food',     'Available at all CoffeeIsland locations.',                    'https://example.com/gifts/freddo-bogo.jpg',      'in-store',  'nationwide', '2026-01-20 09:00:00', '2026-04-30 23:59:59'),
    (4,  2, '€2 Off Any Brunch Combo',        'Get €2 off any brunch combo meal.',                            'food',     'Valid Monday-Friday only.',                                   'https://example.com/gifts/brunch-discount.jpg',  'in-store',  'local',      '2026-02-05 08:00:00', '2026-07-31 23:59:59'),
    (17, 2, 'Free Cookie with Any Coffee',    'Get a free cookie with any coffee purchase.',                  'food',     'One per visit. All locations.',                                'https://example.com/gifts/cookie-coffee.jpg',    'in-store',  'nationwide', '2026-01-08 10:00:00', '2026-05-31 23:59:59'),
    (18, 2, '30% Off Iced Beverages',         'Save 30% on all iced beverages this summer.',                  'food',     'Cannot combine with other offers.',                            'https://example.com/gifts/iced-drinks.jpg',      'in-store',  'nationwide', '2026-02-12 07:00:00', '2026-09-15 23:59:59'),
    (19, 2, 'Free Upgrade to Large',          'Get a free size upgrade on any hot beverage.',                 'food',     'Valid at participating locations.',                             'https://example.com/gifts/size-upgrade.jpg',     'in-store',  'local',      '2026-01-28 13:00:00', '2026-06-30 23:59:59'),
    (20, 2, 'Loyalty Card Kickstart',         'Start with 5 stamps on your CoffeeIsland loyalty card.',       'food',     'New loyalty card sign-ups only.',                               'https://example.com/gifts/loyalty-card.jpg',     'in-store',  'nationwide', '2026-01-12 09:00:00', '2026-12-31 23:59:59');

-- Plaisio gifts (brand_id = 3, category = tech)
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (5,  3, '15% Off Laptop Accessories',     'Get 15% off all laptop accessories — cases, chargers & more.', 'tech',     'Online and in-store. Excludes Apple accessories.',            'https://example.com/gifts/laptop-acc.jpg',        'both',      'nationwide', '2026-01-10 10:00:00', '2026-08-31 23:59:59'),
    (6,  3, 'Free Wireless Mouse',            'Free wireless mouse with any laptop purchase over €500.',      'tech',     'While stocks last. One per customer.',                        'https://example.com/gifts/wireless-mouse.jpg',    'both',      'nationwide', '2026-02-10 11:00:00', '2026-05-31 23:59:59'),
    (21, 3, '€20 Off Any Tablet',             'Get €20 off any tablet priced over €200.',                     'tech',     'One per student. Cannot combine with other offers.',           'https://example.com/gifts/tablet-discount.jpg',   'both',      'nationwide', '2026-01-03 12:00:00', '2026-07-31 23:59:59'),
    (22, 3, 'Free Screen Protector',          'Free screen protector with any smartphone purchase.',          'tech',     'While stocks last. In-store only.',                             'https://example.com/gifts/screen-protector.jpg',  'in-store',  'local',      '2026-02-08 15:00:00', '2026-04-15 23:59:59'),
    (23, 3, '10% Off Printers',               'Save 10% on all printers and printing supplies.',              'tech',     'Online orders only. Includes ink cartridges.',                 'https://example.com/gifts/printer-deal.jpg',      'online',    'online-only','2026-01-18 10:00:00', '2026-06-30 23:59:59'),
    (24, 3, 'Free USB Hub',                   'Get a free 4-port USB hub with any purchase over €100.',       'tech',     'While stocks last. One per customer.',                          'https://example.com/gifts/usb-hub.jpg',           'both',      'nationwide', '2026-02-03 09:00:00', '2026-08-15 23:59:59');

-- Alterlife gifts (brand_id = 4, category = fitness)
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (7,  4, '30% Off Protein Supplements',    'Save 30% on all protein powders and bars.',                    'fitness',  'Cannot combine with loyalty discounts.',                      'https://example.com/gifts/protein.jpg',           'both',      'nationwide', '2026-01-25 14:00:00', '2026-06-15 23:59:59'),
    (8,  4, 'Free Gym Bag',                   'Get a free Alterlife gym bag with purchases over €40.',        'fitness',  'While stocks last.',                                          'https://example.com/gifts/gym-bag.jpg',           'in-store',  'local',      '2026-02-08 10:00:00', '2026-04-15 23:59:59'),
    (25, 4, 'Free Shaker Bottle',             'Get a free shaker bottle with any supplement purchase.',       'fitness',  'One per customer. While stocks last.',                          'https://example.com/gifts/shaker.jpg',            'both',      'nationwide', '2026-01-02 08:00:00', '2026-05-31 23:59:59'),
    (26, 4, '€10 Off Vitamins',               'Get €10 off any vitamin pack priced over €30.',                'fitness',  'Cannot combine with other promotions.',                         'https://example.com/gifts/vitamins.jpg',          'online',    'online-only','2026-02-11 16:00:00', '2026-07-15 23:59:59'),
    (27, 4, '20% Off Fitness Apparel',        'Save 20% on all Alterlife-branded fitness clothing.',          'fitness',  'Online and in-store. Excludes sale items.',                     'https://example.com/gifts/fitness-apparel.jpg',   'both',      'nationwide', '2026-01-14 11:00:00', '2026-09-30 23:59:59'),
    (28, 4, 'Free Personal Training Session', 'Get one free personal training session at partner gyms.',      'fitness',  'Must book in advance. Subject to availability.',               'https://example.com/gifts/pt-session.jpg',        'in-store',  'local',      '2026-02-04 07:00:00', '2026-06-30 23:59:59');

-- Zara gifts (brand_id = 5, category = fashion)
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (9,  5, '€10 Off on Orders Above €50',    'Get €10 off when you spend €50 or more.',                      'fashion',  'Online only. One use per student.',                           'https://example.com/gifts/zara-discount.jpg',     'online',    'online-only','2026-01-30 16:00:00', '2026-07-15 23:59:59'),
    (10, 5, 'Free Shipping on All Orders',    'Enjoy free shipping on any order — no minimum.',               'fashion',  'Valid for standard shipping only.',                           'https://example.com/gifts/zara-shipping.jpg',     'online',    'online-only','2026-02-12 09:00:00', '2026-09-30 23:59:59'),
    (29, 5, '15% Off New Collection',         'Get 15% off any item from the new season collection.',         'fashion',  'Online only. One use per student.',                             'https://example.com/gifts/zara-new.jpg',          'online',    'online-only','2026-01-06 10:00:00', '2026-06-15 23:59:59'),
    (30, 5, 'Free Accessory',                 'Get a free scarf or belt with any purchase over €60.',         'fashion',  'While stocks last. In-store only.',                             'https://example.com/gifts/zara-accessory.jpg',    'in-store',  'local',      '2026-02-09 14:00:00', '2026-05-15 23:59:59'),
    (31, 5, '€20 Off Orders Above €100',      'Get €20 off when you spend €100 or more.',                     'fashion',  'Online and in-store. Cannot combine with other offers.',        'https://example.com/gifts/zara-big-discount.jpg', 'both',      'nationwide', '2026-01-24 12:00:00', '2026-08-31 23:59:59'),
    (32, 5, 'Early Access to Sales',          'Get 24h early access to Zara seasonal sales.',                 'fashion',  'Online only. Invite sent via email.',                           'https://example.com/gifts/zara-early.jpg',        'online',    'online-only','2026-02-02 18:00:00', '2026-12-31 23:59:59');

-- Cosmote gifts (brand_id = 6, category = telecom)
INSERT OR IGNORE INTO gifts (id, brand_id, title, description, category, terms, image_url, offer_type, location_type, created_at, expiry_date) VALUES
    (11, 6, '5GB Free Mobile Data',           'Get 5GB of free mobile data for 30 days.',                     'telecom',  'New activations only. Auto-expires after 30 days.',           'https://example.com/gifts/cosmote-data.jpg',      'online',    'online-only','2026-02-01 00:00:00', '2026-12-31 23:59:59'),
    (12, 6, '50% Off Student Mobile Plan',    'Get 50% off the Cosmote Student plan for 6 months.',           'telecom',  'Requires student ID verification.',                           'https://example.com/gifts/cosmote-plan.jpg',      'both',      'nationwide', '2026-01-18 10:00:00', '2026-08-15 23:59:59'),
    (33, 6, 'Free 100 SMS Bundle',            'Get 100 free SMS messages valid for 30 days.',                 'telecom',  'One-time activation. Cannot combine with other bundles.',       'https://example.com/gifts/cosmote-sms.jpg',       'online',    'online-only','2026-01-09 15:00:00', '2026-06-30 23:59:59'),
    (34, 6, '10GB Weekend Data Boost',        'Get an extra 10GB of data every weekend for 2 months.',        'telecom',  'Existing Cosmote subscribers only.',                            'https://example.com/gifts/cosmote-weekend.jpg',   'online',    'online-only','2026-02-07 10:00:00', '2026-05-31 23:59:59'),
    (35, 6, '€5 Off Monthly Bill',            'Get €5 off your next monthly Cosmote bill.',                   'telecom',  'Postpaid customers only. Applied automatically.',               'https://example.com/gifts/cosmote-bill.jpg',      'online',    'nationwide', '2026-01-16 08:00:00', '2026-04-30 23:59:59'),
    (36, 6, 'Free International Calls Pack',  'Get 60 minutes of free international calls for 30 days.',      'telecom',  'Valid to EU countries only.',                                   'https://example.com/gifts/cosmote-intl.jpg',      'online',    'online-only','2026-02-13 12:00:00', '2026-10-31 23:59:59');
