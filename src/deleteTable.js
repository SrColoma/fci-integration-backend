
const AWS = require('aws-sdk');
const { getDbClient } = require('./funciones');

module.exports.deleteTable = async(request) => {
    const dynamoDbClient = getDbClient();
    const { tableName } = request.pathParameters;

    // const table = await dynamoDbClient.deleteTable({
    //     TableName: tableName,
    // }).promise();


    return {
        statusCode: 200,
        body: JSON.stringify({ message: "tabla "+ tableName +" eliminada, buenop no, pero esa es la idea jajajaj" }),
    };
};