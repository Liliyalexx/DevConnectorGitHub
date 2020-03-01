const express = require('express');
const app = express();
const mongoose = require('mongoose');

//DB config
const db = require('./config/keys').mongoURI

//connect to mongodb
mongoose.connect(db)
.then(() => console.log('MongoDb connected'))
.catch(err => console.log(err))


//let's write our first rout
app.get('/',(req,res) => res.send('Hello World'));
const port = 8020;
app.listen(port, () => console.log(`Server running on port ${port}`));
