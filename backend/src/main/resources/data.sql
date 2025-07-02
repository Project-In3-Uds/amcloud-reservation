INSERT INTO reservation (traveler_name, destination, agency_name, depart, heure_depart, classe) VALUES
('Alice', 'Paris', 'AgenceAlpha','lom', '2024-06-03', 'VIP'),
('Bob', 'New York', 'AgenceBeta', 'pekin', '2024-06-04', 'Standard');
INSERT INTO agence (id, nom, logo, couleurs, localisation, theme_color_primary, theme_color_secondary, logo_url, description, ville, quartier) VALUES
(1, 'AgenceAlpha', 'logo_alpha.png', 'blue', 'Paris', '#0000FF', '#FFFFFF', 'https://example.com/logo_alpha.png', 'Agence de voyage spécialisée dans les circuits en Europe.', 'Paris', 'Centre'),
(2, 'AgenceBeta', 'logo_beta.png', 'green', 'Lyon', '#00FF00', '#FFFFFF', 'https://example.com/logo_beta.png', 'Agence de voyage offrant des services en Asie.', 'Lyon', 'Part-Dieu');
INSERT INTO trajet (ville_depart,ville_arrivee, distance, id_agence) VALUES
('Paris', 'Lyon', 450.0, 1),
('Lyon', 'Marseille', 320.0, 1),
('New York', 'Los Angeles', 4500.0, 2),
('Pekin', 'Shanghai', 1200.0, 2);
INSERT INTO bus (immatriculation, capacite, id_trajet, id_agence) VALUES
('AB-123-CD', 50, 1, 1),
('EF-456-GH', 40, 2, 1),
('IJ-789-KL', 60, 1, 2),
('MN-012-OP', 30, 2, 2);
INSERT INTO seat (numero, id_bus) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 2),
(5, 2),
(6, 3),
(7, 3),
(8, 4),
(9, 4);
INSERT INTO reservation_history (traveler_name, destination, agency_name, depart, heure_depart, classe) VALUES
('Alice', 'Paris', 'AgenceAlpha', 'lom', '2024-06-03', 'VIP'),
('Bob', 'New York', 'AgenceBeta', 'pekin', '2024-06-04', 'Standard');
