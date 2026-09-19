# Changelog

All notable changes to the **OrganiK Frontend** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- Initial frontend project structure for OrganiK.
- Domain-oriented architecture organized by bounded contexts.
- Base structure for the following application contexts:
  - Analytics.
  - Communication.
  - Conservation.
  - Dashboard.
  - Identity and Access Management (IAM).
  - Inventory.
  - Procurements.
  - Products.
  - Profiles.
  - Requisition.
  - Suppliers.
- Shared context for reusable application resources and components.
- Environment configuration structure.
- Internationalization resources under `public/i18n`.
- Dedicated feature branches for the development of each application context.

### Architecture

- Each bounded context follows a layered structure composed of:
  - `application` for application logic and use cases.
  - `domain` for domain models and business concepts.
  - `infrastructure` for external services, APIs, and technical implementations.
  - `presentation` for views and user interface elements.
- Domain models are organized under `domain/model`.
- User-facing views are organized under `presentation/views`.
- Reusable UI components are maintained within the `shared` context.
- Development is organized through dedicated `feature/*` branches and integrated through the `develop` branch.

### Branch Structure

- `feature/analytics`
- `feature/communication`
- `feature/conservation`
- `feature/dashboard`
- `feature/iam`
- `feature/inventory`
- `feature/procurements`
- `feature/products`
- `feature/profiles`
- `feature/requisition`
- `feature/shared`
- `feature/suppliers`

---

## [0.1.0] - 2026-09-19

### Added

- Initial OrganiK frontend project setup.
- Base source code structure under `src/app`.
- Initial bounded context directory structure.
- Shared application context.
- Environment configuration.
- Internationalization directory structure.
- Git branching strategy based on `main`, `develop`, and `feature/*` branches.
