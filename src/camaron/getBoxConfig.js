const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { getDbClient } = require('../funciones');

// es una consulta get
// consulta la ultima configuracion de la caja
// retorna la configuracion de la caja
module.exports.getBoxConfig = async (request) => {
    const dynamoDbClient = getDbClient();


    const configuracion = await dynamoDbClient.get({
        TableName: process.env.CAMARON_CONFIGURACION_TABLE,
        Key: {
            id: "configuracion",
        }
    }).promise().catch((err) => {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: err }),
        }
    })


    // retorna la configuracion de la caja
    return {
        statusCode: 200,
        body: JSON.stringify(configuracion.Item.configuracion),
    }
}