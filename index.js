const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs");


const hashtag = "%23";
const url2 = "https://getdaytrends.com";

var countries = [
    "algeria",
    "argentina",
    "australia",
    "austria",
    "bahrain",
    "belarus",
    "belgium",
    "brazil",
    "canada",
    "chile",
    "colombia",
    "denmark",
    "dominican-republic",
    "ecuador",
    "egypt",
    "france",
    "germany",
    "ghana",
    "greece",
    "guatemala",
    "india",
    "indonesia",
    "ireland",
    "israel",
    "italy",
    "japan",
    "jordan",
    "kenya",
    "korea",
    "kuwait",
    "latvia",
    "lebanon",
    "malaysia",
    "mexico",
    "netherlands",
    "new-zealand",
    "nigeria",
    "norway",
    "oman",
    "pakistan",
    "panama",
    "peru",
    "philippines",
    "poland",
    "portugal",
    "puerto-rico",
    "qatar",
    "russia",
    "saudi-arabia",
    "singapore",
    "south-africa",
    "spain",
    "sweden",
    "switzerland",
    "thailand",
    "turkey",
    "ukraine",
    "united-arab-emirates",
    "united-kingdom",
    "united-states",
    "venezuela",
    "vietnam",

]

//collect all trend

async function showCountries() {

    countries = await [...countries];
    console.log(countries);
    return countries
}

async function getTrends(country, limit) {




    //<td class="details small text-muted text-right">99.5K tweetler</td>
    try {

        var url1 = "https://getdaytrends.com/tr/" + country + "/";

        if (country === null) {
            url1 = "https://getdaytrends.com/tr/";
            country = "worldwide";
        }

        const { data } = await axios.get(url1);

        const $ = cheerio.load(data);
        const tbody = $(".card-body div");
        console.log(pretty($("h1").text()));
        var trends = [];
        var rank = 1

        //check if trend is active
        if ($("h1").text().includes("Twitter Trendleri")) {
            const trs = tbody.find("tr");
            const title = trs.find("td");
            const num = tbody.find("th");



            title.each((idx, el) => {


                const name = {
                    Trend: {
                        country: country,
                        name: "",
                        url: "",
                        rank: 0,
                    },
                }
                console.log("index", limit);

                if ((rank <= limit && limit != 0) || limit == 0) {

                    if ($(el).children("a").text() !== "") {

                        name.Trend.name = $(el).children("a").text();


                        if ($(el).children("a").attr("href") !== undefined) {
                            name.Trend.url = $(el).children("a").attr("href");
                            name.Trend.rank = rank;
                            rank++;
                        }


                        trends.push(name);

                    }
                }

                name.timeStamp = Date.now();



            });
        }

        console.log(trends)
        var fileName = country + ".json";
        //write to file
        fs.writeFile(fileName, JSON.stringify(trends, null, 2), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Successfully written data to file");
        });
        trends = await { ...trends };

        return trends;
    }

    catch (err) {
        console.log(err);
    }


}


async function findTrend(country, wantTrend) {
    try {

        var url1 = "https://getdaytrends.com/tr/" + country + "/";

        if (country === null) {
            url1 = "https://getdaytrends.com/tr/";
            country = "worldwide";
        }

        var newTrends = [];

        const { data } = await axios.get(url1);

        const $ = cheerio.load(data);
        const tbody = $(".card-body div");
        console.log(pretty($("h1").text()));
        var trends = [];
        var rank = 1

        //check if trend is active
        if ($("h1").text().includes("Twitter Trendleri")) {
            const trs = tbody.find("tr");
            const title = trs.find("td");
            const num = tbody.find("th");

            //find trend

            console.log("index", wantTrend);


            title.each((idx, el) => {


                const name = {
                    Trend: {
                        country: country,
                        name: "",
                        url: "",
                        rank: 0,
                    },
                }


                if ($(el).children("a").text() !== "") {
                    name.Trend.name = $(el).children("a").text();

                    if ($(el).children("a").attr("href") !== undefined) {
                        name.Trend.url = $(el).children("a").attr("href");
                        name.Trend.rank = rank;
                        rank++;
                    }

                    trends.push(name);

                }

                name.timeStamp = Date.now();


            });
        }
        let info = wantTrend["Trends"];


        for (var keys in trends) {
            console.log(trends[keys].Trend.name);
            for (var key in info) {
                if (trends[keys].Trend.name === info[key]) {
                    newTrends.push(trends[keys]);
                }
            }
        }

        console.log(newTrends)
        var fileName = country + ".json";
        //write to file
        fs.writeFile(fileName, JSON.stringify(newTrends, null, 2), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Successfully written data to file");
        });
        newTrends = await { ...newTrends };

        return newTrends;
    }

    catch (err) {
        console.log(err);
    }

}


//collect trend data
async function getTrendInfo(country, name) {

    try {

        name = name.toLowerCase();
        country = country.toLowerCase()

        let rawdata = fs.readFileSync(country + ".json")
        let trends = JSON.parse(rawdata);
        const keys = Object.keys(trends);
        let trend = {}


        keys.forEach(key => {
            try {
                if (trends[key].Trend.name.toLowerCase().includes(name) && trends[key].Trend.country.toLowerCase().includes(country)) {
                    trend = { ...trends[key].Trend }


                }
                else {
                    //console.log("Trend not found");
                }
            }
            catch (err) {
                console.log(err);

            };
        });
        //  console.log(trend);

        const { data } = await axios.get(url2 + trend.url);
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
        trend = await { ...trend };

        return trend;
    }
    catch (err) {
        console.log(err);
    }
}

//getTrendInfo("üçkuruş");
//getTrends();
//showCountries();

exports.getTrends = getTrends;
exports.getTrendInfo = getTrendInfo;
exports.showCountries = showCountries;
exports.findTrend = findTrend;