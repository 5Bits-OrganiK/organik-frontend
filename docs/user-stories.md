# User Stories — OrganiK

> **Project:** OrganiK — Web Platform for Organic Product Management, Conservation, and Supply
> **Startup:** 5bits

---

## Epics

| EPIC ID | Title | Description |
|--------|--------|-------------|
| EP-01 | Inventory Management | Enables the registration, visualization, search, filtering, and updating of products available in the minimarket inventory, including quantities and related information. |
| EP-02 | Lot and Expiration Management | Enables the management of product lots, expiration dates, and traceability of products registered in the inventory. |
| EP-03 | Conservation Management | Enables the visualization of product conservation conditions and the generation of alerts when risk conditions are detected. |
| EP-04 | Supply Management | Enables the supply workflow through supply requests created by minimarket administrators and shipping orders created by suppliers, including their acceptance, rejection, and tracking. |
| EP-05 | Supplier and Product Management | Enables the consultation and management of suppliers and the products they offer within the platform. |
| EP-06 | User and Security Management | Enables user registration, role management, and access control through permissions according to each user segment. |
| EP-07 | Analytics and Management Control | Enables the visualization of indicators, operation history, alerts, and consolidated information to support decision-making. |

---

## EP-01: Inventory Management

### US-001: Register Product in Inventory

**As a** minimarket administrator,

**I want to** register products in the inventory,

**So that** I can keep the information about available products up to date.

<br>**Acceptance Criteria:**

**Scenario 1: Successful registration**

**Given** that the administrator completes all required product fields,

**When** the product is saved,

**Then** the system registers the product with a unique identifier and active status.

**Scenario 2: Incomplete data**

**Given** that required fields are missing,

**When** the administrator attempts to save the product,

**Then** the system blocks the registration and displays the corresponding validation messages.

---

### US-002: View Inventory

**As a** minimarket administrator,

**I want to** view the registered products,

**So that** I can know the current state of my inventory.

<br>**Acceptance Criteria:**

**Scenario 1: Inventory with data**

**Given** that products are registered,

**When** the administrator accesses the inventory,

**Then** the system displays the products with their quantity, lot, expiration date, and corresponding status.

**Scenario 2: Empty inventory**

**Given** that no products are registered,

**When** the administrator accesses the inventory,

**Then** the system displays a message indicating that there are no registered products.

---

### US-003: Search Products in Inventory

**As a** minimarket administrator,

**I want to** search for products within the inventory,

**So that** I can find them quickly.

<br>**Acceptance Criteria:**

**Scenario 1: Match found**

**Given** that products related to the search term exist,

**When** the administrator performs the search,

**Then** the system displays the matching products.

**Scenario 2: No matches**

**Given** that no matching products exist,

**When** the administrator performs the search,

**Then** the system displays an informative message.

---

### US-004: Filter Inventory

**As a** minimarket administrator,

**I want to** filter products by category, status, or expiration date,

**So that** I can quickly identify products that require attention.

<br>**Acceptance Criteria:**

**Scenario 1: Filter applied**

**Given** that the administrator selects one or more criteria,

**When** the filter is applied,

**Then** the system displays only the products that meet the selected criteria.

**Scenario 2: No results**

**Given** that no products meet the selected criteria,

**When** the filter is applied,

**Then** the system displays a message indicating that there are no matches.

---

### US-005: Update Inventory

**As a** minimarket administrator,

**I want to** update product information,

**So that** I can keep the inventory properly registered.

<br>**Acceptance Criteria:**

**Scenario 1: Successful update**

**Given** that the product exists and the administrator has write permissions,

**When** allowed information is modified,

**Then** the system saves the changes successfully.

**Scenario 2: Invalid information**

**Given** that the entered data does not meet the validations,

**When** the administrator attempts to save the changes,

**Then** the system blocks the update and displays the corresponding error.

---

### US-013: Register Waste

**As a** minimarket administrator,

**I want to** register products that have suffered waste or loss,

**So that** I can maintain a history of inventory losses.

<br>**Acceptance Criteria:**

**Scenario 1: Successful registration**

**Given** that the product exists in the inventory,

**When** the administrator registers the quantity and reason for the waste,

**Then** the system saves the record and updates the corresponding inventory information.

**Scenario 2: Invalid quantity**

**Given** that the waste quantity exceeds the available stock,

**When** the administrator attempts to register it,

**Then** the system blocks the operation and displays a validation message.

---

### US-014: Register Product Offer

**As a** minimarket administrator,

**I want to** register available products as offers,

**So that** I can promote products with available stock, especially those approaching their expiration date.

<br>**Acceptance Criteria:**

**Scenario 1: Successful registration**

**Given** that a product is available in the inventory,

**When** the administrator registers the product as an offer,

**Then** the system saves the offer while maintaining product traceability.

**Scenario 2: Insufficient quantity**

**Given** that the quantity selected for the offer exceeds the available stock,

**When** the administrator attempts to register the offer,

**Then** the system blocks the operation and displays a validation message.

---

## EP-02: Lot and Expiration Management

### US-006: Register Lot

**As a** minimarket administrator,

**I want to** register product lots,

**So that** I can maintain traceability of stored products.

<br>**Acceptance Criteria:**

**Scenario 1: Successful registration**

**Given** that a product is registered,

**When** the administrator registers a lot with the required information,

**Then** the system creates the lot and associates it with the corresponding product.

**Scenario 2: Incomplete data**

**Given** that required lot information is missing,

**When** the administrator attempts to register it,

**Then** the system requests completion of the required fields.

---

### US-007: View Lots

**As a** minimarket administrator,

**I want to** view registered lots,

**So that** I can know the origin and status of the products.

<br>**Acceptance Criteria:**

**Scenario 1: Lots available**

**Given** that lots are registered,

**When** the administrator views the product information,

**Then** the system displays its associated lots and relevant information.

**Scenario 2: No lots**

**Given** that the product has no registered lots,

**When** the administrator views the information,

**Then** the system displays a message indicating that there are no associated lots.

---

### US-008: Track Expiration Dates

**As a** minimarket administrator,

**I want to** view product expiration dates,

**So that** I can identify products approaching expiration.

<br>**Acceptance Criteria:**

**Scenario 1: Products approaching expiration**

**Given** that products have expiration dates within the configured alert period,

**When** the administrator views the inventory,

**Then** the system identifies them as approaching expiration.

**Scenario 2: Products without expiration risk**

**Given** that product expiration dates are outside the alert period,

**When** the administrator views the inventory,

**Then** the system displays them without an expiration alert.

---

### US-009: Generate Expiration Alerts

**As a** minimarket administrator,

**I want to** receive alerts about products approaching expiration,

**So that** I can take action before losses occur.

<br>**Acceptance Criteria:**

**Scenario 1: Product at risk**

**Given** that a product is within the configured expiration threshold,

**When** the system processes the information,

**Then** it generates an alert associated with the product or lot so that the administrator can take action, such as placing the product on offer.

**Scenario 2: No products at risk**

**Given** that no product is within the expiration threshold,

**When** the validation is performed,

**Then** the system does not generate new alerts.

---

## EP-03: Conservation Management

### US-010: View Conservation Conditions

**As a** minimarket administrator,

**I want to** view product conservation conditions,

**So that** I can identify potential deterioration risks.

<br>**Acceptance Criteria:**

**Scenario 1: Data available**

**Given** that temperature and humidity records exist,

**When** the administrator accesses the conservation module,

**Then** the system displays the recorded values and their corresponding status.

**Scenario 2: No records**

**Given** that no data is available,

**When** the administrator accesses the module,

**Then** the system displays an informative message.

---

### US-011: Monitor Temperature and Humidity

**As a** minimarket administrator,

**I want to** view temperature and humidity records,

**So that** I can know the storage conditions of the products.

<br>**Acceptance Criteria:**

**Scenario 1: Values within range**

**Given** that monitoring data exists,

**When** the system processes the values,

**Then** it displays the records and identifies them as normal when they are within the established range.

**Scenario 2: Values outside the range**

**Given** that the values exceed the established ranges,

**When** the system processes the data,

**Then** it identifies the condition as risky.

---

### US-012: Generate Conservation Alerts

**As a** minimarket administrator,

**I want to** receive alerts when conservation conditions are inadequate,

**So that** I can respond promptly to potential deterioration risks.

<br>**Acceptance Criteria:**

**Scenario 1: Risk condition**

**Given** that temperature or humidity is outside the allowed range,

**When** the system detects the condition,

**Then** it generates an alert associated with the corresponding product or storage area.

**Scenario 2: Normal condition**

**Given** that the values are within the allowed range,

**When** the system performs the validation,

**Then** it does not generate a risk alert.

---

## EP-04: Supply Management

### US-018: Create Supply Request

**As a** minimarket administrator,

**I want to** create a supply request addressed to a supplier,

**So that** I can request the products needed by the minimarket.

<br>**Acceptance Criteria:**

**Scenario 1: Request created**

**Given** that the administrator selects a supplier, products, and valid quantities,

**When** the request is confirmed,

**Then** the system creates the supply request with a unique identifier and "Pending" status.

**Scenario 2: Invalid data**

**Given** that products, quantities, or the destination supplier are missing,

**When** the administrator attempts to confirm the request,

**Then** the system blocks the operation and displays the corresponding validation messages.

---

### US-019: View Supply Requests

**As an** authorized user,

**I want to** view supply requests,

**So that** I can know the requests created or received and their current status.

<br>**Acceptance Criteria:**

**Scenario 1: Requests available**

**Given** that supply requests are registered,

**When** the user accesses the supply request module,

**Then** the system displays the requests corresponding to the user's role and permissions.

**Scenario 2: No requests**

**Given** that there are no supply requests associated with the user,

**When** the user accesses the module,

**Then** the system displays an informative message.

---

### US-020: Accept or Reject Supply Request

**As a** supplier of organic products,

**I want to** accept or reject supply requests received from minimarkets,

**So that** I can indicate whether I can fulfill the requested products and quantities.

<br>**Acceptance Criteria:**

**Scenario 1: Request accepted**

**Given** that there is a pending supply request addressed to the supplier,

**When** the supplier accepts the request,

**Then** the system changes its status to "Accepted" and allows the supplier to create an associated shipping order.

**Scenario 2: Request rejected**

**Given** that the supplier cannot fulfill the request,

**When** the supplier records the rejection and its reason,

**Then** the system changes the status to "Rejected" and stores the reason.

---

### US-021: Create Shipping Order

**As a** supplier of organic products,

**I want to** create a shipping order associated with an accepted supply request,

**So that** I can register the products and quantities that will be shipped to the minimarket.

<br>**Acceptance Criteria:**

**Scenario 1: Shipping order created**

**Given** that an accepted supply request exists,

**When** the supplier enters the products, quantities, and required shipping information,

**Then** the system creates the shipping order with a unique identifier and "Pending Reception" status.

**Scenario 2: Supply request not accepted**

**Given** that the supply request is pending or rejected,

**When** the supplier attempts to create a shipping order,

**Then** the system blocks the operation.

---

### US-022: View Shipping Orders

**As an** authorized user,

**I want to** view shipping orders,

**So that** I can know the generated shipments and their current status.

<br>**Acceptance Criteria:**

**Scenario 1: Shipping orders available**

**Given** that shipping orders associated with the user exist,

**When** the user accesses the shipping order module,

**Then** the system displays the corresponding orders according to the user's role and permissions.

**Scenario 2: No shipping orders**

**Given** that no shipping orders are available,

**When** the user accesses the module,

**Then** the system displays an informative message.

---

### US-023: Accept Shipping Order

**As a** minimarket administrator,

**I want to** accept a received shipping order,

**So that** I can confirm receipt and incorporate the received products into the inventory.

<br>**Acceptance Criteria:**

**Scenario 1: Shipping order accepted**

**Given** that a shipping order is pending reception,

**When** the administrator verifies the products and accepts the order,

**Then** the system changes its status to "Accepted" and automatically adds the corresponding products and quantities to the minimarket inventory.

**Scenario 2: Shipping order already processed**

**Given** that the shipping order has already been accepted or rejected,

**When** the administrator attempts to accept it again,

**Then** the system blocks the operation to prevent duplicate inventory entries.

---

### US-024: Reject Shipping Order

**As a** minimarket administrator,

**I want to** reject a shipping order,

**So that** I can prevent products that do not match the expected shipment from being incorporated into the inventory.

<br>**Acceptance Criteria:**

**Scenario 1: Successful rejection**

**Given** that a shipping order is pending reception,

**When** the administrator records the rejection and its reason,

**Then** the system changes the order status to "Rejected" without modifying the inventory.

**Scenario 2: Missing reason**

**Given** that the administrator attempts to reject the shipping order without providing a reason,

**When** the action is confirmed,

**Then** the system requests a reason before processing the rejection.

---

### US-025: View Supply History

**As an** authorized user,

**I want to** view the history of supply requests and shipping orders,

**So that** I can maintain traceability of completed supply operations.

<br>**Acceptance Criteria:**

**Scenario 1: History available**

**Given** that processed supply requests and shipping orders exist,

**When** the user accesses the history,

**Then** the system displays the operations corresponding to the user's role, including date, participants, products, and statuses.

**Scenario 2: Empty history**

**Given** that no processed operations exist,

**When** the user accesses the history,

**Then** the system displays an informative message.

---

## EP-05: Supplier and Product Management

### US-015: View Supplier Products

**As a** minimarket administrator,

**I want to** view products offered by suppliers,

**So that** I can identify available options for supplying the minimarket.

<br>**Acceptance Criteria:**

**Scenario 1: Products available**

**Given** that suppliers have registered products,

**When** the administrator accesses the catalog,

**Then** the system displays the products and the information available for the supply operation.

**Scenario 2: No products**

**Given** that no supplier products are available,

**When** the administrator accesses the catalog,

**Then** the system displays an informative message.

---

### US-016: Register Offered Products

**As a** supplier of organic products,

**I want to** register the products I offer,

**So that** I can make them available to minimarkets.

<br>**Acceptance Criteria:**

**Scenario 1: Successful registration**

**Given** that the supplier completes the required product information,

**When** the product is saved,

**Then** the product becomes available for consultation according to the platform rules.

**Scenario 2: Incomplete data**

**Given** that required information is missing,

**When** the supplier attempts to save the product,

**Then** the system blocks the registration and displays the corresponding validation messages.

---

### US-017: View Offered Products

**As a** supplier of organic products,

**I want to** view the products I have registered,

**So that** I can maintain control over my product offering within the platform.

<br>**Acceptance Criteria:**

**Scenario 1: Registered products**

**Given** that products associated with the supplier exist,

**When** the supplier accesses the catalog,

**Then** the system displays the corresponding products.

**Scenario 2: No products**

**Given** that no products are registered,

**When** the supplier accesses the catalog,

**Then** the system displays an informative message.

---

## EP-06: User and Security Management

### US-026: Register User

**As an** authorized administrator,

**I want to** register users in the system,

**So that** I can provide controlled access to OrganiK.

<br>**Acceptance Criteria:**

**Scenario 1: Valid registration**

**Given** that the form contains valid information,

**When** the administrator registers the user,

**Then** the system creates the account and assigns the corresponding role.

**Scenario 2: Invalid data**

**Given** that the information is incomplete or duplicated,

**When** the administrator attempts to register the user,

**Then** the system blocks the registration and displays the corresponding validation messages.

---

### US-027: Sign In

**As a** user,

**I want to** sign in,

**So that** I can access the OrganiK dashboard according to my permissions.

<br>**Acceptance Criteria:**

**Scenario 1: Correct credentials**

**Given** that the user enters valid credentials,

**When** the user signs in,

**Then** the system authenticates the user and displays the common dashboard with the functionalities corresponding to their role.

**Scenario 2: Incorrect credentials**

**Given** that the entered credentials are invalid,

**When** the user attempts to sign in,

**Then** the system denies access and displays an error message.

---

### US-028: Manage Role Permissions

**As an** authorized administrator,

**I want to** manage permissions associated with user roles,

**So that** I can control the actions each user segment can perform.

<br>**Acceptance Criteria:**

**Scenario 1: Permissions applied**

**Given** that a user has an assigned role,

**When** the user accesses the system,

**Then** the user can only perform functionalities permitted for that role.

**Scenario 2: Unauthorized action**

**Given** that the user attempts to perform an action outside their permissions,

**When** the action is executed,

**Then** the system blocks the operation.

---

### US-029: Control Access by Operation

**As a** OrganiK user,

**I want** the available actions for supply requests, shipping orders, and inventory to depend on my role,

**So that** unauthorized modifications can be prevented.

<br>**Acceptance Criteria:**

**Scenario 1: Minimarket administrator**

**Given** that the user has the minimarket administrator role,

**When** the user accesses OrganiK,

**Then** the user can manage supply requests and inventory and accept or reject shipping orders, but cannot directly modify shipping orders created by suppliers.

**Scenario 2: Supplier**

**Given** that the user has the supplier role,

**When** the user accesses OrganiK,

**Then** the user can view and accept or reject received supply requests and manage shipping orders, but cannot directly modify the minimarket inventory.

---

## EP-07: Analytics and Management Control

### US-030: General Dashboard

**As a** OrganiK user,

**I want to** view a common dashboard with information relevant to my role,

**So that** I can quickly check the status of my operations.

<br>**Acceptance Criteria:**

**Scenario 1: Minimarket administrator**

**Given** that the user has the minimarket administrator role,

**When** the user accesses the dashboard,

**Then** the system displays relevant information about inventory, conservation, supply requests, shipping orders, and alerts corresponding to the minimarket's operations.

**Scenario 2: Supplier**

**Given** that the user has the supplier role,

**When** the user accesses the same dashboard,

**Then** the system displays relevant information about offered products, received supply requests, and shipping orders according to the supplier's permissions.
