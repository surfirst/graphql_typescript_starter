import * as sql from 'mssql';
import * as GraphQL from 'graphql';

interface MsSqlConfig{
    user: string;
    password: string;
    server: string;
    database: string

    options: any
}

export class SqlQuery{
     static async Execute() : Promise<sql.IRecordSet<any>> {
        try {
            const config : MsSqlConfig = {
                user: 'sa',
                password: '*****',
                server: '10.175.29.81', // You can use 'localhost\\instance' to connect to named instance 
                database: 'Customer',
             
                options: {
                    encrypt: true // Use this if you're on Windows Azure 
                }
            };

            let conn = new sql.ConnectionPool(config);
            let pool = await conn.connect();
            let customers = await pool.request().query(
                'SELECT id, name, email, age from Customer'
            );

            console.log(customers.recordset);

            return customers.recordset;

        } catch (error) {
            console.log(error);
        }
    }
}

interface Customer{
    id: string;
    name: string;
    email: string;
    age: number
}

export class MyQuery {

    static readonly customers: Customer[] = [
        {id: '1', name: 'John Doe', email:'jdoe@gmail.com', age:35},
        {id: '2', name: 'Steve Smith', email:'steve@gmail.com', age:25},
        {id: '3', name: 'Sara Williams', email:'sara@gmail.com', age:32},
    ];
    
    // Customer Type
    static readonly CustomerType = new GraphQL.GraphQLObjectType({
        name: 'Customer',
        fields:() =>({
            id: {type: GraphQL.GraphQLString},
            name: {type: GraphQL.GraphQLString},
            email: {type: GraphQL.GraphQLString},
            age: {type: GraphQL.GraphQLInt},
        })
    });

    GetRootQuery() : GraphQL.GraphQLSchema
    {
        let customersResolver = (parentValue:any, args:any) : Promise<sql.IRecordSet<any>> =>{
            return this.resolveCustomers(parentValue, args);
        };        

        let customerResolver = (parentValue:any, args:any) : Customer =>{
            return this.resolveCustomer(parentValue, args);
        };        

        let RootQuery= new GraphQL.GraphQLObjectType({
            name: 'RootQueryType',
            fields:{
                customer:{
                    type: MyQuery.CustomerType,
                    args: {
                        id:{type:GraphQL.GraphQLString}                    
                    },
                    resolve(parentValue, args){
                        return customerResolver(parentValue, args);
                    }
                },
                customers:{
                    type: new GraphQL.GraphQLList(MyQuery.CustomerType),                                      
                    resolve(parentValue, args){
                        return customersResolver(parentValue, args);
                    }
                }
            }
        });
                
        return new GraphQL.GraphQLSchema({
            query: RootQuery
        });
    }

    resolveCustomer(parentValue: any, args: any) : Customer{
        
        for(let i = 0; i < MyQuery.customers.length; i++){
            if(MyQuery.customers[i].id == args.id){
                return MyQuery.customers[i];
            }
        }

        return null;
    }

    resolveCustomers(parentValue: any, args: any) : Promise<sql.IRecordSet<any>> {        
        
        let customers = Promise.resolve(SqlQuery.Execute());

        return customers;
    }
}



