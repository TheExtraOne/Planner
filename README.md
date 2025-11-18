# 💰 TaskFlow — MVP Documentation

A personal finance tracking app that helps users track their expenses by categories, analyze spending patterns, and gain insights into their financial habits through visual statistics.

---

## 1. 🎯 Goal

The **FinanceTracker** application helps users monitor and analyze their spending habits.
Users can record purchases, categorize expenses, view statistics through diagrams, and understand which categories consume the most of their budget.

The MVP focuses on:

- **Authentication** (register, login, logout)
- **Email verification**
- **Password reset** (via email)
- **Profile management**
- **Expense tracking** with categories
- **Visual statistics** (circular diagrams) for day/week/month/year/custom periods
- **Category management** (predefined + custom categories)
- **Basic settings** (theme, language, notifications)

---

## 2. 🚀 Tech Stack

### Frontend

- **Framework:** React + TypeScript
- **Bundler:** Vite
- **State Management:** Redux Toolkit
- **Data Fetching / Caching:** RTK Query
- **Routing:** React Router
- **Styling:** CSS Modules (no UI libraries — custom components only)
- **Testing:** Vitest

### Backend

- **Runtime:** Node.js + TypeScript
- **Framework:** NestJS
- **ORM:** Prisma _or_ TypeORM
- **Database:** PostgreSQL / MySQL
- **Authentication:** JWT (access tokens)
- **Email:** SMTP / nodemailer
- **Bundler:** Vite
- **Testing:** Vitest

### Deployment

- **Frontend:** Vercel
- **Backend:** Render / Railway / Heroku (recommended)
- **CI/CD:** GitHub Actions (build, test, deploy)

---

## 3. 👤 User Stories

- As a user, I can **register** using email and password.
- As a user, I will **receive an email** with a verification link to activate my account.
- As a user, I can **log in and log out** using my credentials.
- As a user, I can **reset my password** by requesting an email with a generated password or reset link.
- As a logged-in user, I can **change my password** from my profile page.
- As a logged-in user, I can **delete my account**.
- As a logged-in user, I can **add expenses** with amount, category, date, and comment.
- As a logged-in user, I can **view, edit, and delete expenses**.
- As a logged-in user, I can **view statistics** (circular diagram) showing expenses by category for different time periods (day/week/month/year/custom).
- As a logged-in user, I can **see category breakdown** with icons, percentages, and totals.
- As a logged-in user, I can **browse predefined categories** with icons on the categories page.
- As a logged-in user, I can **create custom categories** with icons.
- As a logged-in user, I can **edit and delete custom categories**.
- As a logged-in user, I can **change theme, language, and notification preferences**.

---

## 4. 🔐 Authentication Flows

- **Registration:**
  Users fill in registration form → email verification sent → after clicking the link, account is activated.
- **Login:**
  Email + password → receive JWT access token.
- **Forgot Password:**
  Request reset → receive email (with generated password or reset link).
- **Change Password:**
  Via profile page (must enter current password).
- **Delete Account:**
  Via profile settings, confirmation required.

OAuth (Google, Apple, etc.) is **not included** in MVP.

---

## 5. 🧩 MVP Features

### 5.1. Authentication

- Register, Login, Logout
- Email verification
- Password reset (email with token or generated password)

### 5.2. User Profile

- View personal data
- Change password
- Delete account

### 5.3. Settings

- Theme: Light / Dark mode
- Language: English (multi-language planned later)
- Notifications: email and in-app (placeholders for now)

### 5.4. Header

- Navigation menu
- Theme toggle
- Language switcher
- Login/Logout button

### 5.5. Dashboard (Main Page)

- **Circular diagram** showing expenses by category
  - Each color represents a category
  - Period selector: Day / Week / Month / Year / Custom period
- **Category breakdown list** below diagram:
  - Category name
  - Category icon
  - Percentage of total expenses
  - Total amount (in currency)
- **Add Expense button** (plus icon)
  - Opens modal/form to add new expense:
    - Amount (sum)
    - Category selection
    - Date (defaults to today)
    - Comment (optional)
    - Create button

### 5.6. Categories Page

- **Predefined categories** with icons (from API):
  - House, Transport, Car, Cafe, Health, Grocery, Sport, Education, Hobbies, Beauty, Clothes, etc.
- **Add Category button** (plus icon)
  - Opens modal/form to create custom category:
    - Category name
    - Icon selection
    - Create button
- **Edit/Delete** custom categories (predefined categories cannot be deleted)

---

## 6. 🧠 Optional (Next Phase)

Not in MVP, but planned:

- Income tracking
- Budget planning and limits per category
- Recurring expenses
- Export to CSV/PDF
- Expense search and filters
- Receipt photo upload
- AI insights
- OAuth providers (Google, Apple)

---

## 7. 🧱 Data Model (Prisma-style)

```prisma
model User {
  id               String   @id @default(cuid())
  email            String   @unique
  passwordHash     String
  name             String?
  avatarUrl        String?
  isEmailVerified  Boolean  @default(false)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  settings         UserSettings?
  expenses         Expense[]
  categories       Category[]
  verificationTokens VerificationToken[]
  resetTokens      ResetToken[]
}

model UserSettings {
  id            String  @id @default(cuid())
  userId        String  @unique
  theme         String  @default("light") // "light" | "dark"
  language      String  @default("en")
  currency      String  @default("BYN")
  emailNotifications Boolean @default(true)
  inAppNotifications  Boolean @default(true)

  user          User    @relation(fields: [userId], references: [id])
}

model Category {
  id          String   @id @default(cuid())
  userId      String?  // null for predefined categories
  name        String
  icon        String   // icon identifier/name
  color       String?  // optional color code
  isPredefined Boolean @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User?    @relation(fields: [userId], references: [id])
  expenses    Expense[]
}

model Expense {
  id          String   @id @default(cuid())
  userId      String
  categoryId  String
  amount      Decimal  // using Decimal for currency precision
  date        DateTime @default(now())
  comment     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id])
  category    Category @relation(fields: [categoryId], references: [id])
}

model VerificationToken {
  id         String  @id @default(cuid())
  userId     String
  token      String
  expiresAt  DateTime

  user       User    @relation(fields: [userId], references: [id])
}

model ResetToken {
  id         String  @id @default(cuid())
  userId     String
  token      String
  expiresAt  DateTime
  used       Boolean @default(false)

  user       User    @relation(fields: [userId], references: [id])
}
```

---

## 8. 🔌 API Endpoints (REST)

All protected routes require header:
`Authorization: Bearer <JWT>`

### Auth

| Method | Endpoint                  | Description                                |
| ------ | ------------------------- | ------------------------------------------ |
| POST   | `/api/auth/register`      | Register new user, send verification email |
| POST   | `/api/auth/verify`        | Verify email using token                   |
| POST   | `/api/auth/login`         | Login with credentials                     |
| POST   | `/api/auth/logout`        | Logout (invalidate token if needed)        |
| POST   | `/api/auth/request-reset` | Request password reset                     |
| POST   | `/api/auth/reset`         | Reset password using token or new password |

### User Profile

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | `/api/users/me`          | Get current user data |
| PUT    | `/api/users/me`          | Update profile info   |
| PUT    | `/api/users/me/password` | Change password       |
| DELETE | `/api/users/me`          | Delete account        |

### Settings

| Method | Endpoint                 | Description     |
| ------ | ------------------------ | --------------- |
| GET    | `/api/users/me/settings` | Get settings    |
| PUT    | `/api/users/me/settings` | Update settings |

### Expenses

| Method | Endpoint                   | Description                                           |
| ------ | -------------------------- | ----------------------------------------------------- |
| GET    | `/api/expenses`            | List user expenses (with filters: date range)         |
| POST   | `/api/expenses`            | Create expense                                        |
| GET    | `/api/expenses/:id`        | Get expense details                                   |
| PUT    | `/api/expenses/:id`        | Update expense                                        |
| DELETE | `/api/expenses/:id`        | Delete expense                                        |
| GET    | `/api/expenses/statistics` | Get statistics by period (day/week/month/year/custom) |

### Categories

| Method | Endpoint              | Description                                      |
| ------ | --------------------- | ------------------------------------------------ |
| GET    | `/api/categories`     | List all categories (predefined + user's custom) |
| POST   | `/api/categories`     | Create custom category                           |
| GET    | `/api/categories/:id` | Get category details                             |
| PUT    | `/api/categories/:id` | Update custom category (only user's)             |
| DELETE | `/api/categories/:id` | Delete custom category (only user's)             |

---

## 9. 📊 Statistics Calculation

Statistics endpoint `/api/expenses/statistics` accepts query parameters:

- `period`: `day` | `week` | `month` | `year` | `custom`
- `startDate`: ISO date string (required for custom period)
- `endDate`: ISO date string (required for custom period)

Response format:

```ts
{
  totalAmount: number,
  period: string,
  startDate: string,
  endDate: string,
  byCategory: [
    {
      categoryId: string,
      categoryName: string,
      categoryIcon: string,
      amount: number,
      percentage: number
    }
  ]
}
```

Percentage calculation:

```ts
percentage = Math.round((categoryAmount / totalAmount) * 100);
```

---

## 10. ⚙️ CI/CD (GitHub Actions)

### Frontend Workflow

- Trigger: push to `main`
- Steps: install → build → test → deploy to Vercel

### Backend Workflow

- Trigger: push to `main`
- Steps: install → build → test → migrate DB → deploy to Render/Railway

Use GitHub Secrets for:
`DATABASE_URL`, `JWT_SECRET`, `SMTP_USER`, `SMTP_PASS`, etc.
