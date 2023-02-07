
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { getDbClient } = require('./funciones');

// recive los valores de los sensores
// los guarda en dynamoDB 
// consulta la frecuencia de muestreo
// retorna la frecuencia de muestreo
module.exports.addValores = async (request) => {
    const nuevosValores = JSON.parse(request.body);
    const dynamoDbClient = getDbClient();
    const valores = {
        id: uuidv4(),
        fecha: new Date().toISOString(),
        valores: nuevosValores,
        // temperatura: nuevosValores.temperatura,
        // humedad: nuevosValores.humedad,
        // ph: nuevosValores.ph,
        // oxigeno: nuevosValores.oxigeno,
        // salinidad: nuevosValores.salinidad,
        // turbiedad: nuevosValores.turbiedad,
        // luz: nuevosValores.luz,
    }

    //agregar await al principio para produccion
    /*await*/ dynamoDbClient.put({
        TableName: process.env.CAMARON_VALORES_TABLE,
        Item: valores,
    }).promise()

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
