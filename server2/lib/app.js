"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
/*
implement your server code here
*/
const got = require('got');
const cheerio = require('cheerio');
const server = http_1.default.createServer((req, res) => {
    if (req.method === "POST") {
        getWebsitedata(req, res);
    }
    else {
        res.end('Url not scrapable!!');
    }
});
server.listen(5001, () => {
    console.log("server is running");
});
async function getWebsitedata(req, res) {
    try {
        let url = await getUrlDetails(req);
        url = JSON.parse(url);
        let bodyPage = await got(url);
        //console.log("pagebody" +  bodyPage)
        let body = bodyPage.body;
        const $ = cheerio.load(body);
        let images = [];
        const img = $('img').each(function (idx, li) {
            let image = $(li).attr('src');
            images.push(image);
        });
        const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || null;
        const title = $('meta[property="og:title"]').attr('content') || $('meta[name="title"]').attr('content') || $('title').text() || null;
        console.log(" or:title" + $('meta[property="og:title"]').attr('content'));
        console.log("title" + $('title').text());
        const result = {
            Title: title,
            Description: description,
            images: [...images]
        };
        res.end(JSON.stringify(result, null, ' '));
    }
    catch {
        res.end("Url details is invalid");
    }
}
async function getUrlDetails(req) {
    let urlObject = '';
    return new Promise((resolve, reject) => {
        try {
            req.on('data', (chunks) => {
                urlObject += chunks;
            });
            req.on('end', () => {
                resolve(urlObject);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
