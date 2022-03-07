/* eslint-disable curly */
/* eslint-disable brace-style */
// load the things we need
const express = require("express");
const app = express();
const bodyParser = require("body-parser");


// importer les fonctions requises pour le site
const Enmap = require("enmap");
const functions = require("./utils/functions");
const checkSignUp = require("./utils/extensions/checkSignUp");

// let the body encode
app.use(bodyParser.urlencoded({ extended: false }));

// start the client
const client = {
    Users: new Enmap({ name: "Users", fetchAll: true, dataDir: "./data" }),
    createUser: functions.createUser,
    findUser: functions.findUser,
};

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// use res.render to load up an ejs view file

// index page
app.get("/", async function(req, res) {
    res.render("pages/index");
});

// signup page
app.get("/signup", async function(req, res) {
    res.render("pages/signup", {
        errors: {
            realName: "",
            pseudonyme: "",
            email: "",
            password: "",
            confirmedPassword: "",
        },
    });
}).post("/signup", async function(req, res) {
    console.log(client.Users);
    const formIsValid = await checkSignUp(req.body);

    console.log(formIsValid);

    if (!formIsValid.realName || !formIsValid.pseudonyme || !formIsValid.email || !formIsValid.password || !formIsValid.confirmedPassword) {
        res.render("pages/signup", {
            errors: {
                realName: formIsValid.realName ? "" : "Saisissez un nom correcte. (a-zA-Z)",
                pseudonyme: formIsValid.pseudonyme ? "" : "Saisissez un pseudonyme correcte. (a-zA-Z,0-9, - ou _)",
                email: formIsValid.email ? "" : "Votre email doit être de la forme example@email.dom",
                password: formIsValid.password ? "" : "Saisissez un mot de passe correct. (a-zA-Z,0-9, - ou _)",
                confirmedPassword: formIsValid.confirmedPassword ? "" : "Votre mot de passe n'est pas identique au précédent.",
            },
        });
    } else {

        const countExists = await client.findUser(client, req.body.pseudonyme);
        if (countExists === null) {
            console.log("bienvenue nouvel utilisateur !");
            await client.createUser(client, req.body);
        } else {
            console.log("le compte existe déjà !");
        }
    }
});

app.get("/signin", async function(req, res) {
    res.render("pages/signin");
});

app.listen(8080);
console.log("8080 is the magic port");

client.Users.clear();
console.log(client.Users);