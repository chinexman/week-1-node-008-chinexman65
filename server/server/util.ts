//const fs = require('fs');
const fs = require ('fs');
import {IncomingMessage} from "http"

export interface companysObject{
    [name:string]: string|number|string[];
}

export function writeDataToFile(filename:string,content:companysObject[]){
    console.log("it is trying to write to the json");
    console.log(filename);
    console.log(content);
fs.writeFileSync(filename, JSON.stringify(content, null, " ") );
console.log("done with it")
}

export function getPostData(req:IncomingMessage):Promise<string>{
    return new Promise((resolve,reject)=>{
        try{

            let body = '';
            req.on('data',(chunk)=>{
                body +=chunk.toString();
            })

            req.on('end',()=>{
                resolve(body);
            })
        }catch(error){
            reject(error);
        }
    })
}

