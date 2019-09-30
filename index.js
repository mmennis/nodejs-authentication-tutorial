const config = require('config');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users.route');
const express = require('express');
const app = express();
const morgan = require('morgan');

// Use config module to get the private key, if not present the teminate app
if (!config.get('myprivatekey')) {
    console.error('FATAL ERROR, Private key not defined for app');
    process.exit(1);
} else {
    console.log(config.get("myprivatekey"));
}

mongoose
    .connect(config.get("mongodbURI"), 
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true 
        }
    )
    .then(() => console.log('Connected to mongodb ...'))
    .catch((err) => console.error(`Unable to connect to mongodb: ${err}`));

app.use(express.json());
// use users route api/users
app.use('/api/users', usersRoute);
app.use(morgan('combined'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));