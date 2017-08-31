import * as GraphQL from 'graphql';

/*const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');*/

// Hardcoded data
const customers = [
    {id: '1', name: 'John Doe', email:'jdoe@gmail.com', age:35},
    {id: '2', name: 'Steve Smith', email:'steve@gmail.com', age:25},
    {id: '3', name: 'Sara Williams', email:'sara@gmail.com', age:32},
];

// Customer Type
const CustomerType = new GraphQL.GraphQLObjectType({
    name: 'Customer',
    fields:() =>({
        id: {type: GraphQL.GraphQLString},
        name: {type: GraphQL.GraphQLString},
        email: {type: GraphQL.GraphQLString},
        age: {type: GraphQL.GraphQLInt},
    })
});

// Root Query
const RootQuery= new GraphQL.GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        customer:{
            type: CustomerType,
            args: {
                id:{type:GraphQL.GraphQLString}                    
            },
            resolve(parentValue, args){
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                }
            }
        },
        customers:{
            type: new GraphQL.GraphQLList(CustomerType),
            resolve(parentValue, args){
                return customers;
            }
        }
    }
});

module.exports = new GraphQL.GraphQLSchema({
    query: RootQuery
});