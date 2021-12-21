var personajes;

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


    Object.entries(personajes).map(psj => {

        console.log(psj[1].name);

        if (getInput == psj[1].name) {
            var lore = psj[1].blurb;
            obtenerImagen(getInput, lore);
        }


    });

    console.log(getInput);
    //return getInput;
    console.log(personajes);
}

function obtenerImagen(nombrePersonaje, lore) {


    fetch(`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${nombrePersonaje}.png`)
        .then(response => response.blob())
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            crearDiv(imageObjectURL, nombrePersonaje, lore);
        });

}

function obtenerLore() {

}
function crearDiv(imageObjectURL, nombrePersonaje, lore) {//DOM

    var divPersonajes = document.querySelector("#personajes");//obteniendo el div del html donde pondremos el contenido.

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

    var loreText = document.createTextNode("LORE/HISTORIA : "+lore); //creamos el texto obteniendolo de la API
    
    loreParr.appendChild(loreText);                     //Lo añadimos
    divCaja.appendChild(loreParr);

}

window.onload = obtenerPersonajes();