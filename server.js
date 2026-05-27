const express = require("express");
const app = express();

app.use(express.json());

let account = {
    balance: 100,
    trades: []
};

// Home
app.get("/", (req,res)=>{
    res.send("Venom trading engine online");
});

// Balance
app.get("/balance",(req,res)=>{
    res.json(account);
});

// Trade
app.post("/trade",(req,res)=>{

    const {type, lot} = req.body;

    if(!type || !lot){
        return res.status(400).json({
            error:"Missing fields"
        });
    }

    let trade = {
        id: Date.now(),
        type,
        lot,
        result:"RUNNING"
    };

    account.trades.push(trade);

    setTimeout(()=>{

        const win = Math.random() > 0.5;

        trade.result = win ? "WIN" : "LOSS";

        account.balance += win ? 1 : -1;

    },5000);

    res.json({
        message:"Trade opened",
        trade
    });

});

const PORT = process.env.PORT || 10000;

app.listen(PORT,()=>{
console.log("Venom engine running");
});
