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
        const {data} = await axios.get(url1);
        
        const $ = cheerio.load(data);
        const tbody = $(".card-body div");
        console.log(pretty($("h1").text()));
        var trends = [];
        var rank = 1 
       
        //check if trend is active
        if( $("h1").text().includes("Twitter Trendleri")){
            const trs = tbody.find("tr");   
            const title = trs.find("td");
            const num = tbody.find("th");
            

            
            title.each((idx,el) => {
           
                const name ={Trend: {
                    country:country,
                    name:"",
                    url:"",
                    rank:0,
                },
                 }   

                if($(el).children("a").text() !== ""){

                name.Trend.name = $(el).children("a").text();

                
                if($(el).children("a").attr("href") !== undefined){
                    name.Trend.url= $(el).children("a").attr("href");
                    name.Trend.rank = rank;
                    rank++;
                }

                
                trends.push(name);
                
            }
        
         });   
        }
        trends = await {...trends};
        console.log(trends)
           
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
async function getTrendInfo(name){

    try{

        name = name.toLowerCase();

        let rawdata = fs.readFileSync("./trends.json")
        let trends = JSON.parse(rawdata);
        const keys = Object.keys(trends);
        let trend = {}
        

        keys.forEach(key => {
            try{
                if(trends[key].Trend.name.toLowerCase().includes(name)){
                    trend = {... trends[key].Trend}
                    
                
                 }
                 else{
                    //console.log("Trend not found");
                 }
                }
            catch(err){
                console.log(err);
                
            };
        });
      //  console.log(trend);

        const {data} = await axios.get( url2 + trend.url);
        const $ = cheerio.load(data);
       // console.log(pretty( $.html()));
        const numOfTweet = $(".desc div").html();

        var div = $(".row.stats.mb-3.mb-md-4.mt-3 div").html();
        const highestRank = $(div).first().html();

        const now = $(".row.stats.mb-3.mb-md-4.mt-3 div").parent().html();
        const now2 = $(now).find(".mb-1.value.primary span").html();
        console.log(now2);

        trend.numOfTweet = await numOfTweet;
        trend.highestRank = await highestRank;

        //console.log(trend);
        trend = await {...trend};

        return trend;
    }
    catch(err){
        console.log(err);
    }
}

//getTrendInfo("üçkuruş");
getTrends();

exports.getTrends = getTrends;
exports.getTrendInfo = getTrendInfo;