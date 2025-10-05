# 📘 TaskFlow — MVP Documentation

A personal learning planner app that helps users create learning projects, break them into subgoals, track progress, and attach useful resources.

---

## 1. 🎯 Goal

The **TaskFlow** application helps users structure and track their learning journey.
Each user can create projects, break them down into subgoals, attach useful materials, and monitor their progress.

The MVP focuses on:

- **Authentication** (register, login, logout)
- **Email verification**
- **Password reset** (via email)
- **Profile management**
- **Dashboard with projects**
- **Project page with subgoals and resources**
- **Progress tracking**
- **Basic settings (theme, language, notifications)**

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
- As a logged-in user, I can **create, view, edit, and delete projects**.
- As a logged-in user, I can **add, edit, delete, and mark subgoals** as completed.
- As a logged-in user, I can **add, edit, and delete useful resources** for a project.
- As a logged-in user, I can **see progress bars** reflecting completed subgoals.
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

### 5.4. Dashboard

- Overview of all learning projects
- Project card: title, progress bar, quick stats (done/total subgoals)
- Create new project (modal form)
- Click project → navigate to Project Details page

### 5.5. Project Details

- Header: title, description, progress bar
- Edit / Delete project
- Subgoal list (CRUD)
- Resource list (CRUD)
- Progress auto-calculated

---

## 6. 🧠 Optional (Next Phase)

Not in MVP, but planned:

- Timeline / Calendar (due dates)
- Notifications / Reminders
- Analytics (streaks, hours spent)
- Search & Filters
- Tags / Categories
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
  projects         Project[]
  verificationTokens VerificationToken[]
  resetTokens      ResetToken[]
}

model UserSettings {
  id            String  @id @default(cuid())
  userId        String  @unique
  theme         String  @default("light") // "light" | "dark"
  language      String  @default("en")
  emailNotifications Boolean @default(true)
  inAppNotifications  Boolean @default(true)

  user          User    @relation(fields: [userId], references: [id])
}

model Project {
  id          String    @id @default(cuid())
  userId      String
  title       String
  description String?
  tags        String[]  // optional
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  subgoals    Subgoal[]
  resources   Resource[]
  user        User      @relation(fields: [userId], references: [id])
}

model Subgoal {
  id          String   @id @default(cuid())
  projectId   String
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  project     Project  @relation(fields: [projectId], references: [id])
}

model Resource {
  id          String   @id @default(cuid())
  projectId   String
  title       String
  url         String
  note        String?
  createdAt   DateTime @default(now())

  project     Project  @relation(fields: [projectId], references: [id])
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

### Projects

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/projects`     | List user projects  |
| POST   | `/api/projects`     | Create project      |
| GET    | `/api/projects/:id` | Get project details |
| PUT    | `/api/projects/:id` | Update project      |
| DELETE | `/api/projects/:id` | Delete project      |

### Subgoals

| Method | Endpoint                            | Description                                  |
| ------ | ----------------------------------- | -------------------------------------------- |
| POST   | `/api/projects/:projectId/subgoals` | Add subgoal                                  |
| PUT    | `/api/subgoals/:id`                 | Edit subgoal (title, description, completed) |
| DELETE | `/api/subgoals/:id`                 | Delete subgoal                               |

### Resources

| Method | Endpoint                             | Description     |
| ------ | ------------------------------------ | --------------- |
| POST   | `/api/projects/:projectId/resources` | Add resource    |
| PUT    | `/api/resources/:id`                 | Edit resource   |
| DELETE | `/api/resources/:id`                 | Delete resource |

---

## 9. 📊 Progress Calculation

```ts
progressPercent =
  totalSubgoals === 0
    ? 0
    : Math.round((completedSubgoals / totalSubgoals) * 100);
```

Returned in `/projects` and `/projects/:id`.

---

## 10. 🧭 Frontend Structure

```
src/
  api/
    api.ts
    authApi.ts
    projectsApi.ts
  app/
    store.ts
  features/
    auth/
    projects/
    profile/
    settings/
  components/
    Modal/
    Button/
    Input/
    ProjectCard/
    ProgressBar/
  pages/
    LoginPage.tsx
    RegisterPage.tsx
    Dashboard.tsx
    ProjectPage.tsx
    ProfilePage.tsx
    SettingsPage.tsx
  routes.tsx
  styles/
```

**RTK Query**

- `authApi` → register, login, verify, reset
- `projectsApi` → CRUD projects, subgoals, resources
- Use `providesTags`/`invalidatesTags` for caching updates

---

## 11. 🧪 Testing

### Frontend (Vitest)

- Unit: components, reducers, RTK Query hooks
- Integration: forms (login/register/project CRUD)

### Backend (Vitest)

- Unit: DTO validation, services
- Integration: auth flows, CRUD for projects/subgoals/resources

---

## 12. ⚙️ CI/CD (GitHub Actions)

### Frontend Workflow

- Trigger: push to `main`
- Steps: install → build → test → deploy to Vercel

### Backend Workflow

- Trigger: push to `main`
- Steps: install → build → test → migrate DB → deploy to Render/Railway

Use GitHub Secrets for:
`DATABASE_URL`, `JWT_SECRET`, `SMTP_USER`, `SMTP_PASS`, etc.

---

## 13. ✅ Acceptance Criteria

| Feature        | Criteria                                                      |
| -------------- | ------------------------------------------------------------- |
| Registration   | User receives verification email; cannot login until verified |
| Login          | JWT token returned; invalid credentials handled               |
| Password Reset | Email sent, password can be reset                             |
| Project CRUD   | User can create/edit/delete; list updates automatically       |
| Subgoals       | CRUD works; progress updates instantly                        |
| Resources      | CRUD works; links stored                                      |
| Profile        | User can edit data, change password, delete account           |
| Settings       | Theme and language persist                                    |
| Security       | Passwords hashed; tokens expire                               |

---

## 14. 🧭 Next Steps / Roadmap

- Calendar with due dates
- In-app & email reminders
- Analytics dashboard (streaks, charts)
- Search & filters
- OAuth login
- AI-powered suggestions
