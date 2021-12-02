const mysql = require('mysql');
var DbConnectConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: 'Voice-To-Text_Remainder'
  }
  
var con = mysql.createConnection(DbConnectConfig);
  con.connect(function (error) {
    if (error) {
        console.log("connection failed")
    }
    else {
        console.log("connection successfully")
  
    }
  });

  module.exports = con;