const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./db/db.js');
const initModels = require("./models/init-models.js");
var models = initModels(sequelize);

dotenv.config()

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/palak', async (req, res) => {
  /*
  const status = await models.user.create({
    "name": req.query.name,
    "email": req.query.email,
    "mobile": req.query.mobile
  })
  res.json(status)
  */
 res.json(await models.user.findAll())
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on : http://localhost:${port}`)
})