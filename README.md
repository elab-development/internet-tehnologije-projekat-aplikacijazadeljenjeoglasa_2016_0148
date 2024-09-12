# Career Connect

Career Connect is a web application designed to help students find job openings and internships, and companies to manage job listings and applications. The application is built using a Laravel backend and a React frontend, with MySQL as the database.

## Table of Contents

- [Installation](#installation)
  - [Backend (Laravel)](#backend-laravel)
  - [Frontend (React)](#frontend-react)
  - [Database Setup](#database-setup)
- [Seeding the Database](#seeding-the-database)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [Technologies Used](#technologies-used)

---

## Installation

To get the project running locally, follow the steps below.

### Backend (Laravel)

1. Navigate to the `laravel-app` directory:

   ```bash
   cd laravel-app
   ```

2. Install PHP dependencies using Composer:

   ```bash
   composer install
   ```

3. Create a copy of the `.env.example` file and rename it to `.env`. Update the database credentials in the `.env` file (see the [Database Setup](#database-setup) section for more details).

4. Generate an application key:

   ```bash
   php artisan key:generate
   ```

### Frontend (React)

1. Navigate to the `react-app` directory:

   ```bash
   cd react-app
   ```

2. Install the required Node.js dependencies:

   ```bash
   npm install
   ```

### Database Setup

This application uses a MySQL database by default, but you can configure it for other databases like PostgreSQL or SQLite if needed. Make sure you have MySQL running locally. 

In the `laravel-app/.env` file, configure your database connection as follows:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=career_connect
DB_USERNAME=root
DB_PASSWORD=
```

- **DB_CONNECTION**: The type of database (MySQL by default).
- **DB_HOST**: The host address of your MySQL server.
- **DB_PORT**: The port on which MySQL is running (default is 3306).
- **DB_DATABASE**: The name of the database you want to use.
- **DB_USERNAME**: Your MySQL username.
- **DB_PASSWORD**: Your MySQL password.

Once you've configured your `.env` file, run the following commands to migrate and set up your database:

```bash
php artisan migrate
```

## Seeding the Database

If you want to populate your database with test data (seed the database), you can run the following command:

```bash
php artisan db:seed
```

This will add predefined data to your tables, which can be helpful during development.

## Running the Application

1. **Start the Backend**: In the `laravel-app` folder, run:

   ```bash
   php artisan serve
   ```

   This will start the Laravel backend server on `http://127.0.0.1:8000`.

2. **Start the Frontend**: In the `react-app` folder, run:

   ```bash
   npm start
   ```

   This will start the React development server, which will likely run on `http://localhost:3000`.

Make sure both the backend and frontend are running simultaneously for full functionality.

## Configuration

### Database

Ensure that your MySQL database is running locally, and that the connection details are correctly set in your `.env` file inside the `laravel-app` folder.

If you need to use a different database (e.g., PostgreSQL), you can update the `DB_CONNECTION` in the `.env` file and adjust other relevant settings accordingly.

### Environment Variables

Make sure to configure all necessary environment variables in the `.env` file in the `laravel-app` directory. At a minimum, ensure the following are set:

- `APP_NAME`
- `APP_ENV`
- `APP_KEY`
- `DB_CONNECTION`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`

## Technologies Used

- **Backend**: Laravel (PHP)
- **Frontend**: React (JavaScript)
- **Database**: MySQL
- **Other**: Composer, NPM

---

This project is structured in two parts, and both must be running to properly use the application. Please ensure all dependencies are installed and databases are set up correctly before running the application.
