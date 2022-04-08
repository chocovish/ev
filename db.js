const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://root:passpass@cluster0.ccqet.mongodb.net/ev?retryWrites=true&w=majority';
const client = new MongoClient(url);

module.exports = {client}