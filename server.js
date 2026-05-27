const express = require("express");
const app = express();

app.use(express.json());

let balance = 100;

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/balance", (req, res) => {
  res.json({ balance });
});

app.post("/trade", (req, res) => {
  const { type, lot } = req.body;

  if (!type || !lot) {
    return res.status(400).json({ error: "Missing type or lot" });
  }

  const win = Math.random() > 0.5;

  balance += win ? 1 : -1;

  res.json({
    type,
    lot,
    result: win ? "WIN" : "LOSS",
    balance
  });
});
// LOGIN ROUTE
app.post("/login", (req,res)=>{

const {broker, accountId, password} = req.body;

if(!broker || !accountId || !password){
return res.status(400).json({
error:"Missing login details"
});
}

res.json({
status:"connected",
broker,
accountId
});

});
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Running on port " + PORT));
