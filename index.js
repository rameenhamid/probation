const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/post-routes');

const { sequelize } = require('./models');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the defined routes
app.use('/users', userRoutes);
app.use('/', authRoutes);
app.use('/posts', postRoutes);

app.get('/', async (req, res) => {
  try {
    // Your logic for handling the initial route
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

const PORT = process.env.PORT || 3000;
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
