
const express = require('express');
const ejs = require("ejs");
const server = express();

server.use(express.static("public"));
server.set("view engine","ejs");
server.use(express.urlencoded({ extended: true }));



let url_list = {
}


function random_string(){
    let rs = Math.floor(Math.random()*1000)
    return rs;
}

server.get('/',(req,res)=>{
    res.render("home");
})

server.post('/shortner',(req,res)=>{
   
    const id = random_string();
    url_list[id] = req.body.url;
    originalurl=url_list[id]
    res.render("shortner",{id,originalurl});
})

server.get("/:id",(req,res)=>{

    console.log("id_recieved",req.params.id);
    const id = req.params.id;

    if(url_list[id]){
        console.log(url_list[id])
        return res.redirect(url_list[id])
        
    }
    else{
        res.send("shorten url notfound...........")
    }

})




server.listen('9000',()=>{
    console.log("server is running on port 9000");
})