const express = require('express');
const bodyParser = require('body-parser');
const ctr = require('./controllers')
const massive = require('massive');

require('dotenv').config();

const app = express();
app.use( bodyParser.json() );


massive( process.env.CONNECTION_STRING ).then( dbInstance => app.set('db', dbInstance) );
const port = 3003;
app.listen( port, () => { console.log(`I'm listening... on Port: port.`); } );