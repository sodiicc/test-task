const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const API_PORT = 9000;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const uri =
  "mongodb+srv://sodiicc:trader32@cluster0-rsnt4.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  console.log(err);
  // const collection = client.db("dots").collection("notes");
  app.winners = client.db("dots").collection("winners");
  app.settings = client.db("dots").collection("game-settings");
});

app.use(express.static(__dirname + "/static"));

app.set("view engine", "ejs");

// Стартова сторінка загрузка всіх карток

app.get("/settings", async (req, res) => {
  let settings = await app.settings.findOne({});
  res.send(JSON.stringify(settings));
});

app.get("/winners", async (req, res) => {
  let winners =[]
   await app.winners.find().forEach((el) => {
    winners.push(el)   
  });;
  res.send(JSON.stringify(winners));
});

app.post('/add_winner', async (req, res)=>{
  console.log(req.body)
  
  try{
   await app.winners.insertOne({
      ...req.body
    })

  }catch(err){    
    console.log(err)
  }
})



app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));
