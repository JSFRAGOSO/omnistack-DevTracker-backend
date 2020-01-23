const express = require ('express');
const mongoose = require('mongoose');
const routes = require('./routes')
const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0-ac3fq.mongodb.net/test?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
)
mongoose.set('useCreateIndex', true);

app.use(express.json());
app.use(routes);


app.listen(3333);