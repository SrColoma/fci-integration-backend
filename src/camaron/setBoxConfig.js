const AWS = require('aws-sdk');
const { getDbClient } = require('../funciones');


//recive un json con la nueva configuracion de la caja
// crea un nuevo objeto con la nueva configuracion y la fecha de creacion
// guarda el nuevo objeto en la base de datos
// retorna un mensaje de exito
module.exports.setBoxConfig = async (request) => {
    const dynamoDbClient = getDbClient();
    const nuevaConfiguracion = JSON.parse(request.body);

    // actualiza la configuracion de la caja ocn id configuracion
    // si no existe la crea
    const configuracion = await dynamoDbClient.update({
        TableName: process.env.CAMARON_CONFIGURACION_TABLE,
        Key: {
            id: "configuracion",
        },
        UpdateExpression: "set configuracion = :configuracion, fecha = :fecha",
        ExpressionAttributeValues: {
            ":configuracion": nuevaConfiguracion,
            ":fecha": new Date().toISOString(),
        },
        ReturnValues: "UPDATED_NEW",
    }).promise().catch((err) => {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: err }),
        }
    })
    
    return {
        statusCode: 200,
        body: JSON.stringify(configuracion),
    }

    
}