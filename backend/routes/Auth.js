require("dotenv/config");
const { MongoClient } = require("mongodb");
const HttpError = require("../models/HttpError");
const url = process.env.DB_URL;

const client = new MongoClient(url);

const investorLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let isExist;
  let response;
  try {
    await client.connect();
    const database = client.db("funderDB");
    const investerData = database.collection("investorData");
    isExist = await investerData.findOne({
      email: email,
      password: password,
    });
    if (isExist) {
      response = await investerData.findOne({
        email: email,
      });
    } else next(new HttpError("Invalid Credentials", 404));
    console.log(response);
    if (response != null) res.status(200).json(response);
  } finally {
    await client.close();
  }
};

const companyLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let isExist;
  let response;
  try {
    await client.connect();
    const database = client.db("funderDB");
    const companyData = database.collection("companyData");
    isExist = await companyData.findOne({
      email: email,
      password: password,
    });
    if (isExist) {
      response = await companyData.findOne({
        email: email,
      });
    } else next(new HttpError("Invalid Credentials", 404));
    console.log(response);
    if (response != null) res.status(200).json(response);
  } finally {
    await client.close();
  }
};

const investorSignup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const account = req.body.account;
  const password = req.body.password;
  let isExist;
  let response;
  try {
    await client.connect();
    const database = client.db("funderDB");
    const investerData = database.collection("investorData");
    isExist = await investerData.findOne({
      email: email,
      password: password,
    });
    if (!isExist) {
      const newUser = {
        name: name,
        email: email,
        phone: phone,
        account: account,
        password: password,
        investedIn: [],
      };
      await investerData.insertOne(newUser);
      response = await investerData.findOne({
        email: email,
      });
      console.log(response);
      console.log(`User Created`);
    }
    if (isExist) {
      next(new HttpError("Email already exists", 403));
    } else {
      res.json(response);
    }
  } finally {
    await client.close();
  }
};

const companySignup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const account = req.body.account;
  const password = req.body.password;
  let isExist;
  let response;
  try {
    await client.connect();
    const database = client.db("funderDB");
    const investerData = database.collection("companyData");
    isExist = await investerData.findOne({
      email: email,
      password: password,
    });
    if (!isExist) {
      const newUser = {
        name: name,
        email: email,
        phone: phone,
        account: account,
        password: password,
        tagline: "tagline",
        description: "description",
        mininvest: 0,
        target: 0,
        fundraise: false,
      };
      await investerData.insertOne(newUser);
      response = await investerData.findOne({
        email: email,
      });
      console.log(response);
      console.log(`User Created`);
    }
    if (isExist) {
      next(new HttpError("Email already exists", 403));
    } else {
      res.json(response);
    }
  } finally {
    await client.close();
  }
};

module.exports = {
  investorSignup,
  companySignup,
  investorLogin,
  companyLogin,
};
