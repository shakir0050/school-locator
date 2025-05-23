const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require("path");
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'school',
    password: 'Sh@kir82'
},console.log("connected to the DB!"));

// Haversine Formula to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// POST: Add a new school
app.post("/addSchool", (req, res) => {
     
    const {id, name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).send("All fields are required.");
    }

    const q = `INSERT INTO school (id,name, address, latitude, longitude) VALUES (?,?, ?, ?, ?)`;
    connection.query(q, [id, name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Database error while adding school.");
        }
        console.log("School detail added!")
        res.send("School Detail added!")
    });
});
app.get("/listSchools", (req, res) => {
    const lat = req.query.latitude;
    const lng = req.query.longitude;

    // If latitude or longitude is missing, show the input form
    if (!lat || !lng) {
        return res.render("getLocationForm.ejs");
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    if (isNaN(userLat) || isNaN(userLng)) {
        return res.status(400).send("Invalid latitude or longitude.");
    }

    const q = `SELECT * FROM school`;
    connection.query(q, (err, schools) => {
        if (err) {
            console.log(err);
            return res.send("Error retrieving school data.");
        }

        const schoolsWithDistance = schools.map((school) => {
            const distance = calculateDistance(
                userLat,
                userLng,
                school.latitude,
                school.longitude
            );
            return { ...school, distance };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        res.render("listSchools.ejs", { schools: schoolsWithDistance });
    });
});

//(Optional) Render Add School Form
app.get("/addSchool", (req, res) => {
    res.render("addSchool.ejs");
});

app.listen(port, () => {
    console.log("Server is running on port 8080");
});
