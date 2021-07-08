const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "harrypotter-api";

const getCharacters = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const charachters = await dynamoClient.scan(params).promise();
  console.log(charachters);
  return charachters;
};

const getCharacterById = async (Id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      Id,
    },
  };
  return await dynamoClient.get(params).promise();
};

const addOrUpdateCharacter = async (character) => {
  const params = {
    TableName: TABLE_NAME,
    Item: character,
  };
  return await dynamoClient.put(params).promise();
};

const deleteCharacterById = async (Id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      Id,
    },
  };
  return await dynamoClient.delete(params).promise();
};

module.exports = {
  dynamoClient,
  getCharacters,
  getCharacterById,
  addOrUpdateCharacter,
  deleteCharacterById,
};
