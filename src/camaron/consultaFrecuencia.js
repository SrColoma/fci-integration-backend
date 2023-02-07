const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { getDbClient } = require('./funciones');

// es una consulta get
// consulta la frecuencia de muestreo
// retorna la frecuencia de muestreo
module.exports.consultaFrecuencia = async (request) => {
    const dynamoDbClient = getDbClient();

    // consulta la frecuencia de muestreo
    const frecuencia = await dynamoDbClient.get({
        TableName: process.env.CAMARON_FRECUENCIA_TABLE,
        Key: {
            id: "frecuencia",
        }
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(frecuencia.Item.frecuencia),
    }
}