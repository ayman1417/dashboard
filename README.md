# E-Commerce Dashboard

A responsive e-commerce dashboard built with **Next.js, React, Tailwind CSS, and Redux Toolkit**. The application includes Firebase authentication, product management, data visualization, filtering, sorting, pagination, PDF/Excel export, and Docker support.

## Features

* Firebase Authentication
* Login and Sign Up
* Form validation using Formik and Yup
* Responsive dashboard UI
* Product data table
* Product filtering by category
* Product sorting by price and stock
* Pagination
* Statistics and charts using Recharts
* PDF export
* Excel (XLSX) export
* Protected routes
* Responsive sidebar
* Dockerized production application
* Git Flow branching strategy

## Technologies Used

* Next.js
* React
* Tailwind CSS
* Redux Toolkit
* Firebase Authentication
* Formik
* Yup
* React Toastify
* Lucide React
* Recharts
* `@react-pdf/renderer`
* `xlsx`
* Docker
* Git / GitHub

# Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/ayman1417/dashboard.git
cd dashboard
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Firebase Authentication Setup

The application uses **Firebase Authentication** for user registration and login.

The Firebase configuration is located in:

```text
app/firebase/firebase.config.js
```

Make sure the Firebase project has **Email/Password Authentication** enabled.

## 4. Run the Application

Start the development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

Create an account from the **Sign Up** page, then use the account to log in.

## 5. Docker Setup

The application is configured to run as a production Next.js application inside Docker.

Build the Docker image:

```bash
docker build -t ecommerce-demo-dashboard .
```

Run the Docker container:

```bash
docker run -p 3000:3000 ecommerce-demo-dashboard
```

Open:

```text
http://localhost:3000
```

## 6. Main Dashboard Operations

After authentication, the dashboard provides:

* Product table
* Category filtering
* Price sorting
* Stock sorting
* Pagination
* Statistics and charts
* PDF export
* Excel export
* Responsive layout

# Implementation Approach

I started the project by creating the GitHub repository and setting up the Next.js application with the required project structure.

### 1. Project Setup

I initialized the Next.js application and configured the main technologies required for the task, including Tailwind CSS and Redux Toolkit.

The project was organized into reusable components and separate application sections to keep the code structured and maintainable.

### 2. Authentication

I implemented authentication using Firebase Authentication.

I created:

* Login page
* Sign Up page
* Protected routes

For the authentication forms, I used:

* **Formik** for form handling
* **Yup** for validation
* **React Toastify** for user notifications

I tested the authentication flow to make sure users can register and log in successfully.

### 3. Dashboard UI

I built the dashboard interface using Tailwind CSS and created a responsive sidebar.

I also used **Lucide React** icons to improve the dashboard navigation and user interface.

The dashboard was designed to work across desktop and mobile screen sizes.

### 4. Product Management

Product data is managed using **Redux Toolkit**.

The products table supports:

* Category filtering
* Price sorting
* Stock sorting
* Pagination

The table is designed to handle a large number of products while keeping the interface easy to use.

### 5. Data Visualization

I implemented dashboard statistics and visualizations using **Recharts**.

The charts provide a visual representation of the dashboard data.

### 6. Export Features

I added export functionality to allow users to download table data.

* **PDF** export using `@react-pdf/renderer`
* **Excel** export using `xlsx`

### 7. Dockerization

I configured the application for production using Docker.

I created:

* `Dockerfile`
* `.dockerignore`

The application was built and tested inside a Docker container to verify that the production version runs correctly.

### 8. Git Flow

I followed a Git Flow branching strategy during development.

Features were developed using separate branches:

```text
feature/auth
feature/products-table
feature/statistics-export
feature/protected-route
feature/docker
```

Completed features were merged into the `develop` branch, and the final version was merged into `main`.

Meaningful commit messages were used throughout the development process.

# Project Structure

```text
dashboard/
├── app/
│   ├── components/
│   ├── data/
│   ├── firebase/
│   ├── redux/
│   ├── login/
│   ├── signup/
│   └── ...
├── public/
├── Dockerfile
├── .dockerignore
├── package.json
└── README.md
```

# Available Scripts

Run the development server:

```bash
npm run dev
```

Build the production application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```
