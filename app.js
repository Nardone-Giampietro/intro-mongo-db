const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const rootDir = path.dirname(require.main.filename);
const morgan = require('morgan');
const {urlencoded, json} = require('body-parser');
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true,
        minlength: 10
    }
});

const Note = mongoose.model("Note", noteSchema);

app.use(morgan("dev"));
app.use(urlencoded({extended: true}));
app.use(json());

app.get("/note-create", async (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'index.html'));
})

app.post("/note-create", async (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const newNote = {
        title: title,
        body: body,
    };
    const response = await Note.create(newNote);
    res.status(201).redirect("/note");
})

app.get("/note",async (req, res, next) => {
    const notes = await Note.find({})
        .lean()
        .exec();
    res.status(200).json(notes);
});

const uri = "mongodb://localhost:27017/test";

const connection = () => {
    return mongoose.connect(uri, { useNewUrlParser: true });
};

connection()
    .then( async connection =>{
        await Note.create([
            {
                title: "Prima nota",
                body: "Questa è la prima nota"
            },
            {
                title: "Seconda nota",
                body: "Questa è la seconda nota"
            }]);
        app.listen(3000);
    })
    .catch(error =>{
        console.log(error);
    });