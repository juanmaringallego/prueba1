function error(menssage, code){
    let e = new Error(menssage);

    if(code){
        e.statusCode= code;
    }
    return e;

}

module.exports = error;