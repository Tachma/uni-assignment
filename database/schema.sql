-- ============================================
-- Student Gift Marketplace — Database Schema
-- ============================================

-- Enable foreign key support
PRAGMA foreign_keys = ON;

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    NOT NULL UNIQUE,
    email         TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL
);

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT NOT NULL,
    logo_url TEXT
);

-- Gifts table
CREATE TABLE IF NOT EXISTS gifts (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_id      INTEGER NOT NULL,
    title         TEXT    NOT NULL,
    description   TEXT,
    category      TEXT    NOT NULL,
    terms         TEXT,
    image_url     TEXT,
    offer_type    TEXT    NOT NULL CHECK (offer_type IN ('online', 'in-store', 'both')),
    location_type TEXT    NOT NULL CHECK (location_type IN ('nationwide', 'local', 'online-only')),
    created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
    expiry_date   TEXT,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);

-- Coupons table (one claim per student per gift)
CREATE TABLE IF NOT EXISTS coupons (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    gift_id    INTEGER NOT NULL,
    claimed_at TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (gift_id)    REFERENCES gifts(id)    ON DELETE CASCADE,
    UNIQUE (student_id, gift_id)
);
