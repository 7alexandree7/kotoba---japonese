import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alexandre_db_user:SUA_SENHA@cluster0.kd7p5aa.mongodb.net/")
    .then(() => console.log("CONECTOU"))
    .catch(err => console.log("ERRO:", err));