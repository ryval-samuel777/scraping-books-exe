const cheerio = require("cheerio")
const axios = require("axios")

const url = "https://books.toscrape.com/catalogue/category/books/travel_2/index.html"


async function getGenre(){
    try {

        // http request get to url
        const respone = await axios.get(url)

        // respone load data from the web
        const $=cheerio.load(respone.data)

        // get the element from the web  
        const genre = $("h1").text()

        // show to us
        console.log(genre)

    } catch (error){
        console.error(error)
    }
}

// Run Function
getGenre()