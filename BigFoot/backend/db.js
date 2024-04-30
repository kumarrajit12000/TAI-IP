

// creating the Database
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'; 
MongoClient.connect(url).then((client) => {
  console.log('Database created');
  const db = client.db("bigFoot"); 
  db.createCollection('user');
});


