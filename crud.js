const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

let currentID = 3

let users_tbl = {
  '1' : {username: 'vanetsyan', password: 'akhperjan', age: 40},
  '2' : {username: 'khachatryan', password: 'yngerjan', age: 50},
}

app.use((req, res, next) => {
  console.log('Request: ' + req.url + ' ' + new Date());
  next();
});

app.get('/users', (req, res) => {
  res.send(users_tbl);
})

 // read user
app.get('/users/:id', (req, res) => {
  
  if (users_tbl[req.params.id]) {
    return res.send(users_tbl[req.params.id]);
  }
  res.status(404).send('Not found');
} );

//create user
app.post('/users', (req,res) => {
    users_tbl[currentID++] = {
      username: req.body.username,
      age: req.body.age,
      password: req.body.password
    };
    res.send('success');
});

//update user
app.put('/users/:id',(req,res) => {
  if (users_tbl[req.params.id]) {
    users_tbl[req.params.id] = {
      username: req.body.username,
      age: req.body.age,
      password: req.body.password
    }
    return res.send('success');
  }
  res.status(404).send('Not found');
});

//delete user
app.delete('/users/:id',(req,res) => {
  if (users_tbl[req.params.id]) {
    delete users_tbl[req.params.id].username,
    delete users_tbl[req.params.id].password,
    delete users_tbl[req.params.id].age,
     res.send('success');
  };
  res.status(404).send('Not found');
})


app.listen(3003, () => console.log('Micagram listening on port 3003'));
