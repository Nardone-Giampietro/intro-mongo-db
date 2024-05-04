const express = require('express');
const morgan = require('morgan');
const connect = require('../connect');
const {json, urlencoded} = require('body-parser');
const app = express();
const Todo = require('./todo');

app.use(morgan('dev'));
app.use(urlencoded({extended: true}));
app.use(json());

app.get('/todo/:id', async (req, res) => {
  const todoId = req.params.id;
  try{
      const match = await Todo.findById(todoId)
          .lean()
          .exec();
      res.status(200).json(match);
  }
  catch(err){
      res.status(500).json({error: err});
  }
});

app.get('/todos', async (req, res) => {
    try{
        const todos = await Todo.find({})
            .sort({ dueOn: -1 })
            .lean()
            .exec();
        res.status(200).json(todos);
    }
    catch{
        res.status(500).json({error: err});
    }
});

app.post('/todo', async (req, res) => {
  const todoToCreate = req.body;
  try{
      await Todo.create(todoToCreate);
      res.status(201).redirect(`/todos`);
  }
  catch (e) {
     res.status(500).json({error: e});
  }
});

connect("mongodb://localhost:27017/test")
  .then(() => app.listen(3000, () => {
    console.log('server on http://localhost:3000');
  }))
  .catch(e => console.error(e));
