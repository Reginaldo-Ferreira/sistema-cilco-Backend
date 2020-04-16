const Sequelize = require('sequelize');

class Validations {

  static verifLetrasDigitos(value) {
    var errroList = []; // validando senha
    
    if (!(/(?=(.*\d){2})/g.test(value))) { // verifica se tem dois digitos, se não tiver retorna a mensagem
      errroList.push("dois numeros");
    }
 
    if (!(/(?=(.*[a-zA-Z]){2})/g.test(value))) {
      errroList.push("duas letra");
    }
    return errroList;
  }

  static verificarCPF(str_CPF) { // essa função retorna true or false
    var Soma;
    var Resto;
    let strCPF = str_CPF.replace(/\.|\-/g, ""); // retira '.' e '-' deixando somente os numeros
    
    Soma = 0;

    if (strCPF == "00000000000" || parseInt(strCPF) === 0) {
      return false;}
     
    for ( let i = 1; i <= 9; i++) {
       Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);}

    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) { 
      Resto = 0;}

    if (Resto != parseInt(strCPF.substring(9, 10)) ) { 
      return false; }
   
    Soma = 0;
        for (let i = 1; i <= 10; i++) {
          Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);}
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11)) {
      Resto = 0;}

    if (Resto != parseInt(strCPF.substring(10, 11) ) ) {
      return false;}

    return true;

  }

  // campo= [{prop:'value'},{{prop2:'value2'},...]
  
  static async checkExistence(model, campos){
    let where= {};
    if(campos.length > 1){
      where = {[Sequelize.Op.or]:campos};
    }else{
      where = campos[0] ;
    }

    let result = {};
//console.log("checkExistence: ",where );
    const row = await model.findOne({
      where
    });
    
    if (row !== null) {
      var dataValues = row.dataValues
      campos.forEach((v, i, ar)=>{
       
        let rowKey = '';

        try{
          rowKey = Object.keys(dataValues); //Object.keys( where[i]);
        }catch(e){
    
           //console.log(e);
         }
     
         let prop = Object.keys(v);// 
         result[prop] = v[prop] == ((typeof dataValues[prop] !== "undefined") ? dataValues[prop] : "undefined" );
         result.id = row.dataValues.id;
        });
    }else{
      return {fields: false};
    }
 
    return result;
  }

}

module.exports = Validations;
