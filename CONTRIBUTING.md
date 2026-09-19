# Contributing Guidelines

Thank you for your interest in contributing to the **OrganiK Frontend** project!

OrganiK is a web application designed to support the management of organic products, inventory, conservation conditions, suppliers, procurement processes, and other operations related to minimarkets and their suppliers.

This document defines the development standards, architectural conventions, and Git workflow that contributors must follow.

---

## 1. Code Standards & Architecture

To maintain code quality, consistency, and architectural organization, all contributions must follow these principles:

### 1.1. Domain-Driven Design (DDD)

The frontend is organized around application contexts that represent the main areas of the OrganiK domain.

Current contexts include:

- `analytics`
- `communication`
- `conservation`
- `dashboard`
- `iam`
- `inventory`
- `procurements`
- `products`
- `profiles`
- `requisition`
- `suppliers`
- `shared`

Each context must remain independent and contain only the logic related to its corresponding responsibility.

Cross-context dependencies should be minimized. Common functionality that can be reused across multiple contexts should be placed in the `shared` context.

---

### 1.2. Layered Architecture

Each bounded context follows the following structure:

```text
<context>/
├── application/
├── domain/
│   └── model/
├── infrastructure/
└── presentation/
    └── views/
