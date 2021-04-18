require("dotenv").config();

const express = require("express");
const landmarkRouter = require("./routes/landmark-router");
const userRouter = require("./routes/user-router");
const { User, Landmark, Visit, Rating } = require("./data-access/models");
const db = require("./data-access/models");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Exprore IT Backend!");
});

app.get("/system/db/drop", async (req, res) => {
  await db.sequelize.drop();
  res.send("Db was dropped!");
});

app.get("/system/reboot", (req, res) => {
  process.exit();
});

app.get("/ping", (req, res) => {
  res.json({ text: "pong21" });
});
app.use("/landmarks", landmarkRouter);
app.use("/users", userRouter);

User.hasMany(Visit);
Visit.belongsTo(User);

Landmark.hasMany(Visit);
Visit.belongsTo(Landmark);

User.hasMany(Rating);
Rating.belongsTo(User);

Landmark.hasMany(Rating);
Rating.belongsTo(Landmark);


db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
  });
});
