This School Management System allows users to add schools with location data and view nearby schools sorted by distance using the Haversine formula. Built with Node.js, Express, MySQL, and EJS, it features forms for adding schools and listing them based on user-provided coordinates.
Project Title: School Management System with Location-Based Search
Overview:
This project is a web-based School Management System developed using Node.js, Express.js, MySQL, and EJS templating. It provides functionality to add new schools with geographical location data (latitude and longitude) and allows users to view a list of schools sorted by proximity to their current location using the Haversine formula for calculating distances between coordinates.

🔧 Tech Stack:
Backend: Node.js, Express.js

Database: MySQL (using mysql2 package)

Frontend Templating: EJS (Embedded JavaScript Templates)

Utilities: Path module, Body-parser (via express.urlencoded)

Location Logic: Custom implementation using the Haversine formula

Key Features:
1. Add School
Users can add a new school by submitting details such as:

ID

Name

Address

Latitude and Longitude

The data is stored in a MySQL database (school table).

Validation ensures all fields are filled before insertion.

2. List Schools by Proximity
Users can input their current latitude and longitude.

The backend fetches all schools from the database and calculates the distance between each school and the user's location.

Results are sorted in ascending order of distance, showing the nearest schools first.

3. Distance Calculation
Implements the Haversine formula to compute geographical distance in kilometers between two latitude/longitude points.

Ensures accurate proximity-based search results.

4. User Interface
Uses EJS templates for rendering dynamic pages such as:

A form to add a new school (addSchool.ejs)

A form to enter user location (getLocationForm.ejs)

A list view of schools sorted by distance (listSchools.ejs)

⚙️ How It Works:
The user visits /addSchool to submit school details.

Schools are stored in a MySQL database.

The user navigates to /listSchools, inputs their location, and submits the form.

The server calculates the distance to each school and returns a sorted list.

Security Considerations:
Input validation is included to prevent null entries.

Console logs errors for debugging but could be enhanced with proper error messages and production-grade logging.

Potential Enhancements:
Add authentication and admin dashboard.

Implement front-end validation and real-time feedback.

Add Google Maps API to select coordinates via a map.

RESTful API support for frontend-backend separation.

