# User Management API
This is a simple User Management API built with Node.js, Express, and MongoDB, featuring user creation, updating user details, user deletion, and retrieval of user information. The API enforces strong password rules and validates email and full name format.
## Prerequisites
Before you start, ensure you have the following installed:
Node.js
MongoDB
Postman (for testing the API)
## Installation
Clone this repository to your local machine.
Navigate to the project directory.
Install the required Node.js packages using npm.
npm install 
Start the MongoDB server. Make sure MongoDB is running.
Start the Node.js application.
node app.js 
Your server should now be running on http://localhost:3000.
## How to Use in Postman
To interact with the User Management API using Postman, follow these steps:
### Creating a New User
Open Postman and create a new POST request.
Set the request URL to http://localhost:3000/user/create.
In the request body, choose the "raw" option and use JSON format. Example:
{ "fullName": "John Doe", "email": "johndoe@example.com", "password": "StrongPassword123" } 
Click the "Send" button to create a new user. If successful, you will receive a response with the message "User created successfully."
### Updating User Details
Create a new PUT request in Postman.
Set the request URL to http://localhost:3000/user/edit.
In the request body, use JSON format to specify the user's email, new full name, and/or new password. Example:
{ "email": "johndoe@example.com", "fullName": "Updated Full Name", "password": "NewStrongPassword456" } 
Click the "Send" button to update the user's details. If successful, you will receive a response with the message "User details updated."
### Deleting a User
Create a new DELETE request in Postman.
Set the request URL to http://localhost:3000/user/delete.
In the request body, use JSON format to specify the user's email. Example:
{ "email": "johndoe@example.com" } 
Click the "Send" button to delete the user. If successful, you will receive a response with the message "User deleted."
### Retrieving User Information
Create a new GET request in Postman.
Set the request URL to http://localhost:3000/user/getAll.
Click the "Send" button to retrieve information about all users. The response will include the full name, email, and hashed password of each user.


Feel free to modify and use it for your purposes.
That's it! You can now use the User Management API with Postman for user creation, updates, deletions, and retrieval of user information.
