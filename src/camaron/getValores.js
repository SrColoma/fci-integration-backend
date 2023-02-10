const AWS = require('aws-sdk');
const { getDbClient } = require('../funciones');

//es una peticion post
// recive  un json con la fecha de inicio y la fecha final
// consulta los valores de los sensores en el rango de fechas
// retorna los valores de los sensores en el rango de fechas
module.exports.getValores = async (request) => {
    const dynamoDbClient = getDbClient();
    const { fechaInicio, fechaFinal } = JSON.parse(request.body);

    // consulta los valores de los sensores en el rango de fechas
    const valores = await dynamoDbClient.query({
        TableName: process.env.CAMARON_VALORES_TABLE,
        // IndexName: 'fecha-hora-index',
        KeyConditionExpression: "fecha BETWEEN :fechaInicio AND :fechaFinal",
        ExpressionAttributeValues: {
            ":fechaInicio": fechaInicio,
            ":fechaFinal": fechaFinal,
        },
    }).promise().catch((err) => {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: err }),
        }
    })

    // retorna los valores de los sensores en el rango de fechas
    return {
        statusCode: 200,
        body: JSON.stringify({res:valores}),
    }
}