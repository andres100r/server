const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const schema = buildSchema(`
  type Query {
    message: String
  }
  
  `);
const root = {
  message: () => "hello mundo"
}





// conexion a mongoDB
mongoose.connect('mongodb://localhost/arquitecrutadb')
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
app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));


app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
