const AWS = require('aws-sdk');

function getDbClient(){
    if (process.env.IS_OFFLINE === 'true') {
        dynamoDbClient = new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
        })
        // console.log("dynamoDbClient ofline recive : "+ JSON.parse(request.body));
    } else {
        dynamoDbClient = new AWS.DynamoDB.DocumentClient();
    };
    return dynamoDbClient;
};


module.exports = {
    getDbClient,
}