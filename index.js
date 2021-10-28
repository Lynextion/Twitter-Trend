const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs");
const { getSystemErrorName } = require("util");
const { Console } = require("console");

const hashtag ="%23";
const country = "turkey"; 
const url1 = "https://getdaytrends.com/tr/"+ country +"/";
const url2 = "https://getdaytrends.com";

//collect all trend

async function getTrends() {
//<td class="details small text-muted text-right">99.5K tweetler</td>
    try{
        const {data} = await axios.get(url);
        
        const $ = cheerio.load(data);
        const tbody = $(".card-body div");
        console.log(pretty($("h1").text()));
        var trends = [];
       
        //check if trend is active
        if( $("h1").text().includes("Twitter Trendleri")){
            const trs = tbody.find("tr");   
            const title = trs.find("td");
              
            
            title.each((idx,el) => {
                const name ={Trend: {
                    country:country,
                    name:"",
                    url:"",
                },
            }   
           
                if($(el).children("a").text() !== ""){

                name.Trend.name = $(el).children("a").text();
                
                if($(el).children("a").attr("href") !== undefined){
                    name.Trend.url= $(el).children("a").attr("href");
                }
                
                trends.push(name);
                
            }
        
         });   
        }
        trends = await {...trends};
           
          //write to file
        fs.writeFile("trends.json", JSON.stringify(trends, null, 2), (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Successfully written data to file");
          });
          return trends;
    }   

    catch(err){
        console.log(err);
    }

    
}

//collect trend data
async function getTrendInfo(name,url){

    try{
        let rawdata = fs.readFileSync("./trends.json")
        let trends = JSON.parse(rawdata);
        const keys = Object.keys(trends);
        let trend = {}
        

        keys.forEach(key => {
            if(trends[key].Trend.name === name){
                trend = {... trends[key].Trend}
                
            }
        });
        
        const {data} = await axios.get( url + trend.url);
        const $ = cheerio.load(data);

        const numOfTweet = $(".desc div").html();

        trend.numOfTweet = numOfTweet;

        console.log(trend);
    }
    catch(err){
        console.log(err);
    }
}

getTrendInfo("Efendiler",url2);


exports.getTrends = getTrends;