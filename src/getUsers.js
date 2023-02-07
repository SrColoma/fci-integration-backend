
const AWS = require('aws-sdk');
const { getDbClient } = require('./funciones');

module.exports.getUsers = async(request) => {
    const dynamoDbClient = getDbClient();

    const users = await dynamoDbClient.scan({
        TableName: process.env.USERS_TABLE,
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(users.Items),
    };

};