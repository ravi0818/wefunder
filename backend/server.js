const express = require("express");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

const {
  investorSignup,
  companySignup,
  investorLogin,
  companyLogin,
} = require("./routes/Auth.js");
const { updateUser, updateCompany, getCompany } = require("./routes/Post.js");
const { getCompanies } = require("./routes/Get.js");

const options = { ordered: true };

app.get("/", (req, res, next) => {
  res.send("<a href='http://localhost:3000'>Go to frontend</a>");
});

app.post("/api/signup/investor", investorSignup);
app.post("/api/signup/company", companySignup);
app.post("/api/login/investor", investorLogin);
app.post("/api/login/company", companyLogin);
app.post("/api/company", getCompany);
app.post("/api/updateuser", updateUser);
app.post("/api/updatecompany", updateCompany);

app.get("/api/companies", getCompanies);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000);
