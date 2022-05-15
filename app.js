const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require("config");

const {check} = require("express-validator")

const appController = require("./controllers/appController");
const isAuth = require("./middleware/is-auth");
const isAdmin = require("./middleware/isAdmin");

const connectDB = require("./config/db");
const mongoURI = config.get("mongoURI");

const app = express();

var path = require('path')

//var urlencodedParser = bodyParser.urlencoded({ extended: false }); //to analyze text URL-coding data, submit form data from regular forms set to POST) and provide the resulting object (containing keys and values) to req.body.
app.use("/public", express.static(path.join(__dirname, '/public')));
//requests
app.get('/', (req, res) => { //method send is convenience to send some strings,but there are pretty big size of code, it is not convenience. for this sendFile funciton is better
    res.render(__dirname + '/views/index.ejs'); //__dirname is to get absolute path to file.
})

app.get('/contact', (req, res) => { //method send is convenience to send some strings,but there are pretty big size of code, it is not convenience. for this sendFile funciton is better
    res.render(__dirname + '/views/contact.ejs'); //__dirname is to get absolute path to file.
})

app.get('/account-settings', (req, res) => { //method send is convenience to send some strings,but there are pretty big size of code, it is not convenience. for this sendFile funciton is better
    res.render(__dirname + '/views/account-settings.ejs'); //__dirname is to get absolute path to file.
})

app.get('/user-profile', (req, res) => { //method send is convenience to send some strings,but there are pretty big size of code, it is not convenience. for this sendFile funciton is better
  res.render(__dirname + '/views/user-profile.ejs'); //__dirname is to get absolute path to file.
})

app.get('/edu-content', (req, res) => { //method send is convenience to send some strings,but there are pretty big size of code, it is not convenience. for this sendFile funciton is better
    res.render(__dirname + '/views/edu/edu-content.ejs'); //__dirname is to get absolute path to file.
})
//



// connectDB();

const store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/reg",
    // databaseName: "sessions",
  collection: "users",
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

//=================== Routes
// Landing Page
app.get("/", appController.landing_page);

// Login Page
app.get("/login", appController.login_get);
app.post("/login", appController.login_post);

// Register Page
app.get("/register", appController.register_get);
app.post("/register", appController.register_post);

// Dashboard Page
app.get("/main", isAuth, appController.main_get);
app.get("/user-profile", isAuth, appController.userprofile_get);

app.post("/logout", appController.logout_post);

app.listen(5000, console.log("App Running on http://localhost:5000"));

// app.get("/admin", isAdmin);