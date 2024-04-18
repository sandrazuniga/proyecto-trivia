//variables preguntas rockstart
const tituloPregunta1 = document.getElementById("tituloPregunta1");
const enunciado1 = document.getElementById("enunciado1");
const rta1 = document.getElementById("rta1");
const rta2 = document.getElementById("rta2");
const rta3 = document.getElementById("rta3");
const radio = document.getElementsByName("respuesta");
let acumulado = parseInt(localStorage.getItem("acumulado")) || 0;
const campoNombre = document.getElementById("nombreUsuario");
// Nombre usuario
campoNombre.textContent = "Hola " + localStorage.getItem("nombreUsuario");
// variables contador
let tiempoRestante = 30;
let contadorInterval;
// funcion para la puntuacion
function asignarPuntuacion() {
    const puntuacion = document.getElementById("puntuacion");
    puntuacion.innerHTML = parseInt((acumulado / 3) * 100) + "/100";
}
// preguntas Rockstart
const preguntasRock = [
    {
        numeroPregunta: 1,
        pregunta: "¿A que banda pertenecia Freddy Mercury?",
        respuesta: {
            rtaA: "A. The Beatles",
            rtaB: "B. Queen",
            rtaC: "C. Nirvana",
        },
        verdadera: 2,
    },
    {
        numeroPregunta: 2,
        pregunta: "¿En que año Murió Amy Winehouse?",
        respuesta: {
            rtaA: "A. 2003",
            rtaB: "B. 2009",
            rtaC: "C. 2011",
        },
        verdadera: 3,
    },
    {
        numeroPregunta: 3,
        pregunta: "¿Como se llamaba el vocalista de soda stereo?",
        respuesta: {
            rtaA: "A. Charlie Alberti",
            rtaB: "B. Gustavo Cerati",
            rtaC: "C. Zeta Bosio",
        },
        verdadera: 2,
    },
];
// contador
if (
    window.location.pathname == "/vista/preguntas.html" ||
    window.location.pathname == "/vista/preguntasRock.html"
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
    console.log(tiempoRestante);
    contadorElement.textContent = tiempoRestante + "s";
    if (tiempoRestante <= 0) {
        detenerContador();
        window.location.href = "/vista/resultados.html";
    }
}

let preguntaActual1 = 0;
// funcion para mostrar preguntas rock
function mostrarPreguntaRock() {
    tituloPregunta1.textContent =
        "Pregunta " + preguntasRock[preguntaActual1].numeroPregunta;
    enunciado1.textContent = preguntasRock[preguntaActual1].pregunta;
    rta1.textContent = preguntasRock[preguntaActual1].respuesta.rtaA;
    rta2.textContent = preguntasRock[preguntaActual1].respuesta.rtaB;
    rta3.textContent = preguntasRock[preguntaActual1].respuesta.rtaC;

    //limpiae los campos
    rta1.classList.remove("correcta");
    rta1.classList.remove("incorrecta");
    rta2.classList.remove("correcta");
    rta2.classList.remove("incorrecta");
    rta3.classList.remove("correcta");
    rta3.classList.remove("incorrecta");
}
mostrarPreguntaRock();

//funcion para ir mostrando las demas preguntas 
function siguientePreguntaRock() {
    preguntaActual1++;
    if (preguntaActual1 < preguntasRock.length) {
        mostrarPreguntaRock();
    } else {
        window.location.href = "/vista/resultados.html";
    }
}

function validarPregunta() {
    let respuesta;
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            respuesta = i + 1;
        }
    }
    if (respuesta == preguntasRock[preguntaActual1].verdadera) {
        switch (respuesta) {
            case 1:
                rta1.classList.add("correcta");
                acumulado += 1;
                localStorage.setItem("acumulado", acumulado);

                break;
            case 2:
                rta2.classList.add("correcta");
                acumulado += 1;
                localStorage.setItem("acumulado", acumulado);
                break;
            case 3:
                rta3.classList.add("correcta");
                acumulado += 1;
                localStorage.setItem("acumulado", acumulado);
            default:
                break;
        }
    } else {
        switch (respuesta) {
            case 1:
                rta1.classList.add("incorrecta");

                break;
            case 2:
                rta2.classList.add("incorrecta");
                break;
            case 3:
                rta3.classList.add("incorrecta");
            default:
                break;
        }
    }
    setTimeout(() => {
        radio[respuesta - 1].checked = false;

        siguientePreguntaRock();
    }, 1000);
}
if (window.location.pathname === "/vista/resultados.html") {
    asignarPuntuacion();
}
