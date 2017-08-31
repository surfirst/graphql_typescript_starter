import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
//const schema = require('./schema.js');
import * as schema from './schema';

const app = express();

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));

var port:number = 5800;

app.listen(port, () =>{
    console.log(`server is listening on ${port}`);
});