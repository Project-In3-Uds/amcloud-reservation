-- Drop existing tables
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS reservation_history;
-- Create tables
CREATE TABLE reservation (
    id BIGSERIAL PRIMARY KEY,
    traveler_name VARCHAR(255),
    destination VARCHAR(255),
    agency_name VARCHAR(255)
);
CREATE TABLE reservation_history (
    id BIGSERIAL PRIMARY KEY,
    traveler_name VARCHAR(255),
    destination VARCHAR(255),
    agency_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);