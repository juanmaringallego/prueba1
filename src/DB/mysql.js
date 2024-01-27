const mysql= require('mysql');
const config= require('../config');

const dbconfig ={
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conMysql(){
    conexion= mysql.createConnection(dbconfig);

    conexion.connect((err)=>{
        if(err){
            console.log('[db err]', err);
            setTimeout(conMysql, 200);

        }else{
            console.log('DB conectada')
        }
    });

    conexion.on('error', err=> {
        console.log('[db err]', err);
        if(err.code === 'PROTCOL_CONNECTION_LOST'){
            conMysql();
    
        }else{
            throw err;
        }
    })
}



conMysql();

function todos(tabla){
    

    return new Promise((resolve, reject)=>{
       conexion.query( `Select * FROM ${tabla}`, (error, result)=>{
         return error ? reject(error):resolve(result);
       }) 
        
    });
}


function uno(tabla, id){
    return new Promise((resolve, reject)=>{
        conexion.query( `Select * FROM ${tabla} WHERE id=${id}`, (error, result)=>{
            return error ? reject(error):resolve(result);
        }) 
         
     });
}

function agregar(tabla, data){
    
    if(data && data.id == 0){
        return insertar(tabla, data);
    }else{
        return actualizar(tabla, data);
    }
}

function insertar(tabla, data){
    return new Promise((resolve, reject)=>{
        console.log(data,'agregar');
        conexion.query( `INSERT INTO ${tabla} SET  ?`, data, (error, result)=>{
            return error ? reject(error):resolve(result);
        }) 
         
     });
}  
function actualizar(tabla, data){
    return new Promise((resolve, reject)=>{
        console.log(data);
        conexion.query( `UPDATE ${tabla} SET ? WHERE id = ?`,[ data, data.id], (error, result)=>{
            return error ? reject(error):resolve(result);
        }) 
         
     });
}     

function eliminar(tabla, data){
    return new Promise((resolve, reject)=>{
        console.log(data,'eliminar');
        conexion.query( `DELETE FROM ${tabla} WHERE id = ?`, data.id, (error, result)=>{       
        return error ? reject(error):resolve(result);
        }) 
         
     });
}

module.exports= {
    todos,
    uno,
    agregar,
    eliminar,
}