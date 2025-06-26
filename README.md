# amcloud-reservation

## Description
amcloud-reservation is the Reservation microservice for the amcloud-platform ecosystem.  
It handles reservation creation, updates, and retrieval, enabling seamless integration with other microservices.

## Prerequisites

- Java JDK 17 or higher
- Maven 3.9+
- PostgreSQL (default database service) must be running and correctly configured
- [Optional] Docker (for deployment)
- Git

## Repository Structure

```
amcloud-reservation/
├── backend/                      # Main Spring Boot Reservation source code
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/cm/amcloud/platform/reservation/
│   │   │   │   ├── config/       # Configuration classes (e.g., database)
│   │   │   │   ├── service/      # Business logic and service layer
│   │   │   │   ├── controller/   # REST API controllers
│   │   │   │   ├── repository/   # Data access layer (JPA repositories)
│   │   │   │   ├── dto/          # Data Transfer Objects
│   │   │   │   ├── model/        # Entity classes (database models)
│   │   │   ├── resources/        # Application resources (e.g., .env, keys, SQL scripts)
│   │   │   │   ├── schema.sql    # Database schema
│   │   │   │   ├── data.sql      # Initial data for the database
│   │   │   │   ├── application.yml # Spring Boot configuration
│   │   │   │   ├── application.properties # Additional properties
│   │   ├── test/                 # Unit and integration tests
│   ├── pom.xml                   # Maven configuration file
│   ├── Dockerfile                # Docker configuration for the Reservation service
│   ├── mvnw                      # Maven wrapper script (Linux/Mac)
│   ├── mvnw.cmd                  # Maven wrapper script (Windows)
│   ├── .mvn/                     # Maven wrapper configuration
│   ├── .gitignore                # Git ignore file
│   ├── LICENSE                   # License file
│   ├── README.md                 # Project overview and instructions
├── .github/                      # GitHub workflows, issue templates, etc.
├── docs/                         # Documentation and diagrams
└── README.md
```

## Environment Configuration

A `.env` file **must** be present at the root of `backend/` before running or testing the microservice.  
Example content:

```
# Environment variables for the Reservation service
RESERVATION_SERVER_PORT=8083

# === Database config
RESERVATION_DB_URL=jdbc:postgresql://localhost:5432/amcloud_reservation_db
RESERVATION_DB_USERNAME=amcloud_admin
RESERVATION_DB_PASSWORD=amcloud_pass
RESERVATION_DB_DRIVER_CLASS_NAME=org.postgresql.Driver
JPA_DATABASE_PLATFORM=org.hibernate.dialect.PostgreSQLDialect
SQL_INIT_MODE=always
JPA_HIBERNATE_DDL_AUTO=update
```

> ⚠️ **Never commit sensitive values (tokens, passwords) into the repository.**  
> Use placeholders and configure secrets securely in your deployment environments.

## Installation & Build

```bash
git clone https://github.com/Project-In3-Uds/amcloud-reservation.git
cd amcloud-reservation/backend
mvn clean install
```

## Running the Microservice

You can start the Reservation server with:

```bash
mvn spring-boot:run
```

Or build the JAR and run:

```bash
mvn package
java -jar target/reservation-0.0.1-SNAPSHOT.jar
```

## Basic API Usage

By default, the Reservation server runs on `http://localhost:8083/`.

To create a reservation:
```bash
curl -X POST http://localhost:8083/api/reservations/create -d '{"travelerName":"Alice","destination":"Paris","agencyName":"AgenceAlpha"}' -H "Content-Type: application/json"
```

To list all reservations:
```bash
curl -X GET http://localhost:8083/api/reservations/list
```
You can also use the existing reservation-test.http rest client file.

## Technologies Used

- Java 17
- Spring Boot 3.x (Reservation)
- Maven
- Docker (optional)
- PostgreSQL (Database)
- GitHub Actions (CI/CD)

## Architecture Overview

```mermaid
sequenceDiagram
    actor Utilisateur
    participant Gateway as "API Gateway"
    participant IAM as "IAM Service"
    participant ConfigServer as "Config Server"
    participant Reservation as "Reservation Service"
    participant ReservationDB as "Reservation DB"

    %% Service startup and configuration retrieval
    Reservation->>ConfigServer: Demande de configurations au démarrage
    ConfigServer-->>Reservation: Fournit les configurations nécessaires
    Note right of Reservation: Récupération des propriétés (DB_URL, etc.)

    %% User request flow through Gateway (authenticated)
    Utilisateur->>Gateway: Requête API (ex: POST /reservations/create) avec JWT
    Gateway->>Gateway: Valide JWT (signature, expiration) avec clés JWKS et vérifie les scopes/rôles
    Note right of Gateway: Utilise les clés JWKS récupérées précédemment auprès de l'IAM

    alt JWT Valide et Droits d'Accès Suffisants
        Gateway->>Reservation: Forward la requête (avec X-User-ID, X-Roles)
        Reservation->>Reservation: Exécute la logique métier (ex: créer une nouvelle réservation)
        Reservation->>ReservationDB: Enregistre/Met à jour les données (avec vérification interne des droits basés sur X-Roles)
        ReservationDB-->>Reservation: Confirmation de l'opération BD
        Reservation-->>Gateway: Réponse du service de Réservation
        Gateway-->>Utilisateur: Retourne la réponse API (Succès)
    else JWT Invalide ou Expiré
        Gateway--xUtilisateur: 401 Unauthorized (JWT invalide)
    else Droits d'Accès Insuffisants
        Gateway--xUtilisateur: 403 Forbidden (Rôles/Scopes insuffisants)
    end
```

## Known Issues / Limitations

- Requires a database for reservation management.
- No rate-limiting or advanced security features by default (consider adding these in production).
- Hot-reloading of configurations is dependent on client microservice capabilities.

## Support / Contact

- For questions or support, [open an issue](https://github.com/Project-In3-Uds/amcloud-reservation/issues).
- For real-time discussion, contact us at project.in3.uds@outlook.com.

## Contribution

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before submitting a pull request.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Credits

Developed by Project-In3-Uds contributors.  
Special thanks to all open-source libraries and the community!
