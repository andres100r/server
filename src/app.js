const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();




// conexion a mongoDB
mongoose.connect('mongodb://localhost/arquitectuaadb')
  .then(db => console.log('MongoDB conectado'))
  .catch(err => console.log(err));


// imprtar Rutas
const indexRoutes = require('./routes/index');

// configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
// rutas
app.use('/', indexRoutes);


app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});


//GRAPHQL



var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);
// Root resolver
var root = {
    message: () => 'Hello World!'
};

// Create an express server and a GraphQL endpoint
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
