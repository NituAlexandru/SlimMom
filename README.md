# SlimMom App Documentation - frontend

## Overview

Slimmom is a web application designed to support mothers in their journey to maintain a healthy lifestyle. This app provides a range of features to help mothers calculate their daily calorie intake, make informed dietary choices based on their blood type, and track their daily food consumption and calorie intake.

## Features

Slimmom offers the following key features to its users:

- **Registration:** Users can create an account on Slimmom, providing essential information to personalize their experience.
- **Calorie Calculator:** Calculate your daily calorie intake based on your individual requirements, helping you maintain a healthy diet.
- **Blood Type Diet Recommendations:** Get personalized dietary recommendations based on your blood type to make healthier food choices.
- **Diary Management:**
  - **Diary List:** Create and manage your daily diary entries to track your food consumption.
  - **Diary Foods Search:** Search for foods and their calorie information to easily add them to your diary.
  - **Diary Calendar:** Visualize your daily diary entries on a calendar to monitor your food habits over time.
- **Authentication:** Securely log in to your account with our user-friendly login form.

## Technology Stack

Slimmom is built using a variety of technologies and tools, including:

- **Frontend:** JavaScript, React + Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:**
  - **Frontend:** GitHub Pages
  - **Backend:** Heroku
- **API Documentation:** Swagger

## Getting Started

### Prerequisites

- **Node.js:** v14 or higher
- **npm:** v6 or higher

### Installation

1. Clone the repository:

   git clone https://github.com/NituAlexandru/Slim-mom-frontend.git
   cd Slim-mom-frontend

2. Install dependencies:

   npm install

   # or

   yarn install

### Development

To start the development server:

```sh
npm run dev
# or
yarn dev
```

### Build

To create a production build:

npm run build

# or

yarn build

**Deployment**

To deploy the application to GitHub Pages:

npm run deploy

# or

yarn deploy

**Routing**

The application uses React Router for navigation. The base path for all routes is /Slim-mom-frontend.

- Home: /
- Login: /login
- Register: /register
- Diary: /diary
- Calculator: /calculator
- 404 Not Found: \*

**Components**

- Header: Contains navigation links and user information.
- MainPage: Home page of the application.
- LoginPage: Form for user login.
- RegistrationPage: Form for user registration.
- DiaryPage: Page to manage daily diary entries.
- CalculatorPage: Page to calculate daily calorie intake.
- NotFound: Page shown for undefined routes.
- Context API
- The application uses Context API for state management, particularly for authentication.

AuthContext: Provides authentication state and functions like login, logout, and updateUserProfile.

**Styling**
The application uses Sass for styling. Styles are organized in the src/styles directory and imported into components as needed.

# SlimMom App Documentation - backend

## Overview

Slimmom is a web application designed to support mothers in their journey to maintain a healthy lifestyle. This app provides a range of features to help mothers calculate their daily calorie intake, make informed dietary choices based on their blood type, and track their daily food consumption and calorie intake.

## Features

Slimmom offers the following key features to its users:

- **Registration:** Users can create an account on Slimmom, providing essential information to personalize their experience.
- **Calorie Calculator:** Calculate your daily calorie intake based on your individual requirements, helping you maintain a healthy diet.
- **Blood Type Diet Recommendations:** Get personalized dietary recommendations based on your blood type to make healthier food choices.
- **Diary Management:**
  - **Diary List:** Create and manage your daily diary entries to track your food consumption.
  - **Diary Foods Search:** Search for foods and their calorie information to easily add them to your diary.
  - **Diary Calendar:** Visualize your daily diary entries on a calendar to monitor your food habits over time.
- **Authentication:** Securely log in to your account with our user-friendly login form.

## Technology Stack

Slimmom is built using a variety of technologies and tools, including:

- **Frontend:** JavaScript, React + Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:**
  - **Frontend:** GitHub Pages
  - **Backend:** Heroku
- **API Documentation:** Swagger

## Getting Started

### Prerequisites

- **Node.js:** v14 or higher
- **npm:** v6 or higher

### Installation

### Installation

1. Clone the repository:

   git clone https://github.com/NituAlexandru/Slim-mom-backend.git
   cd Slim-mom-backend

2. Install dependencies:

   npm install

   # or

   yarn install

### Development

To start the development server:

```sh
npm start

```

# Slim Mom Backend API

This is the backend API for the Slim Mom application. It handles user authentication, calorie calculations, product management, and more.

## API Endpoints

### Auth
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login a user
- **POST** `/api/auth/logout` - Logout a user
- **GET** `/api/auth/user` - Get current user details
- **POST** `/api/auth/updateUserProfile` - Update user profile

### Calorie Calculator
- **POST** `/api/calories/public` - Calculate daily calorie intake (public endpoint)
- **POST** `/api/calories/user` - Calculate daily calorie intake for logged-in user

### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products/search` - Search for products by query

### Consumed Products
- **POST** `/api/consumed-products` - Add a consumed product
- **DELETE** `/api/consumed-products/{id}` - Delete a consumed product by its ID
- **GET** `/api/consumed-products/` - Get consumed products for a specific date

### Day Info
- **GET** `/api/day-info/` - Get day information for a specific date

### User Calorie
- **POST** `/api/user-calorie` - Save the user's daily calorie intake
- **GET** `/api/user-calorie` - Get the user's daily calorie intake

## Environment Variables

The backend uses environment variables to configure various settings. These variables are defined in the `.env` file:

- `PORT` - Port on which the server runs
- `DB_URI` - MongoDB connection URI
- `SECRET_KEY` - Secret key for JWT

## Models

The backend uses Mongoose to define the following models:

- **User** - Represents a user in the system
- **userCalorie** - Represents a food product
- **ConsumedProduct** - Represents a product consumed by a user


## Controllers

The controllers handle the business logic for various operations, including authentication, calorie calculation, product management, and more.

## Routes

The routes define the API endpoints and map them to the corresponding controllers. The main routes are defined in the `routes` directory and include:

- **auth.js** - Authentication routes
- **calories.js** - Calorie calculator routes
- **products.js** - Product management routes
- **consumedProducts.js** - Consumed products routes
- **dayInfo.js** - Day information routes
- **userCalorie.js** - User calorie routes

## Swagger Documentation

The backend API documentation is generated using Swagger. The Swagger documentation can be accessed at `/api-docs`.

## Deployment

### Heroku

To deploy the backend to Heroku:

1. Create a new Heroku application:

    ```sh
    heroku create slim-mom-backend
    ```

2. Set the environment variables on Heroku:

    ```sh
    heroku config:set PORT=5000
    heroku config:set DB_URI=<your-mongodb-uri>
    heroku config:set SECRET_KEY=<your-secret-key>
    ```

3. Deploy the application:

    ```sh
    git push heroku master
    ```

---

Feel free to contribute to this project or report any issues you encounter.
