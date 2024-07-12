const mongoose = require("mongoose");

const uri =
  "mongodb+srv://<username>:<password>@cluster0.zzsakpf.mongodb.net/<dbName>?retryWrites=true&w=majority&appName=Cluster0";

let dbURL = uri;
dbURL = dbURL.replace("<username>", process.env.DB_USERNAME);
dbURL = dbURL.replace("<password>", process.env.DB_PASSWORD);
dbURL = dbURL.replace("<dbName>", process.env.DB_NAME);

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => {
    console.log(".....Database connected.....");
  })
  .catch((err) => {
    console.log("Connection Failed\n");
    console.log(err);
  });
