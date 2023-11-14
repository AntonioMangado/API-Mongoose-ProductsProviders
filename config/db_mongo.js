require("dotenv").config()
const mongoose = require('mongoose')

const url = process.env.MONGO_CLOUD_LINK;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


module.exports = mongoose;

// mongodb+srv://antoniomangado:YT%40123456@dbproviders.wdtx7f9.mongodb.net/