const express = require("express");
const app = express();

app.use(express.json());

// state
let account = {
  balance: 100,
  trades: []
};

// HOME
app.get("/", (req, res) => {
  res.send("Venom trading engine online");
});

// BALANCE
app.get("/balance", (req, res) => {
  res.json(account);
});

// TRADE
app.post("/trade", (req, res) => {
  const { type, lot } = req.body;

  if (!type || !lot) {
    return res.status(400).json({ error: "Missing type or lot" });
  }

  const win = Math.random() > 0.5;

  const trade = {
    id: Date.now(),
    type,
    lot,
    result: win ? "WIN" : "LOSS"
  };

  account.trades.push(trade);
  account.balance += win ? 1 : -1;

  res.json({
    message: "Trade executed",
    trade,
    balance: account.balance
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const { broker, accountId, password } = req.body;

  if (!broker || !accountId || !password) {
    return res.status(400).json({ error: "Missing login details" });
  }

  res.json({
    status: "connected",
    broker,
    accountId
  });
});

// START
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Venom engine running on port " + PORT);
});
