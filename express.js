const express = require('express');
const trend = require('./index')

const app = express();
const port = '3000';

app.use(express.json());
app.listen(port ,() => console.log(`Listening on port ${port}`));



app.get('/', async (req, res) => {
    
    const {data} = await trend.getTrends().then(data => res.json(data));
    console.log(data);
    
});

app.post('/getinfo/:trendName', async (req, res) =>{
    try{
        const {trendName} = req.params
        const {data} = await trend.getTrendInfo(trendName).then(data => res.json(data));
    }catch(err){
        res.json("Trend not found!!");
    }

});