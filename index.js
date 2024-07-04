const express=require("express");
var methodOverride = require("method-override");

const app = express();
const port = 8080;
const path = require("path");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extends: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const { v4: uuidv4 } = require('uuid'); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

let posts = [
    {
        id: uuidv4(),
        name: "Arduino",
        content: "Arduino is a microcontroller with different versions like NANO, UNO, MEGA"
    },
    {
        id: uuidv4(),
        name: "ESP32",
        content: "ESP32 is a microcontroller with different versions like DIV MODULE, WROOM MODULE, WROVER MODULE"
    },
    {
        id: uuidv4(),
        name: "STM32",
        content: "STM32 is a microcontroller with different versions like BLUE PILL, WHITE VERSION"
    } 
]



app.listen(port, ()=>{
    console.log(`I am listening to port ${port}`);
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let {name,content} = req.body;
    let id = uuidv4();
    posts.push({id,name,content});
    // res.send("Post request working");
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    // res.send("request working");
    let post = posts.find((p)=>id === p.id);// returns p automatically
    console.log(post);
    res.render("view.ejs",{ post });
});
app.get("/posts/:id/update",(req,res)=>{
    let {id} = req.params;
    console.log("id",id);
    let post = posts.find((p)=> id === p.id);
    res.render("update.ejs",{ post });
});
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log("id",id);
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log("id",id);
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
}); 
