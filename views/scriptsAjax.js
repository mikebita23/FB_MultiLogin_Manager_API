let ouput=document.getElementById('resul');
let sendBtn=document.getElementById('sendBtn');
let getBtn =document.getElementById('getBtn');

var result= document.querySelector('#result')
var form =document.querySelector('#resultatform')
// D'abord installer Live Server : npm install live server

// POUR TESTER LANCER AVEC SERVER LIVE : click droit sur le fichier index.html et choisir Open with live server
var httpRequest=getHttpRequest();


var data =new FormData(form)
var input1= document.querySelector('#')
data.append('q', input1.value)
httpRequest.send(data)


//GET Data
getBtn.addEventListener('click', getData);

function getData(ev){

    let xhr= new XMLHttpRequest();
    if(!xhr){
        console.log("Error");
        return;
    }
// si le fichier n'existe pas 
    function stateChange(xhr){

        console.log(xhr.readyState); // etat de la requete
        
//requete terminée :XMLHttpRequest.DONE=4
        if(xhr.readyState==XMLHttpRequest.DONE){

          if(xhr.status>=200 && xhr.status<300){

            ouput.textContent =xhr.responseText;
            ouput.textContent.JSON();


          }
          if(xhr.status>=400 && xhr.status <600){
            console.log("Error" + xhr.statusText + ";");
          };
        }
    }

    request('GET','https://jsonplaceholder.typicode.com/posts', stateChange );


    console.log('get Data');

}

//send Data
sendBtn.addEventListener('click', sendData);

function sendData(ev){

    // si le fichier n'existe pas 
    function stateChange(xhr){

 // etat de la requete 
 //console.log(xhr.readyState);   
//requete terminée :XMLHttpRequest.DONE=4
//charger 3: XMLHttpRequest.LOADING

        if(xhr.readyState==XMLHttpRequest.DONE){

          if(xhr.status>=200 && xhr.status<300){
            ouput.textContent =xhr.responseText;
            JSON.parse(ouput.textContent)

          }
          else if(xhr.status>=400 && xhr.status <600){
            console.log("Error" + xhr.statusText + ";");
          }
        }
        
        else if(xhr.readyState==XMLHttpRequest.OPENED){
            ouput.textContent ="open..;";
        }

        


    }

// Creation de l'objet à envoyer 



     let obj={
        Object: 'Renseignement',
        Content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        IdUser: 1
        
     };
     obj=JSON.stringify(obj);

     request('POST','https://jsonplaceholder.typicode.com/posts', stateChange, obj );

    

}

// Traitement de data

function request(method, url, onreadystatechange= function(){}, data={}, contentType=null){
    
    let xhr= new XMLHttpRequest();
    if(!xhr) throw new Error('Object ${XMLHttpRequest.name} not defined '); // si l y'a erreur

    if(typeof onreadystatechange=="function"){
        xhr.onreadystatechange=function(){
            onreadystatechange(xhr);
        }
    }
 try{
     xhr.open(method, url);
     xhr.setRequestHeader('Content-type', contentType || 'application/json' );
     // xhr.setRequestHeader("Access-Control-Allow-Origin:*");

     xhr.send(data);

 } catch(error){
    console.log(error)
 }


    

}

