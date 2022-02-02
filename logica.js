var personajes;

var sustituido = true;


function agregarEventos() {

    let select = document.querySelector("#selectPorNombre");
    select.addEventListener("change", controlarSelect);

}

// INPUT
async function obtenerPersonajes() {

    await fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/es_ES/champion.json')
        .then(response => response.json())
        .then(data => {
            personajes = data.data
            console.log(personajes)
        });


    introducirEnElSelect();
    agregarEventos();
}



// SELECT-OPTION
function controlarSelect(event) {
    resetPage();
    let select = document.querySelector("#selectPorNombre");

    event.preventDefault();

    var getSelect = this.options[select.selectedIndex].value;

    Object.entries(personajes).map(psj => {

        if (getSelect == psj[1].id) {


            obtenerImagen(psj[1].id);

        }

    });

}

function introducirEnElSelect() {
    resetPage();
    //obtenemos el select vacio  
    var selectPsjs = document.querySelector("#selectPorNombre");

    Object.entries(personajes).map(psj => {//vamos rellenando el select creando options con todos los personajes 
        var option = document.createElement("option");
        option.setAttribute("id", psj[1].id);
        option.setAttribute("name", psj[1].id);
        option.setAttribute("value", psj[1].id);

        option.innerText = psj[1].name;
        selectPsjs.appendChild(option);// se rellena aquí 
    });

}

function controlarSubmit(event) {

    resetPage();
    event.preventDefault();
    var getInput = event.target.name.value;

    const optionRol = event.target.selectRol.value;

    if (getInput != "") {
        getInput = getInput[0].toUpperCase() + getInput.slice(1);//poner la primera letra en mayusculas    
    } if (optionRol !== "") {
        let rolPersonaje = optionRol;
        seleccionarRol(rolPersonaje);
    }


    Object.entries(personajes).map(psj => {

        if (getInput == psj[1].name) {

            getInput = psj[1].id;

            obtenerImagen(getInput);
        }
    });



}

function seleccionarRol(rolPersonaje) {
    resetPage();

    Object.entries(personajes).map(psj => {
        if (psj[1].tags[0] === rolPersonaje) {

            let nombrePersonaje = psj[1].id;

            obtenerImagen(nombrePersonaje);
            console.log(psj[1]);

        } else {
            console.log(psj[1].id + " no es " + rolPersonaje)
        }
    });
}


function obtenerImagen(nombrePersonaje) {

    console.log("Nombre del personaje es line 85 " + nombrePersonaje);
    fetch(`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${nombrePersonaje}.png`)
        .then(response => response.blob())
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            crearDiv(imageObjectURL, nombrePersonaje);
        });

}



function crearDiv(imageObjectURL, nombrePersonaje) {//DOM

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
    img.setAttribute("alt", `imagen de ${nombrePersonaje}`)
    divCaja.appendChild(img);                       //se lo añadimos a la caja

    insertarRisa(nombrePersonaje);
    insertarFrase(nombrePersonaje);

}

function insertarRisa(nombrePersonaje) {

    var risa = new Audio(`sounds/laugh/${nombrePersonaje}.laugh1.wav`);


    let divCaja = document.querySelector(".caja");
    let botonAudio = document.createElement("button");
    botonAudio.setAttribute("class", "risa");
    divCaja.appendChild(botonAudio);

    let boton = document.querySelector(".risa");

    boton.addEventListener("click", () => {

        risa.play();

    })

}

function insertarFrase(nombrePersonaje) {

    var frase = new Audio(`sounds/jokes/${nombrePersonaje}.joke.wav`);

    let divCaja = document.querySelector(".caja");
    let botonAudio = document.createElement("button");
    botonAudio.setAttribute("class", "frase");
    divCaja.appendChild(botonAudio);

    let boton = document.querySelector(".frase");

    boton.addEventListener("click", () => {

        frase.play();

    })

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


window.onload = obtenerPersonajes();