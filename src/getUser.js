
const AWS = require('aws-sdk');
const { getDbClient } = require('./funciones');

module.exports.getUser = async(request) => {
    const dynamoDbClient = getDbClient();
    const { userId } = request.pathParameters;

    const user = await dynamoDbClient.get({
        TableName: process.env.USERS_TABLE,
        Key: {
            userId: userId,
        },
    }).promise();

    if (!user.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: "User not found" }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(user.Item),
    };
};