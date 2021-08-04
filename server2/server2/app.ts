


import http, { IncomingMessage, Server, ServerResponse } from "http";
/*
implement your server code here
*/
const got  = require('got');
const cheerio = require('cheerio')
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "POST") {
      getWebsitedata(req,res)
    }else{
      res.end ('Url not scrapable!!')
    }
  }
);
server.listen(3001, ()=>{
  console.log("server is running");
});

async function getWebsitedata(req: IncomingMessage, res: ServerResponse){
  try{
  let url = await getUrlDetails(req) as string
  url = JSON.parse(url)
  
  let bodyPage = await got(url)
  //console.log("pagebody" +  bodyPage)
  let body = bodyPage.body
  const $ =cheerio.load(body)
  let images:string[] = []
  const img = $('img').each(function(idx:string, li:string) {
    let image=  $(li).attr('src'); 
    images.push(image)
    
});
  const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content')  || null    
  const title= $('meta[property="og:title"]').attr('content') || $('meta[name="title"]').attr('content') || $('title').text() || null
      const result = {
          Title: title,
          Description: description,
          images: [...images]
      }
      res.end(JSON.stringify(result, null , ' '));
    }catch{
      res.end("Url details is invalid")
    }
}


async function getUrlDetails(req:IncomingMessage) {
  let urlObject =''
  
  return new Promise ((resolve,reject)=>{
      try{
          req.on('data', (chunks)=>{
              urlObject +=chunks
          })
          req.on('end', ()=>{
              resolve(urlObject)
          })
      }catch(error){
          reject(error)
      }
  })
}