const express = require('express');
const trend = require('./index')

const app = express();


app.use(express.json());
app.listen(process.env.PORT || 5000, () => {console.log('Server is running')});



app.get('/', async (req,res) => {
    const {data} = await trend.getTrends(null).then(data => res.json(data));
    

});

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
        
       
    }

});

app.get('/show-countries', async (req,res) => {
   const {data} = await trend.showCountries().then(data => res.json(data));
    
});