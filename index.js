const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv");
const sequelize = require("./db/db.js");
const initModels = require("./models/init-models.js");
var models = initModels(sequelize);

dotenv.config();

const app = express();

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/getData", async (req, res) => {
  return res.json(await models.user.findAll());
});

app.get("/addData", async (req, res) => {
  const status = await models.user.create({
    name: req.query.name,
    email: req.query.email,
    mobile: req.query.mobile,
  });
  res.json(status);
});

app.get("/getDataById", async (req, res) => {
  return res.json(
    await models.user.findAll({
      where: {
        id: req.query.id,
      },
    })
  );
});

app.get("/updateDataById", async (req, res) => {
  const id = req.query.id;
  const data = await models.user.update(
    {
      email: req.query.email,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return res.json(data);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on : http://localhost:${port}`);
});
