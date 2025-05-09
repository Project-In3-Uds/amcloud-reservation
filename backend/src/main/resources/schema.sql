CREATE TABLE IF NOT EXISTS reservation (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    traveler_name VARCHAR(255),
    destination VARCHAR(255),
    agency_name VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS reservation_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    traveler_name VARCHAR(255),
    destination VARCHAR(255),
    agency_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);