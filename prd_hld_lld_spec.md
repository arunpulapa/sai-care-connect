# Engineering & Product Specification: Garooda Mobiles Portal

This document aggregates the Product Requirement Document (PRD), High-Level Design (HLD), and Low-Level Design (LLD) for the **garooda Mobiles** digital repair platform, built for zero-cost, high-contrast corporate operations.

---

# Part 1: Product Requirement Document (PRD)

## 1. Product Vision & Scope
The **garooda Mobiles Digital Portal** is a high-performance web gateway designed to capture premium hardware intake tickets for a mobile device restoration center in Tadepalligudem. The goal is to provide absolute diagnostic and pricing transparency to customers with zero infrastructure or server hosting costs.

## 2. Key Objectives & Target Metrics
*   **Zero Operations Overhead**: Maintain a $0 / ₹0 monthly recurring technology stack cost.
*   **Frictionless Handoff**: Eliminate customer onboarding friction (no user registrations, email confirmations, or app downloads).
*   **Rapid Lead Capture**: Maintain a structured customer onboarding funnel that loads in under 1 second on mobile networks.

## 3. Functional Requirements (MVP Scope)
*   **Interactive Diagnostic Form**:
    *   Dynamic Device Model validation input.
    *   Structured Hardware/Software Issue selection list with detail extension panel.
    *   Logistics allocation choice (Express Walk-in vs. Doorstep Pickup).
*   **Encrypted WhatsApp Handoff**:
    *   Automated string compilation of customer options into a neat ticket payload.
    *   Direct deep-link integration targeting the primary verified shop WhatsApp number `9949196343`.
*   **Offline Ticket Progress Drawer**:
    *   A reactive progress capsule fixed to the bottom of the screen showing complete inputs tracking from 0% to 100%.
    *   Locking mechanism that keeps the Submit CTA disabled until progress meets 100%.
*   **Integrated Operator/Technician Panel**:
    *   A secure bench interface to inspect local tickets.
    *   Interactive buttons to change ticket repair phases.
    *   Pre-formatted Quick-Reply WhatsApp text templates for sending client status alerts in 1 click.

## 4. User Stories
1.  **As a Customer**, I want to quickly configure my mobile repair request and receive an upfront cost quote on WhatsApp, so that I don't waste time going to a physical shop.
2.  **As a Shop Operator**, I want to receive pre-structured diagnostic data when customers reach out on WhatsApp, so I can immediately formulate repair estimates.
3.  **As a Bench Technician**, I want to toggle a local view of active tickets on my laptop, track diagnostic notes, and send status notifications directly via WhatsApp with one click.

---

# Part 2: High-Level Design (HLD)

## 1. System Architecture Diagram

```
+-------------------------------------------------------+
|                 Client Browser (Vite Web App)         |
|  - Renders forms                                      |
|  - Tracks active ticket in LocalStorage               |
|  - Hosts Operator Dashboard with local state          |
+------------------------------------------+------------+
                                           |
                Direct Deep-link Handoff   | (WA.ME Protocol)
                                           v
+-------------------------------------------------------+
|              WhatsApp Communication Layer             |
|  - End-to-end encrypted messaging                    |
|  - Client receives live status updates                |
|  - Operator organizes workflows via color Labels      |
+-------------------------------------------------------+
```

## 2. Architectural Choices (No-DB Paradigm)
To achieve zero-cost hosting and maintenance:
*   **No Centralized Database**: The client's web browser acts as the local transaction log using standard `localStorage`.
*   **WhatsApp Business CRM**: The operator's mobile phone acts as the real-time operational database. Incoming chats are organized using native color Labels (e.g. *Intake Confirmed*, *Diagnostics*, *Active Repair*, *Ready*).
*   **Hosting**: The entire static single-page app is deployed to Edge CDNs (such as Vercel or Netlify) which offer robust free tiers.

---

# Part 3: Low-Level Design (LLD)

## 1. Repository Structure & Key Entrypoints
```
sai-care-connect/
├── src/
│   ├── routes/
│   │   ├── __root.tsx      # Preconnects Google Fonts & builds standard header/meta
│   │   └── index.tsx       # Core Landing Page, Client Tracker, & Technician Console
│   ├── styles.css          # Color tokens, background grid patterns, premium fonts
│   └── server.ts           # SSR Fetch router wrapper for deployment environment
├── wrangler.jsonc          # SSR edge configuration parameters
└── package.json            # Vite build parameters & dependencies
```

## 2. State & Data Models

### Ticket Interface Schema
```typescript
interface Ticket {
  id: string;          // Format: "GR-XXXX" (randomized)
  model: string;       // Client entered device model
  issue: string;       // Chosen core diagnostic category
  service: string;     // Express Walk-In | Doorstep Pickup
  name: string;        // Full client name
  status: string;      // Current repair state
  cost: string;        // Estimated restoration cost
  notes: string;       // Bench diagnostic details
  createdAt: string;   // Timestamp string
}
```

### Local Storage Keys
*   `garooda_tickets`: Array of `Ticket` objects (used by the Technician Dashboard).
*   `garooda_active_ticket_id`: Active client-side ticket ID (used to display the client live tracker).

## 3. UI Component Lifecycle

### A. Client Form & Progress Meter
*   **State Hook**: `useState("")` tracks inputs `model`, `issue`, `service`, `name`.
*   **Reactive Hook**: `useMemo` monitors fields to calculate `progress` (0%, 25%, 50%, 75%, 100%).
*   **Handoff Hook**: `handleSubmit` compiles fields, creates a new `Ticket`, pushes to `localStorage`, and calls `window.open` using:
    `https://wa.me/919949196343?text=[Compiled String]`

### B. Technician Console
*   **Status Toggles**: Standard array of operator status buttons maps directly to `STEPS`:
    `["Intake Confirmed", "Diagnostics Bench", "Restoration Phase", "Quality Check", "Ready for Delivery"]`
*   **Status Update Action**: Clicking a status updates the ticket object in `localStorage` instantly, synchronizing the client's local tracker visual map.
*   **Notification Engine**: Clicking "Send Live Status Alert" compiles a status message with the latest bench cost and notes, launching WhatsApp for immediate communication.

### C. Design Tokens & Styling
*   **Background Grid**: Rendered using standard clean linear-gradient grids:
    ```css
    .bg-grid-pattern {
      background-size: 30px 30px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
    }
    ```
*   **Glass Containers**: Double-bordered high-contrast transparent frames (`border-white/[0.06]`, `bg-slate-950/40`) replace playful animations to maintain clean, robust corporate trust.
