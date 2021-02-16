/*
 Authors: Cyrus Chan, Bryan Rainbow
 Your name and student #: Cyrus Chan, A01242596
 Your Partner's Name and student #: Bryan Rainbow, A00768125
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index", {movieList: ["Inception",
      "Spiderman", "The Dark Knight", "Tenet"]}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  const userMovies = req.body.submission.split(","); // Split by the comma
  //console.log(userMovies);

  res.render("pages/index", {movieList: userMovies});
});

app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
  res.render("pages/index", {movieList: [movie1, movie2]});
});

app.get("/search/:movieName", (req, res) => {
  let results = fs.readFileSync("movieDescriptions.txt", "utf-8");
  results = results.split("\n");
  let searchArray = []
  let movieName = req.params.movieName;
  let finalOutput = [];
  
  // Populate the array to search through...
  for (let i = 0; i < results.length; i++){
    searchArray.push(results[i].split(':'));
  }
  
  // Search the array for a match...
  let found = false;
  for (let i = 0; i < searchArray.length; i++){
    if (movieName.toLowerCase() == searchArray[i][0].toLowerCase()) {
      finalOutput.push(searchArray[i][0]);
      finalOutput.push(searchArray[i][1]);
      found = true;
      break;
    } 
  }
  
  if (found == false) {
    
    finalOutput.push("Oops");
    finalOutput.push("Movie could not be found");
    
   }
  res.render("pages/searchResult", {searchResults: finalOutput});
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});