const mongoose = require('mongoose')
// const DB = require('../common/dbConfig')
require('dotenv').config()

try{
    mongoose.connect(`${process.env.dburl}/${process.env.dbname}`)
}
catch(error){
    console.log(error)
}

module.exports = mongoose