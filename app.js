//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Thank Angela Yu for this amazing course. I have never felt so confident on my Computer Science skills as I do Now. The way you teach is just amazing and i have completed this module with just one hint, I know that, its just I am not sure. You are really good teacher. Looking forward to the coming Modules. Loads of LOVE❤❤❤";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res){
  res.render('home', {homeStartingContent: homeStartingContent, posts:posts});
});

app.get('/posts/:title', function(req, res){
  posts.forEach(function(post){
    var requestTitle = req.params.title;
    console.log(_.lowerCase(requestTitle),_.lowerCase(post.title));
    if (_.lowerCase(requestTitle) === _.lowerCase(post.title)){
      res.render('post', {title: post.title, data:post.data})
    } else{
      console.log('i am countitng');
    }
  })
});

app.get('/about', function(req, res){
  res.render('about', {aboutContent: aboutContent});
})

app.get('/contact', function(req, res){
  res.render('contact', {contactContent: contactContent});
})

app.get('/compose', function(req, res){
  res.render('compose');
})

app.post('/compose', function(req, res){
  const post = {
    title: req.body.postTitle,
    data: req.body.postData
  }
  posts.push(post);
  res.redirect('/');
});











app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
