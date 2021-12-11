import http, { IncomingMessage, Server, ServerResponse } from "http";
const {getCompanys ,getCompany,createCompany,updateCompany,deleteCompany} = require('./companyController');

/*
implement your server code here
*/

//console.log(products);

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
 let data = req.url as string
  if(data === '/api/companys' && req.method==='GET'){
    getCompanys(req,res);
  }else if(data.match(/\/api\/companys\/([0-9]+)/) && req.method === 'GET'){
  
     // console.log(data.match());
      const id = +(data.split('/')[3]);
      console.log("server " + id);
   getCompany(req,res,id);
  }else if(req.url === '/api/companys' && req.method === 'POST'){
   
   createCompany(req,res);
  }else if(data.match(/\/api\/companys\/([0-9]+)/) && req.method === 'PUT'){

      const id = +(data.split('/')[3]);
      console.log(id);
      updateCompany(req,res,id);
  }else if(data.match(/\/api\/companys\/([0-9]+)/) && req.method === 'DELETE'){

      const id = +(data.split('/')[3]);
      console.log(id);
      deleteCompany(req,res,id);
  }else{
      res.writeHead(404,{"content-type":"application/json"});

      res.end(JSON.stringify({message :"Route not Found"}));
  }
  
}
);

server.listen(5005, ()=>{
  console.log("server is running")
});


