const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/index.routes');

const app = express();


//db connection
const password = 'jeremiasa'
const dbname='controlventasusuarios'
const uri = `mongodb+srv://jeremiasa:${password}@cluster0.hxpmt.mongodb.net/${dbname}?retryWrites=true&w=majority`
mongoose.connect(uri    , {useNewUrlParser: true,useUnifiedTopology:true})
    .then(console.log('Conexion a la base de datos OK'))
    .catch(err => console.log(`Conexion a la base de datos ERROR: ${err}`))

// config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use(routes)

//listen

app.listen(app.get('port'), ()=>{
    console.log(`Esperando conexiones en el puerto ${app.get('port')}`);
})
