
//include express module or package
const express = require('express');
//create instance of express
const app = express();


const { ApolloServer } = require('apollo-server-express');


require('dotenv').config()
const port = process.env.PORT
console.log({port})



const db = require('./db');
// Connect to the database
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
// console.log('process.env:')
// console.log(process.env)
// console.log('MONGO_HOSTNAME:')
// console.log(MONGO_HOSTNAME)


const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;
const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
db.connect(DB_URL);



 // GraphQL's schema ‘Query’
const typeDefs = require('./schema');
// create resolver functions for Query schema
const resolvers = require('./resolvers');


let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app , path: '/api' });
}
startServer();
// const httpserver = http.createServer(app);

app.get("/", function (req, res) {
    res.json({ data: "api working" });
});

app.listen(4000, function () {
    console.log(`server running on port 4000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});



//  //Create an instance of Apollo Server
// const server = new ApolloServer({ typeDefs, resolvers });
// `await server.start()`

// //Apply the Apollo GraphQL middleware and set the path to /api
// server.applyMiddleware({ app, path: '/api' });

// const port = 4000;


// app.get('/', (req, res) => res.send('Hello World'));
// // app.listen(4000, () => console.log('Listening on port 4000!'));


// app.listen({ port }, () =>
//  console.log(
//  `Server running at http://localhost:${port}`
//  )
// );

