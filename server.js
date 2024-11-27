const express = require('express');

const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const PORT = 3000;



mongoose.connect('mongodb://db:27017/ordersDB', {

  useNewUrlParser: true,

  useUnifiedTopology: true,

}).then(() => {

  console.log('Connected to MongoDB');

}).catch(err => console.error('MongoDB connection error:', err));



const orderSchema = new mongoose.Schema({

  item: String,

  quantity: Number,

  status: String,

});



const Order = mongoose.model('Order', orderSchema);



app.get('/', (req, res) => res.send('Welcome to the FastDeliver Order Management System!'));



app.post('/orders', async (req, res) => {

  const newOrder = new Order(req.body);

  await newOrder.save();

  res.send('Order created successfully');

});



app.get('/orders', async (req, res) => {

  const orders = await Order.find();

  res.json(orders);

});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

