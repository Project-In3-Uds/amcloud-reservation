-- Drop existing tables
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS reservation_history;
DROP TABLE IF EXISTS agence CASCADE;
DROP TABLE IF EXISTS trajet CASCADE;
DROP TABLE IF EXISTS bus CASCADE;
DROP TABLE IF EXISTS seat CASCADE;
DROP TABLE IF EXISTS trip CASCADE;
DROP TABLE IF EXISTS user_account CASCADE;
DROP TABLE IF EXISTS personnel;
DROP TABLE IF EXISTS ticket;
-- Drop existing tables for IAM integration
-- Create tables
CREATE TABLE reservation (
    id BIGSERIAL PRIMARY KEY,
    traveler_name VARCHAR(255),
    destination VARCHAR(255),
    agency_name VARCHAR(255),
    depart VARCHAR(255),
    heure_depart TIMESTAMP,
    classe VARCHAR(20)
);
CREATE TABLE reservation_history (
    id BIGSERIAL PRIMARY KEY,
    traveler_name VARCHAR(255),
    destination VARCHAR(255),
    agency_name VARCHAR(255),
    depart VARCHAR(255),
    heure_depart TIMESTAMP,
    classe VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table des agences
-- Table des agences enrichie pour personnalisation
CREATE TABLE agence (
    id BIGSERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    couleurs VARCHAR(255),
    localisation VARCHAR(255),
    theme_color_primary VARCHAR(20),      -- Couleur principale
    theme_color_secondary VARCHAR(20),    -- Couleur secondaire
    logo_url VARCHAR(255),                -- URL du logo
    description TEXT,                     -- Description de l'agence
    ville VARCHAR(100),                   -- Ville
    quartier VARCHAR(100)                 -- Quartier
);
-- Table des trajets (itinéraires proposés par une agence)
CREATE TABLE trajet (
    id BIGSERIAL PRIMARY KEY,
    ville_depart VARCHAR(255) NOT NULL,
    ville_arrivee VARCHAR(255) NOT NULL,
    distance DOUBLE PRECISION,
    id_agence BIGINT NOT NULL,
    description TEXT, -- Description du trajet
    heure_depart TIME, -- Heure de départ
    heure_arrivee TIME, -- Heure d'arrivée
    FOREIGN KEY (id_agence) REFERENCES agence(id)
);

-- Table des bus (liés à un trajet et une agence)
CREATE TABLE bus (
    id BIGSERIAL PRIMARY KEY,
    immatriculation VARCHAR(50) NOT NULL,
    capacite INT NOT NULL,
    id_trajet BIGINT NOT NULL,
    id_agence BIGINT NOT NULL,
    FOREIGN KEY (id_trajet) REFERENCES trajet(id),
    FOREIGN KEY (id_agence) REFERENCES agence(id)
);

-- Table des places (liées à un bus)
CREATE TABLE seat (
    id BIGSERIAL PRIMARY KEY,
    numero INT NOT NULL,
    etat VARCHAR(20) DEFAULT 'libre',
    id_bus BIGINT NOT NULL,
    FOREIGN KEY (id_bus) REFERENCES bus(id)
);

-- Table des voyages (un voyage = un bus sur un trajet à une date donnée)
CREATE TABLE trip (
    id BIGSERIAL PRIMARY KEY,
    date_depart TIMESTAMP NOT NULL,
    id_trajet BIGINT NOT NULL,
    id_bus BIGINT NOT NULL,
    id_agence BIGINT NOT NULL,
    FOREIGN KEY (id_trajet) REFERENCES trajet(id),
    FOREIGN KEY (id_bus) REFERENCES bus(id),
    FOREIGN KEY (id_agence) REFERENCES agence(id)
);

-- Table des utilisateurs (liés à IAM)
CREATE TABLE user_account (
    id BIGSERIAL PRIMARY KEY,
    iam_id BIGINT NOT NULL, -- ID dans le service IAM
    username VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Table du personnel d'agence
CREATE TABLE personnel (
    id BIGSERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    poste VARCHAR(100),
    id_agence BIGINT NOT NULL,
    user_account_id BIGINT, -- Lien vers user_account
    FOREIGN KEY (id_agence) REFERENCES agence(id),
    FOREIGN KEY (user_account_id) REFERENCES user_account(id)
);

-- Table des tickets (réservation d'une place sur un voyage par un utilisateur)
CREATE TABLE ticket (
    id BIGSERIAL PRIMARY KEY,
    id_trip BIGINT NOT NULL,
    id_seat BIGINT NOT NULL,
    id_user_account BIGINT NOT NULL,
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_trip) REFERENCES trip(id),
    FOREIGN KEY (id_seat) REFERENCES seat(id),
    FOREIGN KEY (id_user_account) REFERENCES user_account(id)
);