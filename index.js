const express = require('express');
const app = express();
const port = 3000;

//Associations
//User.hasMany(Post);
//Post.belongsTo(User);

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

