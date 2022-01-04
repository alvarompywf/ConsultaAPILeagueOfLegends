var personajes;
var sustituido = true;

function obtenerPersonajes() {

    fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json')
        .then(response => response.json())
        .then(data => {
            personajes = data.data;
            console.log(data.data);
        });

}

function controlarSubmit(event) {

    event.preventDefault();

    var getInput = event.target.name.value;
    var nombre = event.target.name.value;

    nombre = getInput[0].toUpperCase() + getInput.slice(1);
    getInput = getInput[0].toUpperCase() + getInput.slice(1);//poner la primera letra en mayusculas

    Object.entries(personajes).map(psj => {

        console.log(psj[1].name);

        if (getInput == psj[1].name) {

            var lore = psj[1].blurb;
            var ataque = psj[1].info.attack;
            var defensa = psj[1].info.defense;
            var dificultad = psj[1].info.difficulty;
            var magia = psj[1].info.magic;
            
            obtenerImagenAtras(nombre);
            obtenerImagen(getInput, lore, ataque, defensa, dificultad, magia);
            
        }

    });

    console.log(getInput);
    //return getInput;
    console.log(personajes);
}

function obtenerImagen(nombrePersonaje, lore, ataque, defensa, dificultad, magia) {


    fetch(`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${nombrePersonaje}.png`)
        .then(response => response.blob())
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            crearDiv(imageObjectURL, nombrePersonaje, lore, ataque, defensa, dificultad, magia);
        });

}

function obtenerImagenAtras(nombrePersonaje) {

    fetch(`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${nombrePersonaje}_0.jpg`)
        .then(response => response.blob())
        .then(imageBlob2 => {
            const imageObjectURL2 = URL.createObjectURL(imageBlob2);
            cartaAtras(imageObjectURL2);
        });

}

function borrar() {

    var divPsjs = document.querySelector("#personajes div");
    divPsjs.remove();

}

function resetPage() {

    var divPsjs = document.querySelector("#personajes div");

    if (divPsjs != null) {// si hay algo se sustituye

        divPsjs.remove();

    }

}


function crearDiv(imageObjectURL, nombrePersonaje, lore, ataque, defensa, dificultad, magia) {//DOM

    resetPage();

    var divPersonajes = document.getElementById("personajes");//obteniendo el div del html donde pondremos el contenido.

    var divCaja = document.createElement("div");//creamos un div
    divCaja.classList.add("caja");             //Y le añadimos una clase


    var p = document.createElement("p");                 //creamos un <p></p> donde pondremos el titulo 
    var text = document.createTextNode(nombrePersonaje);//Obtenemos el texto del personaje
    p.classList.add("titulo");                         //Le añadimos una clase al titulo 

    p.appendChild(text);                              //le añadimos el texto al div
    divCaja.appendChild(p);                          //le añadimos un el parrafo al div

    divPersonajes.appendChild(divCaja);             //Y se lo añadimos 


    var img = document.createElement("img");     //creamos una etiqueta imagen <img></img>
    img.classList.add("imagen");                //le añadimos una clase.
    img.setAttribute("src", imageObjectURL);   //y la ruta de la imagen SRC

    divCaja.appendChild(img);                       //se lo añadimos a la caja

    var loreParr = document.createElement("p");    //creamos una etiqueta <p></p> para añadir el lore
    loreParr.classList.add("lore");               //le creo una class para poder modificarlo

    var loreText = document.createTextNode("LORE/HISTORIA : " + lore); //creamos el texto obteniendolo de la API

    loreParr.appendChild(loreText);                     //Lo añadimos
    divCaja.appendChild(loreParr);

    //  DOM del ataque, defensa , ...
    var attackParr = document.createElement("p");
    attackParr.classList.add("atYDef");


    var attackText = document.createTextNode("att: " + ataque);

    attackParr.appendChild(attackText);
    divCaja.appendChild(attackParr);
    //defensa
    var defensaParr = document.createElement("p");


    var defensaText = document.createTextNode("def: " + defensa);
    defensaParr.classList.add("atYDef");
    defensaParr.appendChild(defensaText);
    divCaja.appendChild(defensaParr);

    //dificultad
    var dificultadParr = document.createElement("p");
    var dificultadText = document.createTextNode("dif: " + dificultad);
    dificultadParr.classList.add("dif");
    dificultadParr.appendChild(dificultadText);
    divCaja.appendChild(dificultadParr);
    //magia
    var magiaParr = document.createElement("p");
    var magiaText = document.createTextNode("mag: " + magia);
    magiaParr.classList.add("mag");
    magiaParr.appendChild(magiaText);
    divCaja.appendChild(magiaParr);



}
function resetPageAtras() {

    var divPsjs = document.querySelector(".imagen2");

    if (divPsjs != null) {// si hay algo se sustituye

        divPsjs.remove();

    }

}
function cartaAtras(imageObjectURL) {

    
    resetPageAtras();

    
    var divDetras = document.getElementById("atras");

    var div2 = document.createElement("div"); 
    div2.classList.add("divAtras");        
    divDetras.appendChild(div2);


    var img = document.createElement("img");     //creamos una etiqueta imagen <img></img>
    img.classList.add("imagen2");                //le añadimos una clase.
    img.setAttribute("src", imageObjectURL);   //y la ruta de la imagen SRC

    divDetras.appendChild(img);

}


window.onload = obtenerPersonajes();