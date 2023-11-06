const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user-routes');
const { sequelize, User } = require('./models'); // Import the User model
const authRoutes = require('./routes/authRoutes');


const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', 'views');

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use user routes
app.use('/users', userRoutes);

app.use('/', authRoutes);

app.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length > 0) {
      res.render('login');
    } else {
      res.redirect('/users/create');
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

sequelize.sync().then(() => {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});