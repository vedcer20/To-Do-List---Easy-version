//new_item...name given to the new input in form (its NOT an array)
//item...it gets its value from new_item using req.body.new_item & its NOT an array
//new_list....array of all items entered in the list
//all_items...new_list array is passed into this array by res.render & item is pushed into it using .push function

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");//requiring this is a bit DIFFERENT from other modules ;since it is a local module we have created

const app = express();

app.set('view engine', 'ejs'); //must be BELOW the  const app = express(); line
app.use(bodyParser.urlencoded({extended:true})); //must be BELOW the  const app = express(); line
app.use(express.static("public")); // to use serve files  // folder name to store these static files is public

let all_items=[]; //length increases after a new element is added//created an array for all the items we typed in the form


app.get("/", function(req, res) {  //ON LOADING HOMEPAGE, THIS BLOCK OF CODE WORKS

  let day = date();//VVIMP*** we have written date() and NOT date ....because parenthesis means we are callingthe function(in date.js file) NOW*****
  res.render('list', { kindOfDay: day ,new_list:all_items}); //creating a response by rendering a file called LIST (with .ejs extension) in VIEWS folder, and passing variables called 'kindOfDay' and 'new_list' which have value = value of day variable and all_items array respectively.
                                                  //so kindOfDay is in this format: Saturday,September 17
});


app.post("/",function(req,res){  //ON PRESSING SUBMIT BUTTON, THIS BLOCK OF CODE WORKS
  let item =req.body.new_item; //storing the newly entered element (with NAME new_item in the list.ejs file)
  all_items.push(item);  //pushing the items in the array
  res.redirect("/");  //redirect to root route after adding item to array, ie redirected to the code above ie.(app.get)
})


app.listen(3000, function() {
  console.log("run 3000");
});
