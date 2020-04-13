

class ConversorJson{


    static EndJson(obj){
      var enderec = obj["endereco"];//.replace(/\.|\-/g, "")
        var endereco = JSON.parse(obj["endereco"].replace(/\\/g, ""));
       return Object.assign(obj, { endereco: endereco });
     }

     static EndString(obj){
       return Object.assign(obj, { endereco: JSON.stringify(obj["endereco"]) });
     }

}

module.exports = ConversorJson;

/*{"cep": "72880-500","logradouro": "SQ 12 Quadra 5","complemento": "","bairro": "Centro","localidade": "Cidade Ocidental","uf": "GO","unidade": "","ibge": "5205497","gia": ""}
"{'cep': '72880-540','logradouro': 'SQ 13 Quadra 8','complemento': '','bairro': 'Centro','localidade': 'Cidade Ocidental','uf': 'GO','unidade': '','ibge': '5205497','gia': ''}"
**/