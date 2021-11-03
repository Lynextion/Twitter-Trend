const express = require('express');
const trend = require('./index')

const app = express();
const port = '3000';

app.use(express.json());
app.listen(port ,() => console.log(`Listening on port ${port}`));



app.get('/trend/:country', async (req, res) => {
    const {country} = req.params;
    const {data} = await trend.getTrends(country).then(data => res.json(data));
    console.log(data);
    
});

app.get('/getinfo/:country/:trendName', async (req, res) =>{
    try{
        const trendName = req.params.trendName
        const country = req.params.country
        console.log(country)
        const {data} = await trend.getTrendInfo(country,trendName).then(data => res.json(data));
    }catch(err){
        res.json("Trend not found!!");
        console.log(req.params)
       
    }

});

app.get('/show-countries', async (req,res) => {
   const {data} = await trend.showCountries().then(data => res.json(data));
    
});