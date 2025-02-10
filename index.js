const express = require('express');
require('dotenv').config();
const { resolve } = require('path');
const mongoose= require('mongoose');
const MenuItem= require('./schema.js');

const app = express();

const port = 3010;

app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));


  
  
  app.put('/menu/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
      const updatedItem = await MenuItem.findByIdAndUpdate(
        id, { name, description, price }, 
        { new: true, runValidators: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found.' });
      }
      res.status(200).json({ message: 'Item has been updated successfully.', item: updatedItem });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the menu item.' });
    }
  });
  
  app.delete('/menu/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedItem = await MenuItem.findByIdAndDelete(id);
      if (!deletedItem) {
        return res.status(404).json({ error: 'Menu item not found.' });
      }
      res.status(200).json({ message: 'Menu item deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete menu item.' });
    }
  });
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});