const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Session middleware setup
app.use(
    "/customer", 
    session({
        secret:"fingerprint_customer",
        resave: true, 
        saveUninitialized: true
    })
);

// Use the genl_routes router at the '/book' endpoint
app.use('/book', genl_routes);

app.use("/customer/auth/*", function auth(req,res,next){
    // Check if the user is authenticated through a session
    if (req.session && req.session.user) {
        // Session exists, proceed to the next route handler
        next();
    } else {
        // If no session found, respond with a 401 Unauthorized error
        return res.status(401).json({ message: "Unauthorized access" });
    }
});
 
const PORT =5001;

// Use the routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
