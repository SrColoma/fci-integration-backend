
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { getDbClient } = require('./funciones');


module.exports.addUser = async (request) => {

    const dynamoDbClient = getDbClient();

    const userId = uuidv4();
    const {name} = JSON.parse(request.body);
    const createAt = new Date().toISOString();

    const newUser = {
        userId,
        name,
        createAt,
    }

    //agregar await al principio para produccion
    /*await*/ dynamoDbClient.put({
        TableName: process.env.USERS_TABLE,
        Item: newUser,
    }).promise()


    return {
        statusCode: 200,
        body: JSON.stringify(newUser),

    }
}