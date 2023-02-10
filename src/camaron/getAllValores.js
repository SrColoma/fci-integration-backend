const AWS = require('aws-sdk');
const { getDbClient } = require('../funciones');

//es una peticion get
// consulta todos los valores de los sensores
// trae todos los objetos de la tabla CAMARON_VALORES_TABLE
module.exports.getAllValores = async (request) => {
    const dynamoDbClient = getDbClient();

    // consulta todos los valores de los sensores
    const valores = await dynamoDbClient.scan({
        TableName: process.env.CAMARON_VALORES_TABLE,
    }).promise().catch((err) => {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: err }),
        }
    })

    // trae todos los objetos de la tabla CAMARON_VALORES_TABLE
    return {
        statusCode: 200,
        body: JSON.stringify(valores),
    }
}