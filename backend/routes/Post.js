require("dotenv/config");
const { MongoClient, ObjectID } = require("mongodb");
const HttpError = require("../models/HttpError");
const url = process.env.DB_URL;

const client = new MongoClient(url);

const updateUser = async (req, res, next) => {
  const email = req.body.email;
  let response;
  try {
    await client.connect();
    const database = client.db("funderDB");
    const investorData = database.collection("investorData");
    isExist = await investorData.findOne({
      email: email,
    });
    console.log("found");
    const updateUser = req.body;
    delete updateUser._id;
    response = await investorData.replaceOne(
      { email: email },
      { ...updateUser },
      { returnNewDocument: true }
    );
    response = await investorData.findOne({
      email: email,
    });
    console.log(`A document was updated with the _id: ${response._id}`);
    res.json(response);
  } finally {
    await client.close();
  }
};

const updateCompany = async (req, res, next) => {
  const email = req.body.email;
  let response;
  try {
    await client.connect();
    const database = client.db("funderDB");
    const companyData = database.collection("companyData");
    isExist = await companyData.findOne({
      email: email,
    });
    console.log(isExist);
    const updateCompany = req.body;
    delete updateCompany._id;
    response = await companyData.replaceOne(
      { email: email },
      { ...updateCompany },
      { returnNewDocument: true }
    );
    response = await companyData.findOne({
      email: email,
    });
    console.log(`A document was updated with the _id: ${response._id}`);
    res.json(response);
  } finally {
    await client.close();
  }
};

const getCompany = async (req, res, next) => {
  console.log(req.body.email);
  let response;
  try {
    await client.connect();
    const database = client.db("funderDB");
    const companiesData = database.collection("companyData");
    response = await companiesData.findOne({ email: req.body.email });
    console.log(response);
    if (response != null) res.status(200).json(response);
  } catch (err) {
    console.log(err);
    next(new HttpError("Error!!", 404));
  } finally {
    await client.close();
  }
};

module.exports = { updateUser, updateCompany, getCompany };
