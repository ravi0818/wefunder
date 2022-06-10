require("dotenv/config");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const HttpError = require("../models/HttpError");
const url = process.env.DB_URL;

const client = new MongoClient(url);

const getCompanies = async (req, res, next) => {
  let response = [];
  try {
    await client.connect();
    const database = client.db("funderDB");
    const companiesData = database.collection("companyData");
    response = await companiesData.find().toArray();
    console.log(response);
    if (response != null) res.status(200).json(response);
  } catch (err) {
    console.log(err);
    next(new HttpError("Error!!", 404));
  } finally {
    await client.close();
  }
};

module.exports = {
  getCompanies,
};
