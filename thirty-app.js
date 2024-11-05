const express=require("express")

const app=express();

app.get("/",(req,res)=>{

    res.status(200) .json({message:"Hello Allien",status:200})
})

const PORT=3000;

app.listen(PORT,"127.0.0.1",()=>{console.log(`Server is running on PORT : ${PORT}`)
})