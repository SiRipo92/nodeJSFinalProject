const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
require('dotenv').config(); // Load variables from .env

const app = express();

app.use(express.json());

// Session middleware setup
app.use(
    "/customer", 
    session({
        secret:process.env.JWT_SECRET,
        resave: true, 
        saveUninitialized: true,
        cookie: { secure: false, maxAge:3600000 } // 1 hour
    })
);

// Use the genl_routes router at the '/baook' endpoint
app.use('/book', genl_routes);

app.use("/customer/auth/*", function auth(req,res,next){
    // Check if there is an authorization object in the session
    if (req.session.authorization) {
        // Get the access token stored in the session
         const token = req.session.authorization['accessToken'];
        // Verify the token using JWT
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                // If the token verification fails, return an error
                return res.status(403).json({ message: "User not authenticated" });
            } else {
                // If the token is valid, attach user information to the request object
                req.user = user;
                // Proceed to the next middleware or route handler
                next();
            }
        });
    } else {
        // If no authorization information exists, return a 403 error
        return res.status(403).json({ message: "User not logged in" });
    }
});
 
const PORT =5001;

// Use the routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running at port " + PORT));
