# 🎌 AnimeApp

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-8B0000)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-Educational-blue)


---

## 📌 Project Summary

AnimeApp is a **full-stack Node.js web application** built using **Express.js**, **MongoDB**, and **EJS**, implementing complete **CRUD functionality**.  
The project demonstrates backend development skills including **routing, database modeling, server-side rendering, and MVC-style structuring**, along with responsive UI design using **Bootstrap**.

This application is ideal for showcasing **backend fundamentals, database integration, and server-rendered UI workflows**.

---

## ✨ Key Features

- Create, read, update, and delete anime records  
- MongoDB integration using Mongoose  
- Server-side rendering with EJS templates  
- Clean and responsive UI using Bootstrap  
- Organized project structure (config, model, views, public)  
- Beginner-friendly and scalable architecture  

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose ODM

### Frontend
- EJS (Embedded JavaScript Templates)
- Bootstrap
- Custom CSS

---

## 📁 Project Structure

ANIMEAPP/
├── config/

│   └── db.config.js          # MongoDB connection setup

├── model/

│   └── anime.model.js        # Mongoose schema & model

├── node_modules/             # Project dependencies

├── public/

├── images/                   # Static images

├── js/

│   ├── bootstrap.bundle.min.js

│   └── remix/

├── css/

│   ├── bootstrap.min.css

│   └── style.css             # Custom styling

├── views/

│   ├── edit.ejs              # Edit anime page

│   ├── form.ejs              # Add anime page

│   └── home.ejs              # Home / listing page

├── package.json

├── package-lock.json

└── server.js                 # Application entry point



---

## 🔄 Application Workflow

1. User interacts with the browser UI  
2. Express server handles HTTP requests  
3. Mongoose communicates with MongoDB  
4. Data is processed and rendered via EJS  
5. Bootstrap styles the final UI  
6. CRUD operations update the database  

---

## 🗄 Database Configuration

Database connection logic is located in:

config/db.config.js


This file initializes the MongoDB connection using Mongoose and ensures the database is connected before the server handles requests.

---

## 🧠 Backend Architecture

### server.js

The core responsibilities include:

- Initializing the Express application  
- Connecting to MongoDB  
- Registering middleware  
- Defining CRUD routes  
- Rendering EJS views  
- Starting the HTTP server  

---

## 📘 Model Layer

### anime.model.js

Defines the **schema and structure** of anime records using Mongoose.  
This file controls how anime data is stored, validated, and retrieved from MongoDB.

---

## 🖼 Views & UI

All views are rendered using **EJS templates**.

### home.ejs
- Displays all anime records
- Provides Edit and Delete actions

### form.ejs
- Form to add new anime entries

### edit.ejs
- Pre-filled form for updating anime details

---

## 🎨 Static Assets

All static assets are served from the `public` directory.

- **CSS:** Bootstrap + custom styles  
- **JavaScript:** Bootstrap bundle  
- **Images:** Stored under `public/images`  

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](public/images/home.png)

### ➕ Add Anime
![Add Anime](public/images/add.png)

### ✏ Edit Anime
![Edit Anime](public/images/edit.png)

---

## 📦 Dependencies

Main dependencies used:

- **express** – Web framework  
- **mongoose** – MongoDB ODM  
- **ejs** – Templating engine  

Complete list available in `package.json`.

---

## ⚙ Installation

### Prerequisites

- Node.js  
- npm  
- MongoDB (running locally)

### Steps

```bash
git clone https://github.com/JanhviAgrawal/Node.JS.git
cd Node.JS/AnimeApp
npm install

| Method | Route         | Description            |
| ------ | ------------- | ---------------------- |
| GET    | `/`           | Display all anime      |
| GET    | `/add`        | Show add anime form    |
| POST   | `/add`        | Save anime to database |
| GET    | `/edit/:id`   | Show edit form         |
| POST   | `/update/:id` | Update anime           |
| GET    | `/delete/:id` | Delete anime           |


🧪 Development Notes

MVC-inspired structure

Server-side rendering (no frontend framework)

Beginner-friendly but scalable

Easily extendable with authentication or APIs

🚀 Future Enhancements

Input validation

Authentication & authorization

Search & filtering

Pagination

REST API version

Cloud deployment


👩‍💻 Author

Janhvi Agrawal
GitHub: https://github.com/JanhviAgrawal
