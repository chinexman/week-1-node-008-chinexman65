//const Product = require('./productsModel');
//import Product  from "./productsModel";
import  { IncomingMessage,  ServerResponse } from 'http';
import { findAll ,findById ,create,update,remove} from './companyModel';
import { companysObject } from './util';
const {getPostData} = require('./util');


//const { getPostData} = require('./util');


//@desc Gets All Product
//@route GET /api/products
export async function getCompanys(req: IncomingMessage, res: ServerResponse){
    try{

        const companys = await findAll();
        res.writeHead(200,{"content-type":"application/json"});
        res.end(JSON.stringify(companys));
    }catch(error){
        console.log(error);
    }
}


//@desc Gets Single Product
//@route GET /api/products/:id
export async function getCompany(req: IncomingMessage, res: ServerResponse, id:number){
    try{

        const company = await findById(id);
        //console.log(" productController " + product);
        if(!company){
            res.writeHead(404,{"content-type":"application/json"});

            res.end(JSON.stringify({message :"Product not Found"}));
        }else{
            res.writeHead(200,{"content-type":"application/json"});
            res.end(JSON.stringify(company));  
        }
        
    }catch(error){
        console.log(error);
    }

}


//@desc create a Product
//@route POST /api/products
 async function createCompany(req: IncomingMessage, res: ServerResponse){
    try{

  const body = await getPostData(req)
  
   const {organization, products, marketValue,address,ceo,country,noOfEmployees,employees} = JSON.parse(body);

    const company:companysObject = {
        organization,
        createdAt: new Date().toISOString(),
        updatedAt : new Date().toISOString(),
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees,


    }

    const newCompany = await create(company);
   res.writeHead(201,{'Content-Type':'application/json'});
   return res.end(JSON.stringify(newCompany));

   

    }catch(error){
        console.log(error);
    }
}




//@desc update a Product
//@route PUT /api/products:id
 async function updateCompany(req: IncomingMessage, res: ServerResponse, id:number){
    try{

        const company:any = await findById(id)
  
    if(!company){
        res.writeHead(404,{"content-type":"application/json"});

            res.end(JSON.stringify({message :"Product not Found"}));
    }else{
        const body = await getPostData(req)
  
        const { organization, products, marketValue,address,ceo,country,noOfEmployees,employees} = JSON.parse(body);
     
         const companyData = {
            organization:organization || company.organization,
            createdAt: company.createdAt,
            updatedAt : new Date().toISOString(),
            products: products || company.products,
            marketValue: marketValue || company.marketValue,
            address:address || company.address,
            ceo : ceo || company.ceo,
            country : country || company.country,
            noOfEmployees :noOfEmployees || company.noOfEmployees,
            employees:employees || company.employees,
           
         }
     
         const updCompany = await update(id ,companyData);
        res.writeHead(200,{'Content-Type':'application/json'});
        return res.end(JSON.stringify(updCompany));
     
    }

  
   

    }catch(error){
        console.log(error);
    }

}
    //@desc remove a Product
//@route DELETE /api/products:id
 async function deleteCompany(req: IncomingMessage, res: ServerResponse, id:number){
    try{

        const company = await findById(id)
  
    if(!company){
        res.writeHead(404,{"content-type":"application/json"});

            res.end(JSON.stringify({message :"Product not Found"}));
    }else{
        
        await remove(id);
        res.writeHead(200,{'Content-Type':'application/json'});
        return res.end(JSON.stringify({message: `Product ${id} removed`}));
     
    }

  
   

    }catch(error){
        console.log(error);
    }
}


module.exports = {
    getCompanys,
    createCompany,
    getCompany,
    updateCompany,
    deleteCompany
}