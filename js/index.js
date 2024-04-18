// variables preguntas superheroes
const tituloPregunta = document.getElementById("tituloPregunta");
const enunciado = document.getElementById("enunciado");
const respuesta1 = document.getElementById("respuesta1");
const respuesta2 = document.getElementById("respuesta2");
const respuesta3 = document.getElementById("respuesta3");
const radio = document.getElementsByName("respuesta");

//puntaje acummulado
let acumulado = parseInt(localStorage.getItem("acumulado")) || 0;

// variables contador Tiempo en segundos
let tiempoRestante = 30;
let contadorInterval;

//nombre de usuario
const campoNombre = document.getElementById("nombreUsuario");

// puntuacion
function asignarPuntuacion() {
    const puntuacion = document.getElementById("puntuacion");

    puntuacion.innerHTML = parseInt((acumulado / 3) * 100) + "/100";
}

//preguntas superheroes
const preguntaSuper = [
    {
        numeroPregunta: 1,
        pregunta: "¿Cuáles es el super héroe que tiene un martillo?",
        respuesta: {
            rtaA: "A. Superman",
            rtaB: "B. Kick Ass",
            rtaC: "C. Thor ",
        },
        verdadera: 3,
    },
    {
        numeroPregunta: 2,
        pregunta: "¿Cuáles es el verdadero nombre de la mujer maravilla?",
        respuesta: {
            rtaA: "A. Diana Prince",
            rtaB: "B. Kara Danvers",
            rtaC: "C. Barbara Gordon",
        },
        verdadera: 1,
    },
    {
        numeroPregunta: 3,
        pregunta: "¿Que característica tiene Superman?",
        respuesta: {
            rtaA: "A. Usa telaraña taser",
            rtaB: "B. Usa traje de murcielago",
            rtaC: "C. Susceptibilidad a la kriptonita",
        },
        verdadera: 3,
    },
];

// validar que el usuario ingrese el nombre y si no que muestre un mensaje
// si ingreso bien el nombre redireciona a las categorias
function redireccionarSiValor() {
    let campoValor = document.getElementById("nombre").value;

    if (campoValor.trim() !== "") {
        localStorage.setItem("nombreUsuario", campoValor);
        window.location.href = "/vista/categorias.html";
    } else {
        alert("El campo esta vació. Por favor ingrese un nombre.");
    }
}

// redirecionar a preguntas 
function redireccionarSuper() {
    window.location.href = "/vista/preguntas.html";
}
// redirecionar a preguntas peliculas
function redireccionarRock() {
    window.location.href = "/vista/preguntasRock.html";
}

// redirecionar a pagina principal
function redireccionarPrincipal() {
    localStorage.setItem("acumulado", 0);
    window.location.href = "../index.html";
}

if (
    window.location.pathname == "/vista/preguntas.html" ||
    window.location.pathname == "/vista/preguntasPelicula.html"
) {
    iniciarContador();
}

function iniciarContador() {
    console.log("contador iniciado");
    contadorInterval = setInterval(actualizarContador, 1000);
}

function detenerContador() {
    clearInterval(contadorInterval);
}

function actualizarContador() {
    const contadorElement = document.getElementById("contador");
    tiempoRestante--;
    
    contadorElement.textContent = tiempoRestante + "s";
    if (tiempoRestante <= 0) {
        detenerContador();
        window.location.href = "/vista/resultados.html";
    }
}

//declarar variable pregunta actual
let preguntaActual = 0;

campoNombre.textContent = "Hola " + localStorage.getItem("nombreUsuario");

// funcion para mostrar pregunta 
function mostrarPregunta() {
    tituloPregunta.textContent =
        "Pregunta "+preguntaSuper[preguntaActual].numeroPregunta;
    enunciado.textContent=preguntaSuper[preguntaActual].pregunta;
    respuesta1.textContent=preguntaSuper[preguntaActual].respuesta.rtaA;
    respuesta2.textContent=preguntaSuper[preguntaActual].respuesta.rtaB;
    respuesta3.textContent= preguntaSuper[preguntaActual].respuesta.rtaC;
    respuesta1.classList.remove("correcta");
    respuesta1.classList.remove("incorrecta");
    respuesta2.classList.remove("correcta");
    respuesta2.classList.remove("incorrecta");
    respuesta3.classList.remove("correcta");
    respuesta3.classList.remove("incorrecta");
}

if (window.location.pathname === "/vista/preguntas.html") {
    mostrarPregunta();
}

// funcion para ir mostrando las demas preguntas 
function siguientePregunta() {
    preguntaActual++;
    if (preguntaActual<preguntaSuper.length) {
        mostrarPregunta();
    } else {
        window.location.href = "/vista/resultados.html";
    }
}

// funcion para validar respuesta correcta
function validarPregunta() {
    let respuesta;
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            respuesta = i + 1;
        }
    }
    if (respuesta==preguntaSuper[preguntaActual].verdadera) {
        switch (respuesta) {
            case 1: {
                respuesta1.classList.add("correcta");
                acumulado += 1;
                localStorage.setItem("acumulado", acumulado);
                break;
            }
            case 2: {
                respuesta2.classList.add("correcta");
                acumulado += 1;
                localStorage.setItem("acumulado", acumulado);
                break;
            }
            case 3: {
                respuesta3.classList.add("correcta");
                acumulado += 1;
                localStorage.setItem("acumulado", acumulado);
                break;
            }
            default:
                break;
        }
    } else {
        switch (respuesta) {
            case 1:
                respuesta1.classList.add("incorrecta");
                break;
            case 2:
                respuesta2.classList.add("incorrecta");
                break;
            case 3:
                respuesta3.classList.add("incorrecta");
            default:
                break;
        }
    }
    setTimeout(() => {
        radio[respuesta - 1].checked = false;
        siguientePregunta();
    }, 1000);
}

if (window.location.pathname === "/vista/resultados.html") {
    asignarPuntuacion();
}

if (window.location.pathname === "/index.html") {
    localStorage.setItem("acumulado", 0);
}
