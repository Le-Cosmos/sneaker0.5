const Express = require("express");
const SneakApi = require("sneaks-api");
const Maths = require("mathjs");
const sneakers = new SneakApi;
const app = Express();
const mongoose = require("mongoose");

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const URL = "mongodb://127.0.0.1:27017/Sneakdb";

mongoose.connect(URL, {useNewUrlParser: true});
app.use(Express.json());
const userSchema = new mongoose.Schema({
      fName: String,
      lName: String,
      mail: String,
      fav:[String]
})

const User = mongoose.model("User", userSchema)
var bigData = [];
var dat;
var d = [];
const count = 100; // if the user doesn't provide the query param, it defaults to 40
sneakers.getProducts("", count, async function(error, products){
    try {
      const b = await products;
      bigData = [...b];
    }
    catch (error) {
        console.log(error)
    }
    finally{
      console.log("End of Data");
    }
    }
);

const getNext =  async (res) => {
  var j = 0;
  var k = 0;
  var help = [];
  for(let i = 0; i < 30; i ++){
    let newD = new Date();
    newD.setDate(newD.getDate() + i + 1);
    var jour = newD.getDate();
    if(Number(jour)<10){
      jour = "0" + jour;
    }
    var month = newD.getMonth();
    if(Number(month)<10){
      month = "0" + month;
    }
    const year = newD.getFullYear();
    const she = (year+ "-" +month+"-"+ jour);
    await sneakers.getProducts(she, 5, async function(error, products){
      try{
        const c = await products;
        if (c){
        res[j] = c;
        j ++;
      }
      }
      catch(err){
        console.log(err);
      }
      });
  }


}
getNext(d);


app.get('/api/b', (req, res) => {
    res.json(bigData);
    if(bigData){
    console.log(bigData.length)}
});

app.get('/api/home', function(req, res){
    const count = req.query.count || 100; // if the user doesn't provide the query param, it defaults to 40
    sneakers.getMostPopular(count, async function(error, products){
        if (error) {
            console.log(error)
            res.json({});
          } else {
            res.json(products);
          }
    })
});

app.get('/api/search/:shoe', function(req, res){
    const count = req.query.count || 10; // if the user doesn't provide the query param, it defaults to 40
    sneakers.getProducts(req.params.shoe, count, function(error, products){
       try{
         res.json(products);
       }
       catch (error){
         console.log(error);
       }
    });
});

app.get('/api/nextDays', function(req, res){
    for(let i = 0; i < 30; i++){
      let newD = new Date();
      newD.setDate(newD.getDate() + i + 1);
      var jour = newD.getDate();
      if(Number(jour)<10){
        jour = "0" + jour;
      }
      var month = newD.getMonth();
      if(Number(month)<10){
        month = "0" + month;
      }
      const year = newD.getFullYear();
      const she = (year+ "-" +month+"-"+ jour);
      for(let j = 0; j < d[i].length; j++){
        if(d[i][j].releaseDate !)
      }

    }
    res.json(d);
});

app.get('/api/searchByDate/:date', function(req, res){
  const count = req.query.count || 20; // if the user doesn't provide the query param, it defaults to 40
  console.log(req.params);
  sneakers.getProducts(req.params.date, count, function(error, products){
      if (error) {
          console.log(error);
        } else {
          const data = products.filter((shoe) => shoe.releaseDate == req.params.date);
          res.json(data);
        }
  });
});


app.get('/api/searchByName/:name', function(req, res){
  const count = req.query.count || 5 // if the user doesn't provide the query param, it defaults to 40
  console.log(req.params);
  sneakers.getProducts(req.params.name, count, function(error, products){
      if (error) {
          console.log(error)
          res.send({});
          return;
        } else {
          const data = products.filter( (shoe) => shoe.shoeName == req.params.name);
          res.json(data);
        }
  });
});

app.get("/api/classement", function(req, res){
  var bestDeal = [];
  var j = 0;
  for(index = 0; index < bigData.length; index ++){
    let stXPrice = bigData[index].lowestResellPrice.stockX;
    let flCPrice = bigData[index].lowestResellPrice.flightClub;
    let gotPrice = bigData[index].lowestResellPrice.goat;
    var arrayPrice = [stXPrice, flCPrice, gotPrice];
    for ( let i =0; i <3; i++){
      if (typeof arrayPrice[i] === "undefined"){
        arrayPrice.splice(i, 1, 0);
      }
    }
    var diffPrice = Maths.min(arrayPrice) - (bigData[index].retailPrice);
    if (j > 3){
      for(let i = 1; i < bestDeal.length; i = i + 2){
        if(diffPrice > bestDeal[i]){
            bestDeal.splice(i - 1, 0, bigData[index].shoeName);
            bestDeal.splice(i, 0, diffPrice);
            break;
        }
      }
      if(bestDeal.length == j){
        bestDeal.splice(j - 1, 0, bigData[index].shoeName);
        bestDeal.splice(j, 0, diffPrice);
      }
    } else if (j === 2) {
      if (bestDeal[j - 1] < diffPrice) {
        bestDeal.splice( 0, 0, bigData[index].shoeName);
        bestDeal.splice( 1, 0, diffPrice);
      } else {
        bestDeal.splice( 2, 0, bigData[index].shoeName);
        bestDeal.splice( 3, 0, diffPrice);
      }
    }
      else if (j === 0) {
        bestDeal.splice(0, 1, bigData[index].shoeName);
        bestDeal.splice(1, 1, diffPrice);
    }
    j = j + 2;
  }
  res.json(bestDeal);
});

app.post("/api/addFav",async function(req, res){
  const id = req.params.id;
  const shoeName = req.params.name;
  await User.findById(id).fav.push(shoeName);
});

app.get("/api/:user",async function(req, res){
  const id = req.params.id;
  res.json(await User.findById(id));
});

app.post("/api/register", function(req, res){
  const fName = req.params.fName;
  const lName = req.params.lName;
  const email = req.params.mail;
  if(fName && lName && email){
    const user = new User ({
      fName:fName,
      lName:lName,
      mail:email
    });
    user.save();
  }
  });

app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
