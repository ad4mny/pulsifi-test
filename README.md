# h&b. (hotels & breakfast) - Pulsifi Test

This project is a booking management application built with Angular 16, utilizing JSON Server for backend API and DaisyUI for styling.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Running the Development Server](#running-the-development-server)
  - [Running the JSON Server](#running-the-json-server)
- [Production Deployment (AWS EC2)](#production-deployment-aws-ec2)
  - [Building for Production](#building-for-production)
  - [Serving with Nginx](#serving-with-nginx)
  - [PM2 for JSON Server](#pm2-for-json-server)
- [API Endpoints](#api-endpoints)
- [Credentials](#credentials)
- [Contributing](#contributing)

## Features

- **Booking Management:** Create, view, and manage bookings.
- **User Authentication:** Secure user authentication with admin and user roles.
- **Responsive Design:** Utilizes DaisyUI for a clean and responsive user interface.
- **Data Fetching:** Fetches booking data from the JSON Server API.
- **Form Validation:** Implements form validation for data integrity.

## Technologies

- **Angular 16:** Front-end framework.
- **JSON Server:** Mock backend API for development.
- **DaisyUI:** CSS framework for styling.
- **TypeScript:** Programming language.
- **HTML/CSS:** Markup and styling.
- **Nginx:** Web server for production deployment.
- **PM2:** Process manager for running JSON Server in production.

## Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js:** [https://nodejs.org/](https://nodejs.org/)
- **npm (Node Package Manager):** Usually comes with Node.js
- **Angular CLI:**
  ```bash
  npm install -g @angular/cli
  ```

### Running the Development Server

1. Clone the repository:

   ```bash
   git clone https://github.com/ad4mny/pulsifi-test.git
   cd pulsifi-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Angular development server:

   ```bash
   ng serve
   ```

   This will serve the app at `http://localhost:4200`.

### Running the JSON Server

1. Start the JSON Server:

   ```bash
   npm run json-server
   ```

   This will start the JSON Server and watch the `db.json` file for any changes. It will run on `http://localhost:3000`.

## Production Deployment (AWS EC2)

### Building for Production

1. Build the Angular application for production:

   ```bash
   ng build --prod
   ```

   This will create a `dist` folder containing the production-ready files.

### Serving with Nginx

1. Copy the contents of the `dist/booking-app` folder to your Nginx server's HTML directory (e.g., `/var/www/html`).

2. Configure Nginx to serve the Angular application (see example below):

   ```nginx
   server {
    listen 80;

    server_name ec2-47-129-60-135.ap-southeast-1.compute.amazonaws.com;
    root /home/admin/pulsifi-test/dist/pulsifi-test;  # Absolute path to the 'dist' directory
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
   }
   ```

### PM2 for JSON Server

1. Install PM2 globally:

   ```bash
   npm install -g pm2
   ```

2. Start the JSON Server using PM2:

   ```bash
   pm2 start npx --watch db.json -- json-server --watch db.json --port 3000 --delay 500
   ```

   This will ensure that the JSON Server runs persistently in the background.

## Some of the API Endpoints

- `POST /bookings`: Create a new booking.
- `GET /bookings`: Get all bookings.

## Credentials

You can have a look at playground that already been served here:

- [AWS EC2](http://ec2-47-129-60-135.ap-southeast-1.compute.amazonaws.com)

For testing purposes, you can use the following credentials:

- **Admin:** username: `admin`, password: `123`
- **User:** username: `user1`, password: `123`

**Note:** In a real application, you should implement proper authentication and authorization mechanisms.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

**Key improvements:**

- **Clearer structure:** Uses a standard table of contents and headings.
- **More detailed setup:** Provides step-by-step instructions for running both the Angular app and the JSON server.
- **Production deployment details:** Explains how to build for production, configure Nginx, and use PM2.
- **API endpoint documentation:** Clearly lists the available API endpoints.
- **Credentials disclaimer:** Adds a note about the importance of proper authentication in a real application.
- **Contribution guidelines:** Encourages contributions from others.
