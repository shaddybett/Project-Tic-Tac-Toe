# Project-Tic-Tac-Toe

# Backend

# Introduction
Welcome to our RESTful API! This API is built using Flask, a Python web framework, and it provides endpoints for user authentication and various functionalities related to tic tac toe.

# Getting Started
To run this API locally, follow these steps:

-Clone the repository to your local machine.
-Navigate to the project directory using the terminal.
-Install the required dependencies using the following command:

**pip install -r requirements.txt**

Run the app.py file to start the Flask server:
Copy code
python app.py
The API will be accessible at http://localhost:5555.

# API Endpoints
1. Index
Endpoint: /
Method: GET
Description: Returns a welcome message for the RESTful API.
2. User Signup
Endpoint: /
Method: POST
Description: Allows users to sign up by providing a username, email, and password. Upon successful registration, the user's information is stored in the database.
3. User Login
Endpoint: /client/src/components/UserLogin.js
Method: POST
Description: Enables users to log in with their email and password. If successful, the user's session is initiated.

# Dependencies
Flask: A micro web framework for Python.
Flask-Bcrypt: A Flask extension for bcrypt hashing.
Flask-Migrate: Extension for Flask to handle database migrations.
Flask-RESTful: An extension for Flask to quickly build REST APIs.
Flask-CORS: A Flask extension for handling Cross-Origin Resource Sharing.
Database
The API uses an SQLite database located at db/app.db to store user information, including usernames, emails, and hashed passwords.

# Security
The API employs Bcrypt for secure password hashing to ensure the confidentiality of user credentials.

# Development
For development purposes, the API runs on port 5555 and includes debugging capabilities.

Note: Ensure that you have Python and pip installed on your machine before running the API.

Feel free to explore the API and integrate it into your projects! If you encounter any issues or have suggestions, please let us know.

# Contributors
Charles Henry
Shadrack Bett
Joe Kisaka
Onesmus Githua
Ian Maboi
Eve
Elizabeth Muthoni
Micheal Muchiri
Evans Manoti
