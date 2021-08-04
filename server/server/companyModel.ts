//const products = require('/Users/decagon/Desktop/NodeAsign/week-5-node-008-chinexman/server/products.json');
 let companys = require('/Users/decagon/Desktop/NodeAsign/week-5-node-008-chinexman/server/server/company.json');
import { writeDataToFile,companysObject} from './util';

 



//const {writeDataToFile} = require('./util');
//import writeDataToFile from './util';

export function findAll(){

    return new Promise((resolve, reject)=>{
        resolve(companys);
    })
}

 export function findById(id:number){
      //let id1 =  +id
      //console.log(id1)
     return new Promise((resolve, reject) =>{
        //console.log("productModel " + id1);
     
        const company = companys.find((p:companysObject)=>{
           // console.log(" p.id" + typeof p.id);
          //  console.log(" id " + typeof id1);
            return p.id===id});
        //console.log(product)

        resolve(company)
       
        })
    }

function uuid(){
    let id;
    if(companys.length ===0){
        id =1
    }else{
        id =+(companys[companys.length-1].id)+1
    }
    return id
}

        export function create(company:companysObject):Promise<companysObject>{
           
           return new Promise((resolve, reject) =>{
           const newCompany   = {id:uuid(), ...company} 
           companys.push(newCompany);
           
           writeDataToFile('/Users/decagon/Desktop/NodeAsign/week-5-node-008-chinexman/server/server/company.json',companys);
        //    console.log("it has written");
           resolve(newCompany);
              })
}

export function update(id:number,product:companysObject):Promise<companysObject> | undefined{
           
    return new Promise((resolve, reject) =>{
    const index = companys.findIndex((p:companysObject)=>p.id===id)
    companys[index] ={ id, ...product}
    writeDataToFile('/Users/decagon/Desktop/NodeAsign/week-5-node-008-chinexman/server/server/company.json',companys);
    console.log("it has written");
    resolve(companys[index]);
       })
}


export function remove(id:number){
           
    return new Promise((resolve, reject) =>{


     const index = companys.findIndex((p:companysObject)=>p.id===id)

     companys = companys.filter((p:companysObject)=>p.id !==id)
    // products[index] ={ id, ...product}
      writeDataToFile('/Users/decagon/Desktop/NodeAsign/week-5-node-008-chinexman/server/server/company.json',companys);
    // console.log("it has written");
    resolve(null);
       })
}

//  module.exports = {
//     findById
//   //   findAll
//      //,findById,create,update,remove
//  }