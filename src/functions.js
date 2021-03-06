var Matriz = []
//var columnas 
var visitados
var ciclos = []
var aux
var identidad = []
var Mx2 = []
var Mx3 = []
var Camino = []
var AristasAux
function matrizExist() {
        if(Matriz.length !==0)
            return true
        else return false
    }

function generarMatriz(Vertices, Aristas) {
        Matriz = []
        for (let i = 0; i < Vertices.length; i++) {
            Matriz[i] = new Array(Vertices.length)
        }
        // Da valor 0 a cada elemento de la matriz
        for (let i = 0; i < Vertices.length; i++) {
            for (let j = 0; j < Vertices.length; j++) {
                Matriz[i][j] = 0
            }  
        }
        mostrarMatriz(Vertices, Aristas)
        AristasAux = Aristas
        CantidadA(Aristas)
      }
      
function mostrarMatriz (Vertices, Aristas) {
        //let columnas2 = []
        
        matrizAdyacencia(Vertices, Aristas)
        /*
        for (let i = 0; i < Vertices.length; i++) {
            columnas = []
            for (let j = 0; j < Vertices.length; j++) {
                columnas += `${Matriz[i][j]} ` 
            }
            columnas = columnas.split(" ") 
            columnas.pop()
            columnas = columnas.join(" ")
            columnas2 += `${i+1} | ${columnas}</p/>`
            //console.log(`${i+1} | ${columnas}`)
        }
      */
        var tabla="<table border=\"0\" width=\"20vw\">";
    
        tabla+="<tr><td></td>";
        for(let j=0; j<Vertices.length ;j++){ 
            tabla+="<td>"+(j+1)+ "</td>";
        }

        for(let i=0; i < Vertices.length; i++) {
            tabla+="<tr>";
            tabla+="<td>" + (i+1) + "</td>";
            for(let j=0; j < Vertices.length; j++) { 
                tabla+="<td>" + Matriz[i][j] + "</td>";
            }
        tabla+="</tr>";
        }
        tabla+="</table>";
        document.getElementById("title").innerHTML="Matriz de Adyacencia";
        document.getElementById("tabla").innerHTML=tabla;
      }

function matrizAdyacencia (Vertices, Aristas)  {
        for(let arista of Aristas) {
            Matriz[arista.from - 1][arista.to - 1] = 1
          }
    }

    function tipoGrafo (Vertices, Aristas) {
        for (let i = 0; i < Aristas.length; i++) {
            //console.log(`from ${Aristas[i].from} to ${Aristas[i].to}`)
            //console.log((Aristas[i].sentido))
            var aux = 0
            if(Aristas[i].sentido !== 'Simple') {
                //console.log("Es dirigido")
                aux = 1
            } else {
            } if (aux === 1) {
                return;
            }
        }
        //console.log("Es Simple")
    }

function dfs (nodo) {
        for (let j = 0; j<Matriz.length; j++){
            var v = Matriz[nodo][j];
            if( v===1){
              if(visitados[j]===false){
                visitados[nodo] = true; // nodo actual marcado como visitado
                dfs(j);
                
              }
              if( v === 1 && visitados[j] === true && nodo === Matriz.length-1){
                visitados[nodo] = true;
              }
              
            }
          }

    }

function EsConexo () {
        visitados = [];
        for(let i=0; i< Matriz.length; i++){
            visitados[i] = false;
          }

          for (let i = 0; i< visitados.length; i++){
            dfs(i);
          }

          

          for (let i = 0; i<visitados.length; i++){
              if(visitados[i] === false){
                  for (let j = 0; j<visitados.length; j++){
                      if(Matriz[i][j] === 1){
                          return true;
                      }
                  }
              }
          }

          var cont = 0;
          for(let i = 0;i<visitados.length;i++){
              if(visitados[i] === true){cont++}
          }
          if(cont === visitados.length){return true}
          else{return false}

    }
    
    // comprobar si es regular
function EsRegular() {
        var grado1 = 0;
        var grado2 = 0;

        for(let i=0;i<Matriz.length;i++){

          for(let j=0; j<Matriz.length;j++){
            if(Matriz[i][j] === 1 ){
              grado1++;
            }
          }
          //console.log('Grado1 = '+grado1+' , Grado2 = '+grado2)
          if(i === 0){
            grado2 = grado1;
            grado1 = 0;
          }
          else{
            if(grado2 !==grado1){
              return false;
            } 
            else{
              grado2=grado1;
              grado1=0;
            }
          }
          
        } 
        return true;
    }

function CycleFinder(nodo) {
      for(let j = 0; j<Matriz.length; j++){
        if(Matriz[nodo][j] === 1 && j === aux){
          return true;
        }
        if(Matriz[nodo][j] === 1){
          //console.log(ciclos);

          if(CycleFinder(j)){
            //console.log(ciclos);
            return true;
          }

        }
      }
      
    }

function EsCiclico () {

        if(EsDirigido()) {

          for(let i = 0; i<Matriz.length; i++){
            ciclos[i] = false;
        }
        //console.log(ciclos);

        for(let c = 0; c<ciclos.length;c++){
          aux = c;
          var conta = 0;
          for(let j = 0; j<Matriz.length ; j++){
            if(Matriz[j][c] === 1){conta++}
          }
          if(conta !==  0) {
            if(CycleFinder(c)) {
              return true
            }
          }
        }
        return false;

        } else {
          return true;
        }
    }

function EsCompleto() {
      if(EsRegular() === false){return false}
      else{
        var cont 
        for(let i = 0; i<Matriz.length;i++){

          cont = 0;
          for(let j = 0; j<Matriz.length;j++){
            if(Matriz[i][j] === 1){cont++}
          }
          var M = Matriz.length -1;
          if(cont !==M){return false}
        }
      }
      return true;
    }

function EsDirigido() {
      for(let i = 0 ;i<Matriz.length;i++){
        for( let j = 0; j<Matriz.length; j++){
          //console.log(Matriz[i][j]); console.log(Matriz[j][i]);
          if(Matriz[i][j] !==Matriz[j][i]){return false}
        }
      }
      return true;
    }

function CantidadV () {
      return Matriz.length;
    }

function CantidadA(Aristas) {
    var sum = 0;
    var Asimple = 0
    var Adirigida = 0
    var undefined = 0
    for (let i = 0; i < Matriz.length; i++) {
      for (let j = 0; j < Matriz.length; j++) {
        undefined = undefined + Matriz[i][j]
      }
      
    }
    if(undefined === 0){return 0}
    /*if(!EsDirigido()) {
      for(let i =  0; i<Matriz.length; i++){
        for (let j = 0; j<Matriz.length; j++){
          if (i<=j)
          sum +=Matriz[i][j];
        }
      }
    }*/
    for (let i = 0; i < Aristas.length; i++) {
      //console.log(Aristas[i].sentido)
        if(Aristas[i].sentido === 'Simple')
          Asimple++
        if(Aristas[i].sentido === 'Dirigido')
          Adirigida++
    }
    Asimple = Asimple/2
    sum = Asimple + Adirigida
    document.getElementById("cantidada").innerHTML = `Cantidad de Aristas: ${sum}`
    document.getElementById("cantidadv").innerHTML = `Cantidad de Aristas: ${CantidadV()}`
    return sum 
}

function Regiones (){
  var v = CantidadV();
  var e = CantidadA(AristasAux);
  var r = 2-v+e;
  return r;
}

function MulTMat() {
  var MP = [];
  for(let i = 0; i< Matriz.length; i++) {
    MP[i] = [];
    for( let j = 0; j<Matriz.length; j++){
      MP[i][j] = 0;
      for(let k = 0; k<Matriz.length; k++){
        MP[i][j] += Matriz[i][k] * Mx2[k][j];
      }
      //console.log('Camino '+i+', '+j+' = '+MP[i][j])
    }
    //console.log(Camino[i])

  }
  return MP;
}

function Caminos() {

  //console.log('Matriz de identidad NxN')
  for( let i = 0; i<Matriz.length;i++){
    identidad[i] = [];
    Camino[i] = [];
    Mx2[i] = [];
    Mx3[i] = [];
    for(let j = 0;j<Matriz.length;j++){
      Camino[i][j] = 0;
      Mx2[i][j] = 0;
      Mx3[i][j] = 0;
      if(i === j){identidad[i][j]=1}
      else{identidad[i][j]=0}
    }
  }
  //console.table(identidad);
  /*
  var camino = Matriz
  var suma = 0
  for (let n = 0; n < Matriz.length - 1; n++) {
    
    for (let i = 0; i < Matriz.length; i++) {
      for (let j = 0; j < Matriz.length; j++) {
        for (let k = 0; k < Matriz.length; k++) {
          suma = Matriz[i][k] * camino[i][k]
        }
        camino[i][j] = suma;
      }
    }
    
  }
  
  console.table(camino)
  */
 
  for(let i = 0; i< Matriz.length; i++) {
    for( let j = 0; j<Matriz.length; j++){
      for(let k = 0; k<Matriz.length; k++){
        Mx2[i][j] += Matriz[i][k] * Matriz[k][j]; ///Matrices de adyacencia elevada a 2
      }
      //console.log('Camino '+i+', '+j+' = '+Mx2[i][j])
    }
    //console.log(Camino[i])
  }

    for( let i = 0; i<Matriz.length;i++){
      for (let j = 0; j< Matriz.length; j++){
        Camino[i][j] = identidad[i][j] + Matriz[i][j]
      }
    }

  for(let cont = 1; cont <Matriz.length-1 ; cont ++) {

      if(cont === 1){
        for( let i = 0; i<Matriz.length;i++){
          for (let j = 0; j< Matriz.length; j++){
            Camino[i][j] += Mx2[i][j];
          }
        }
      }
      else{
        Mx3 = this.MulTMat()

        for( let i = 0; i<Matriz.length;i++){
          for (let j = 0; j< Matriz.length; j++){
            Camino[i][j] += Mx3[i][j];
          }
        }
        Mx2 = Mx3;
      }
    }

  var tabla2="<table border=\"0\" width=\"20vw\">";
    
  tabla2+="<tr><td></td>";
  for(let j=0; j<Camino.length ;j++){ 
      tabla2+="<td>"+(j+1)+ "</td>";
  }

  for(let i=0; i < Camino.length; i++) {
      tabla2+="<tr>";
      tabla2+="<td>" + (i+1) + "</td>";
      for(let j=0; j < Camino.length; j++) { 
          tabla2+="<td>" + Camino[i][j] + "</td>";
      }
  tabla2+="</tr>";
  }
  tabla2+="</table>";
  
  //console.table(Camino)
        document.getElementById("ctitle").innerHTML="Matriz de Caminos";
        document.getElementById("ctabla").innerHTML=tabla2;
  for( let i = 0; i<Matriz.length;i++){
      //console.log(Camino[i]);
  }
  
}
    const functions = {CantidadA, CantidadV, EsDirigido, EsCompleto, EsCiclico, CycleFinder, 
      EsRegular, EsConexo, dfs, tipoGrafo, matrizAdyacencia, mostrarMatriz, generarMatriz, 
      matrizExist, Caminos, Regiones, MulTMat}
export {functions};