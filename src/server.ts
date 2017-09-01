import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
//import {MyQuery} from './schema';
import {MyQuery} from './mssql_schema'

const app = express();

let schema = new MyQuery().GetRootQuery();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql:true
}));

var port:number = 5800;

app.listen(port, () =>{
    console.log(`server is listening on ${port}`);
});

