module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event,
    }),
  };
};










// const serverless = require('serverless-http');
// const bodyParser = require('body-parser');
// const express = require('express')
// const app = express()
// const AWS = require('aws-sdk');
 
// const USERS_TABLE = process.env.USERS_TABLE;
 
// const IS_OFFLINE = process.env.IS_OFFLINE;
// let dynamoDb;
// if (IS_OFFLINE === 'true') {
//   dynamoDb = new AWS.DynamoDB.DocumentClient({
//     region: 'localhost',
//     endpoint: 'http://localhost:8000'
//   })
//   console.log(dynamoDb);
// } else {
//   dynamoDb = new AWS.DynamoDB.DocumentClient();
// };
 
// app.use(bodyParser.json({ strict: false }));
 
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })
 
// // Get User endpoint
// app.get('/users/:userId', function (req, res) {
//   const params = {
//     TableName: USERS_TABLE,
//     Key: {
//       userId: req.params.userId,
//     },
//   }
 
//   dynamoDb.get(params, (error, result) => {
//     if (error) {
//       console.log(error);
//       res.status(400).json({ error: 'Could not get user' });
//     }
//     if (result.Item) {
//       const {userId, name} = result.Item;
//       res.json({ userId, name });
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   });
// })
 
// // Create User endpoint
// app.post('/users', function (req, res) {
//   const { userId, name } = req.body;
//   if (typeof userId !== 'string') {
//     res.status(400).json({ error: '"userId" must be a string' });
//   } else if (typeof name !== 'string') {
//     res.status(400).json({ error: '"name" must be a string' });
//   }
 
//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   };
 
//   dynamoDb.put(params, (error) => {
//     if (error) {
//       console.log(error);
//       res.status(400).json({ error: 'Could not create user' });
//     }
//     res.json({ userId, name });
//   });
// })
 
// module.exports.handler = serverless(app);




// const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
// const {
//   DynamoDBDocumentClient,
//   GetCommand,
//   PutCommand,
// } = require("@aws-sdk/lib-dynamodb");
// const express = require("express");
// const serverless = require("serverless-http");


// const app = express();

// const USERS_TABLE = process.env.USERS_TABLE;
// const IS_OFFLINE = process.env.IS_OFFLINE;
// const client = new DynamoDBClient(
//   IS_OFFLINE
//     ? {
//         region: "localhost",
//         endpoint: "http://localhost:8000",
//       }
//     : {}

// );
// const dynamoDbClient = DynamoDBDocumentClient.from(client);


// app.use(express.json());

// app.get("/users/:userId", async function (req, res) {
//   const params = {
//     TableName: USERS_TABLE,
//     Key: {
//       userId: req.params.userId,
//     },
//   };

//   try {
//     const { Item } = await dynamoDbClient.send(new GetCommand(params));
//     if (Item) {
//       const { userId, name } = Item;
//       res.json({ userId, name });
//     } else {
//       res
//         .status(404)
//         .json({ error: 'Could not find user with provided "userId"' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not retreive user" });
//   }
// });

// app.post("/users", async function (req, res) {
//   const { userId, name } = req.body;
//   if (typeof userId !== "string") {
//     res.status(400).json({ error: '"userId" must be a string' });
//   } else if (typeof name !== "string") {
//     res.status(400).json({ error: '"name" must be a string' });
//   }

//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   };

//   try {
//     await dynamoDbClient.send(new PutCommand(params));
//     res.json({ userId, name });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not create user" });
//   }
// });

// app.use((req, res, next) => {
//   return res.status(404).json({
//     error: "Not Found",
//   });
// });


// module.exports.handler = serverless(app);
