# 📄 DocFlow

A full-stack collaborative document editor inspired by Google Docs, built with **Spring Boot**, **React**, **TypeScript**, **PostgreSQL**, **JWT Authentication**, and **WebSockets**.

Users can create, edit, share, and collaborate on documents in real time with secure authentication and role-based access.

---

## 🚀 Features

- 🔐 User Registration & Login using JWT Authentication
- 📄 Create, Edit and Delete Documents
- 👥 Share Documents with Other Users
- 💬 Add Comments on Documents
- 📚 Document Version History
- ⚡ Real-time Collaboration using WebSockets
- 🔍 Search Documents by Title
- 🛡️ Role-based Document Access
- 🎨 Modern Responsive React UI

---

## 🛠 Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- PostgreSQL
- Maven
- WebSocket (STOMP)

### Frontend
- React
- TypeScript
- Vite
- Axios
- React Router

### Database
- PostgreSQL

---

## 📂 Project Structure

```
DocFlow
│
├── doc-flow backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   ├── config
│   ├── security
│   └── websocket
│
├── doc-flow frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── hooks
│
└── README.md
```

---


## 🗄️ Database Schema

The application uses PostgreSQL with the following tables:

- Users
- Documents
- Document Access
- Comments
- Document Versions


## 🏗 Architecture

```
React Frontend
       │
       │ REST API / WebSocket
       ▼
Spring Boot Backend
       │
Spring Security + JWT
       │
Spring Data JPA
       │
PostgreSQL Database
```

---

## 🔄 Entity Relationship

```
USERS
   │
   │
DOCUMENTS
   │──────────────┬──────────────┐
   │              │              │
COMMENTS   DOCUMENT_ACCESS   DOCUMENT_VERSIONS
```

---

## ⚙ Installation

### Backend

```bash
cd doc-flow backend
```

Configure PostgreSQL credentials in

```
application.properties
```

Run

```bash
mvn spring-boot:run
```

---

### Frontend

```bash
cd doc-flow frontend
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

---

## 🔑 Authentication

The application uses **JWT Authentication**.

After login, a JWT token is generated and used to authorize all protected API requests.

---

## 📡 REST APIs

### Authentication

- Register User
- Login User

### Documents

- Create Document
- Get All Documents
- Get Document By ID
- Update Document
- Delete Document
- Search Documents

### Sharing

- Share Document
- View Shared Documents
- Remove Collaborator

### Comments

- Add Comment
- Get Comments
- Resolve Comment

### Version History

- Save Version
- View Previous Versions

---

## 🔮 Future Improvements

- Rich Text Formatting
- File Upload Support
- User Profile
- Notifications
- Dark Mode
- Export as PDF
- Document Templates

---

## 👨‍💻 Author

**Mehul Tiwari**

GitHub: https://github.com/MehulTiwari007

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub.
