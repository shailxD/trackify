# 📌 Trackify — Personal Expense Tracker

A modern, feature-rich personal expense tracking application built with React, TypeScript, and Shadcn UI. Trackify helps you manage your finances by tracking expenses, visualizing spending patterns, and providing detailed analytics — all stored locally in your browser.

## 🚀 Live Demo

_Add your deployment link here when available_

## 📥 How to Run the Project

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended package manager)

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/shailxD/trackify.git

# Navigate to project directory
cd trackify

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Other Available Scripts

```bash
pnpm build        # Build for production
pnpm serve        # Preview production build
pnpm lint         # Run ESLint
pnpm format:write # Format code with Prettier
pnpm test         # Run tests
```

### Data Persistence

Trackify uses **LocalStorage** for data persistence, meaning your expense data is stored directly in your browser. No backend or database setup is required.

## 🛠 Tech Stack

### Core Technologies

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript

### State Management

- **Zustand** - Lightweight state management

### Routing

- **TanStack Router** - Type-safe routing with file-based routing

### UI & Styling

- **Shadcn UI** - High-quality, accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icon library

### Forms & Validation

- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation

### Charts & Visualization

- **Recharts** - Composable charting library
- **Shadcn Charts** - Beautiful chart components

### Date Handling

- **date-fns** - Modern date utility library
- **React Day Picker** - Date picker component

## ✨ Features

### Expense Management

- ✅ **Add Expenses** - Create new expense entries with title, amount, category, date, and notes
- ✅ **Edit Expenses** - Modify existing expense details
- ✅ **Delete Expenses** - Remove unwanted expense records with confirmation dialog
- ✅ **Expense Table** - View all expenses in a organized, sortable table with action menus

### Dashboard Analytics

- ✅ **Total Spending** - See your overall expense total at a glance
- ✅ **Category-wise Breakdown** - View spending distribution across different categories
- ✅ **Visual Charts** - Interactive pie and bar charts for spending visualization
- ✅ **Spending Insights** - Percentage breakdown showing how much each category contributes

### Data Filtering & Search

- ✅ **Category Filter** - Filter expenses by specific categories
- ✅ **Date Range Filter** - View expenses within custom date ranges
- ✅ **Search Functionality** - Fuzzy search across title, category, notes, and amount
- ✅ **Real-time Updates** - All filters update instantly with debounced search

### User Experience

- ✅ **Persistent Storage** - All data saved automatically in LocalStorage
- ✅ **Empty States** - Helpful messages and CTAs when no data exists
- ✅ **Pagination** - Navigate through expenses with ease (8 items per page)
- ✅ **Loading States** - Smooth transitions and feedback

## 🔥 Bonus Features

### 📊 Advanced Data Visualization

- **Pie Chart** - Interactive donut chart showing category distribution with percentages
- **Bar Chart** - Horizontal bar chart comparing spending across categories
- **Dynamic Colors** - Consistent color coding for each expense category

### 📱 Responsive Design

- **Mobile-First** - Optimized for mobile devices with touch-friendly interactions
- **Adaptive Layouts** - Tables transform into cards on mobile screens
- **Flexible Filters** - Stacked filter controls on mobile, horizontal on desktop
- **Calendar Adaptation** - Single month view on mobile, dual month on desktop

### ✅ Form Validation

- **React Hook Form** - Performant form handling with minimal re-renders
- **Zod Schema** - Type-safe validation with helpful error messages
- **Real-time Feedback** - Immediate validation as you type

### 🎨 UI/UX Enhancements

- **Theme Support** - Built-in light/dark mode switching
- **Smooth Animations** - Polished transitions and interactions
- **Accessible Components** - ARIA-compliant, keyboard navigable
- **Toast Notifications** - (Ready for implementation)

## 📊 Screenshots

### Dashboard View

![Dashboard](./screenshots/dashboard.png)
_Comprehensive spending analytics with charts and category breakdowns_

### Expenses Management

![Expenses](./screenshots/expenses.png)
_Manage all your expenses with powerful filtering and search capabilities_

## 📁 Folder Structure

```
trackify/
├── public/
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/              # Images and static assets
│   ├── components/
│   │   ├── auth/            # Authentication components
│   │   │   ├── auth-container.tsx
│   │   │   ├── login-form.tsx
│   │   │   └── signup-form.tsx
│   │   ├── dashboard/       # Dashboard-specific components
│   │   │   ├── category-bar-chart.tsx
│   │   │   ├── dashboard-empty-state.tsx
│   │   │   ├── dashboard-header.tsx
│   │   │   └── spending-chart.tsx
│   │   ├── expenses/        # Expense management components
│   │   │   ├── Table/
│   │   │   │   ├── empty-state.tsx
│   │   │   │   ├── table-content.tsx
│   │   │   │   └── table-pagination.tsx
│   │   │   ├── delete-expense-dialog.tsx
│   │   │   ├── expense-form.tsx
│   │   │   ├── expense-header.tsx
│   │   │   └── expense-table.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── nav-main.tsx
│   │   │   └── nav-user.tsx
│   │   ├── theme-switcher/  # Theme toggle
│   │   ├── ui/              # Shadcn UI components
│   │   ├── route-guards.tsx
│   │   └── theme-provider.tsx
│   ├── data/
│   │   └── app.ts           # App configuration
│   ├── hooks/
│   │   ├── use-debounce.ts  # Custom hooks
│   │   └── use-mobile.ts
│   ├── lib/
│   │   ├── get-initials.ts  # Utility functions
│   │   └── utils.ts
│   ├── routes/              # TanStack Router file-based routes
│   │   ├── __root.tsx
│   │   ├── _app.tsx
│   │   ├── _auth.tsx
│   │   ├── index.tsx
│   │   ├── _app/
│   │   │   ├── dashboard.tsx
│   │   │   └── expenses.tsx
│   │   └── _auth/
│   │       ├── login.tsx
│   │       └── signup.tsx
│   ├── store/               # Zustand state management
│   │   ├── auth-store.ts
│   │   ├── expenses-store.ts
│   │   └── expenses-ui-store.ts
│   ├── types/
│   │   └── expenses.ts      # TypeScript type definitions
│   ├── main.tsx             # App entry point
│   ├── routeTree.gen.ts     # Auto-generated route tree
│   └── styles.css           # Global styles
├── .github/
│   └── copilot-instructions.md
├── components.json          # Shadcn UI configuration
├── eslint.config.js
├── package.json
├── prettier.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Key Implementation Highlights

### State Management Architecture

- **Zustand Stores** - Three separate stores for clean separation of concerns:
  - `auth-store` - User authentication state
  - `expenses-store` - Expense data with CRUD operations
  - `expenses-ui-store` - UI state for dialogs, filters, and pagination

### Type Safety

- **End-to-end TypeScript** - Full type coverage across the application
- **Zod Schemas** - Runtime validation matching TypeScript types
- **Type-safe Routing** - TanStack Router provides full type safety for routes

### Component Organization

- **Feature-based Structure** - Components organized by feature (auth, dashboard, expenses)
- **Reusable UI Components** - Shadcn UI components extended with custom logic
- **Separation of Concerns** - Business logic in stores, presentation in components

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by [shailxD](https://github.com/shailxD)

**[⬆ Back to Top](#-trackify--personal-expense-tracker)**

</div>
