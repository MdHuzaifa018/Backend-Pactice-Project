const express = require("express");
const app = express();
const methodOverride = require('method-override');
const path = require ("path");
const port = 8080;

const {v4: uuidv4} = require("uuid");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts = [// let is liye kiya taki data ko delete kar paye if i use const then i cannot delete data  
    {
        id : uuidv4(),
        username : "Apna college",
        content : "I love coding",
    },
    {
        id : uuidv4(),
        username : "Huzaif Sheikh",
        content : "Hard work is important to achieve success",
    },
    {
        id : uuidv4(),
        username : "Sohail",
        content : "I got selected for myfirst internship",
    }

]
 



//----------Route-------------//
app.get("/posts",(req,res)=>{ // app.get GET request ke liye & /posts ye RESTfull APIs hai isme noun use krte hai na ki verb
    
    res.render("index.ejs", {posts}); // req.render file send karne ke liye karte hai
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req,res)=>{ // app.post POST request ke liye  
    let { username , content} = req.body;// ye req body me save hota hai isliye req.body or is 
    let id = uuidv4();
    posts.push({id, username , content});
    // res.send("post request working")

    res.redirect("/posts");// ye redirect kar dega hamre array data ko posts route par
});

app.get("/posts/:id", (req,res)=>{ // app.post POST request ke liye  
    let {id}= req.params;
    // console.log(id);
    let post = posts.find((p)=> id === p.id);
    // console.log(post);
    // res.send("request working");
    res.render("show.ejs",{post});
})
 app.patch("/posts/:id", (req,res)=>{
    let {id}= req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id ===p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
 });
 app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p) => id === p.id) ;
    res.render("edit.ejs", {post});
 }); 

 app.delete("/posts/:id", (req,res) =>{
     let {id}= req.params;
    posts = posts.filter((p) => id !== p.id) ;
    res.redirect("/posts")
   
 })

app.listen(port,()=>{
    console.log("listening to port : 8080");
});