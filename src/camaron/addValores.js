
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { getDbClient } = require('../funciones');

// recive los valores de los sensores por post
// los guarda en dynamoDB 
// consulta la configuracion de la caja
// la configuracion de la caja
module.exports.addValores = async (request) => {
    const nuevosValores = JSON.parse(request.body);
    const dynamoDbClient = getDbClient();
    const valores = {
        id: uuidv4(),
        fecha: new Date().to,
        valores: nuevosValores,
    }

    //guarda los valores en la base de datos
    await dynamoDbClient.put({
        TableName: process.env.CAMARON_VALORES_TABLE,
        Item: valores,
    }).promise().catch((err) => {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: err }),
        }
    })
    

    // consulta la configuracion de la caja
    const configuracion = await dynamoDbClient.get({
        TableName: process.env.CAMARON_CONFIGURACION_TABLE,
        Key: {
            id: "configuracion",
        }
    }).promise().catch((err) => {
        // envia el error err
        return {
            statusCode: 200,
            body: JSON.stringify({ message: err }),
        }
    })

    // retorna la configuracion de la caja
    return {
        statusCode: 200,
        body: JSON.stringify({"configuracion":configuracion.Item,"valores":valores}),
    }
}
