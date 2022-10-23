const cheerio = require("cheerio")
const axios = require("axios")
const j2csv = require("json2csv").Parser 
const fs = require("fs")

const baseUrl2 = "https://books.toscrape.com/catalogue/category/books/sequential-art_5/"
const books_data = []

// to parameter to tricky pagination 
async function getBooks(url, url2) {
    try {
        const respone = await axios.get(url)
        const $ = cheerio.load(respone.data)

        const books = $("article")
        books.each(function () {
            title = $(this).find("h3").text()
            price = $(this).find(".price_color").text()
            stock = $(this).find(".availability").text().trim()

            books_data.push({ title, price, stock })
        })

        if ($(".next a").length > 0) {
            next_page = url2 + $(".next a").attr("href")
            getBooks(next_page, url2)
        } else {
            const parser = new j2csv()
            const csv = parser.parse(books_data)
            fs.writeFileSync("./listBooks.csv", csv)
        }
        console.log(books_data)


    } catch (error) {
        console.error("404 Error Bad Request")
        console.error(error)
    }
}

getBooks(baseUrl2, baseUrl2)