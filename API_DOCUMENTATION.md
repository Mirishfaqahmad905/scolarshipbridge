# ScholarBridge REST API Documentation
**Backend Engine**: Node.js + Express.js  
**Database System**: Safe Local JSON File Storage (`backend/data/*.json`)  
**Image Storage**: Base64 encoding stored in `backend/data/media.json`  
**Authentication**: JWT (JSON Web Tokens) with HTTP-only Cookies and Bearer Authorization Header  

---

## 1. Authentication Endpoints

### 1.1 Admin Login
- **URL**: `POST /api/admin/auth/login`
- **Description**: Authenticates administrator and returns JWT token + session cookie.
- **Request Body**:
```json
{
  "username": "mirishfaqahmad",
  "password": "ScholarBridge2026Admin!"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Sign in successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "admin-super-01",
    "username": "mirishfaqahmad",
    "email": "admin@scholarbridge.org",
    "role": "superadmin",
    "permissions": ["all"],
    "lastLogin": "2026-08-17T10:30:00.000Z"
  }
}
```

### 1.2 Admin Logout
- **URL**: `POST /api/admin/auth/logout`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "success": true, "message": "Logged out successfully." }`

### 1.3 Current Admin Profile
- **URL**: `GET /api/admin/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns authenticated admin details.

---

## 2. Public API Endpoints

### 2.1 Scholarships Directory
- **URL**: `GET /api/scholarships`
- **Query Parameters**:
  - `page` (default: 1)
  - `limit` (default: 50)
  - `search` / `q` (keyword match across title, country, fields, org)
  - `country` (e.g. `Germany`, `United Kingdom`)
  - `region` (e.g. `Europe`, `Asia`)
  - `degree` (e.g. `Master`, `PhD`, `Bachelor`)
  - `funding` (e.g. `fully-funded`, `partial`)
  - `category` (e.g. `fully-funded`, `government`, `no-ielts`)
  - `sortBy` (`newest`, `deadline`, `popular`, `views`, `title-asc`, `title-desc`)
- **Response**:
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 12,
    "pages": 1
  }
}
```

### 2.2 Scholarship Detail by Slug or ID
- **URL**: `GET /api/scholarships/:slug`
- **Behavior**: Retrieves record and automatically increments view count.

### 2.3 Articles & Guides
- **URL**: `GET /api/posts` / `GET /api/posts/:slug`

### 2.4 Universities Directory
- **URL**: `GET /api/universities`

### 2.5 Countries Directory
- **URL**: `GET /api/countries`

### 2.6 Categories
- **URL**: `GET /api/categories`

### 2.7 About Page Content
- **URL**: `GET /api/about`

### 2.8 Contact Page Settings & Submission
- **URL**: `GET /api/contact/settings`
- **URL**: `POST /api/contact/messages`
- **Request Body**:
```json
{
  "name": "Jane Scholar",
  "email": "jane@example.com",
  "subject": "DAAD Inquiry",
  "message": "Question regarding English proficiency documents."
}
```

### 2.9 Social Media Links
- **URL**: `GET /api/social?location=header|footer|all`

### 2.10 Site Settings
- **URL**: `GET /api/settings`

### 2.11 Advertisements
- **URL**: `GET /api/ads?placement=header|sidebar|insideContent`

### 2.12 Global Multi-Resource Search
- **URL**: `GET /api/search?q=engineering`
- **Response**: Categorized matches for scholarships, posts, universities, countries, categories.

### 2.13 Dynamic Sitemap & Robots.txt
- **URL**: `GET /sitemap.xml` (Live dynamic XML generator)
- **URL**: `GET /robots.txt` (Live crawlers rule file)

---

## 3. Media Library & Base64 Image CRUD

### 3.1 Upload Base64 Image
- **URL**: `POST /api/admin/media`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
```json
{
  "fileName": "daad-germany-2027.png",
  "imageData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "altText": "DAAD Helmut Schmidt Programme Banner",
  "caption": "Official fellowship banner",
  "width": 1200,
  "height": 630
}
```
- **Validation**: Accepts `image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `image/gif`. Validates Base64 header and enforces file size limits.
- **Storage**: Appends record into `backend/data/media.json`.

### 3.2 Delete Media Record
- **URL**: `DELETE /api/admin/media/:id`
- **Behavior**:
  - Checks if the media is currently referenced in scholarships, posts, about, universities, countries, or settings.
  - Safely deletes the image record from `backend/data/media.json`.
  - Records the action in `auditLogs.json`.

---

## 4. Administrator CRUD Endpoints

| Resource | Methods | Admin Endpoints |
|---|---|---|
| **Dashboard** | `GET` | `/api/admin/dashboard` |
| **Scholarships** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/scholarships` / `.../:id` |
| **Scholarship Actions** | `POST` | `/api/admin/scholarships/:id/publish`, `.../unpublish`, `.../duplicate` |
| **Universities** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/universities` / `.../:id` |
| **Countries** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/countries` / `.../:id` |
| **Categories** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/categories` / `.../:id` |
| **Posts/Guides** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/posts` / `.../:id` |
| **About Page** | `GET`, `PUT` | `/api/admin/about` |
| **Contact Settings** | `GET`, `PUT` | `/api/admin/contact/settings` |
| **Contact Messages** | `GET`, `PUT`, `DELETE` | `/api/admin/contact/messages` / `.../:id` |
| **Social Links** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/social` / `.../:id` |
| **Media Library** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/media` / `.../:id` |
| **Site Settings** | `GET`, `PUT` | `/api/admin/settings` |
| **Navigation** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/navigation` / `.../:id` |
| **SEO Settings** | `GET`, `PUT` | `/api/admin/seo` |
| **Advertisements** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/ads` / `.../:id` |
| **Pages** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/pages` / `.../:id` |
| **Subscribers** | `GET`, `DELETE` | `/api/admin/subscribers` / `.../:id` |
| **Audit Logs** | `GET` | `/api/admin/audit-logs` |
| **Backup & Restore** | `GET`, `POST` | `/api/admin/backups`, `/api/admin/backup`, `/api/admin/restore` |
| **Admin Users** | `GET`, `POST`, `DELETE` | `/api/admin/users` / `.../:id` |

---

## 5. Safe JSON Storage Guarantee
- Asynchronous File Operations (`fs/promises`)
- Atomic file write pattern: write to `.tmp` file, then atomic `fs.rename`.
- Automatic deadline expiration and scheduled post publishing running in background.
- Zero external database dependencies (No MongoDB, No SQL).
