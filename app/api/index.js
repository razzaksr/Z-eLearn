const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const parser = require('body-parser')
const users = require('./controllers/users-rest')

const api = express()
api.use(parser.urlencoded({extended:true}))
api.use(parser.json())
api.use('/user',users)

const uri = process.env.mongo_uri;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(uri,clientOptions)

api.listen(process.env.port,()=>{
    console.log(`backend running @ ${process.env.port} !!!!!!!!!!!!!!`)
})