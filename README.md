# Hackathon-starter (Seva Platform)

Hackathon Starter Repository for the **Seva Platform**.

Seva Platform is a scalable full-stack solution designed for:
- mobile users,
- web users, and
- backend service integrations.

This repository serves as a **starter blueprint** and implementation baseline. It defines:
- platform scope,
- architecture and boundaries,
- recommended technology stack,
- directory conventions to be followed by all teams,
- required hackathon submission artifacts.

---

## 1) Platform Scope

The target platform consists of:
- **Seva Mobile App** (Android + iOS)
- **Seva Web App** (browser access)
- **Seva Backend Platform** (APIs, business rules, persistence)

All client applications must communicate only through secured APIs.

---

## 2) Repository Structure (Target Standard)

```text
.
├── seva_mobile/        # React Native mobile application
├── seva_ui/            # Web UI application (React or Angular)
├── seva_platform/      # Backend platform (Java + Spring Boot)
└── README.md           # Project documentation
```

---

## 3) High-Level Architecture

> Clients do not communicate with database services directly.

```text
Mobile App (React Native) ──┐
                            ├──> Backend APIs (Spring Boot) ───> Database (MySQL 8.x)
Web UI (React / Angular) ───┘
```

---

## 4) Module Structure to be Followed

### 4.1 `seva_mobile/`

```text
seva_mobile/
├── android/                 # Android native project
├── ios/                     # iOS native project
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/             # App screens
│   ├── navigation/          # Navigation setup
│   ├── services/            # API services
│   ├── store/               # State management
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utilities
│   └── assets/              # Images, fonts, icons
├── .env
├── package.json
└── tsconfig.json
```

### 4.2 `seva_ui/`

```text
seva_ui/
├── src/
│   ├── components/          # Shared UI components
│   ├── pages/               # Route-based pages
│   ├── layouts/             # App layouts
│   ├── services/            # API clients
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Helper utilities
│   └── assets/              # Static assets
├── public/
├── .env
├── package.json
└── tsconfig.json
```

### 4.3 `seva_platform/`

```text
seva_platform/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/seva/platform/
│   │   │       ├── controller/     # REST controllers
│   │   │       ├── service/        # Business logic
│   │   │       ├── repository/     # Database repositories
│   │   │       ├── model/          # Entity models
│   │   │       ├── dto/            # Request/response DTOs
│   │   │       ├── security/       # Authentication & security
│   │   │       └── config/         # Configuration classes
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── db/migration/       # Flyway migrations
│   └── test/
├── Dockerfile
├── pom.xml / build.gradle
└── README.md
```

---

## 5) Recommended Technology Stack (Latest Stable)

- **Mobile**: React Native + TypeScript
- **Web UI**: React + TypeScript (Angular acceptable)
- **Backend**: Java 21 + Spring Boot 3.x
- **Database**: MySQL 8.x
- **API**: REST + OpenAPI (Swagger)
- **Security**: Spring Security + JWT/OAuth2
- **Infra / DevOps**: Docker, CI/CD, cloud-ready deployment templates

---

## 6) Current Implementation in This Repository (Web Starter)

This repository currently contains a working **web starter application** built with:
- Vite
- React + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion

Current implemented modules/pages include:
- Explore, Branches, Panchanga, Youth Quiz
- Services (Seva Booking, Room Booking)
- Profile, Notifications
- Login and Signup routes

> This acts as the `seva_ui` seed implementation and can be extracted into `/seva_ui` in a full mono-repo setup.

---

## 7) Local Setup (Current Web Starter)

### Prerequisites
- Node.js 18+
- npm 9+

### Install and Run

```bash
npm install
npm run dev
```

### Build and Validate

```bash
npm run lint
npm run test
npm run build
```

---

## 8) Mandatory Hackathon Submission Artifacts

Please attach/provide links for the following:

1. **Wireframes of UI pages**
2. **Design & Architecture document**
3. **Scalable database structure (Schema/ERD)**
4. **API documentation (Swagger/OpenAPI specs)**
5. **Cloud-ready deployment model (architecture diagram)**

---

## 9) Engineering Guidelines

- Follow the module/folder conventions defined above.
- Keep architecture API-first and modular.
- Use environment-based configuration.
- Add documentation for every major feature or architectural decision.
- Ensure lint, tests, and build pass before submission.



---

## 10) Admin Dashboard (Firebase-backed)

The app includes a web admin panel at `/admin` with support for:
- Firebase email/password login and role checks
- section enable/disable controls (hidden from users when off)
- content CRUD (announcements, media, timings)
- seva analytics charts (daily/weekly/monthly)
- user data export (privacy workflows)
- bulk notifications and volunteer approvals

Configure Firebase in `.env` (see `.env.example`):

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...
```
