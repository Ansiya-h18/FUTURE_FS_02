# Mini CRM Dashboard

A professional **Mini CRM (Customer Relationship Management)** web application built using **HTML, CSS, JavaScript, Node.js, Express, and SQLite**.

This project helps businesses manage client leads efficiently through a clean dashboard interface.

---

## Features

- Add new client leads
- Search leads instantly
- Update lead status
  - New
  - Contacted
  - Converted
- Delete leads
- Dashboard statistics
- Responsive dark UI design
- SQLite database integration
- REST API backend using Express.js

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- SQLite

---

## Project Structure

```text
mini-crm/
 ┣ index.html
 ┣ style.css
 ┣ script.js
 ┣ README.md
 ┣ .gitignore
 ┣ server/
 ┃ ┣ server.js
 ┃ ┣ package.json
 ┃ ┣ package-lock.json
 ┃ ┣ crm.db
```

---

## Dashboard Features

### Lead Management
Users can:

- Add new leads
- View all leads
- Search leads by name
- Update lead status
- Delete unwanted leads

---

### Dashboard Statistics

The dashboard displays:

- Total Leads
- Contacted Leads
- Converted Leads

Statistics update automatically in real-time.

---

## Backend API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/leads` | Fetch all leads |
| POST | `/leads` | Add a new lead |
| PUT | `/leads/:id/contacted` | Mark lead as contacted |
| PUT | `/leads/:id/converted` | Mark lead as converted |
| DELETE | `/leads/:id` | Delete lead |

---

## Database Schema

### Leads Table

| Column | Type |
|---|---|
| id | INTEGER |
| name | TEXT |
| email | TEXT |
| status | TEXT |

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

---

### Navigate to Project

```bash
cd mini-crm
cd server
```

---

### Install Dependencies

```bash
npm init -y
npm install express sqlite3 cors
```

---

### Run Backend Server

```bash
node server.js
```

Expected output:

```text
Connected to SQLite database
Server running on http://localhost:5000
```

---

### Run Frontend

Open `index.html` using **Live Server** in VS Code.

---

## How the Project Works

```text
User → Frontend → Backend API → SQLite Database
                   ↓
               Response
                   ↓
            UI Updates
```

1. User interacts with dashboard
2. Frontend sends API requests
3. Backend processes requests
4. SQLite stores/retrieves data
5. Updated data is displayed instantly

---

## Future Improvements

- User Authentication
- Email Notifications
- Export Leads to CSV
- Analytics Dashboard
- Dark/Light Theme Toggle
- Lead Editing Feature

---

## Author

**Ansiya H**

---

## License

This project is created for educational and learning purposes.# FUTURE_FS_02
