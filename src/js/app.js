const resultado = document.querySelector('#resultado');

let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion() /** Mustra la seccion por defaul en /cita al ingresar  */
    tabs(); /** Cambiar la seccion cuando se presionen los Tabs */
    botonesPaginador(); /** Agrega o quita los botones del paginador */
    paginaSiguiente();
    paginaAnterior();

    consultarAPI(); /** Consulta la API en el backend de PHP */

    nombreCliente(); /** Añadir el nombre del cliente al objeto de Cita */
    seleccionarFecha(); /** Añade la fecha de la cita en el objeto */
    seleccionarHora(); /** Añade la hora de la cita en el objeto */
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton => {
        boton.addEventListener('click', function (e) {
            /** Detectar a que le estamos dando click para mostrar esa sección */
            // console.log(e.target.dataset); // DOMStringMap {paso: "1"}
            // console.log(typeof parseInt(e.target.dataset.paso)); 
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        });
    });
}

function mostrarSeccion() {
    /** Ocultar la seccion que tenga la clase de mostrar */
    const seccionAnterior = document.querySelector('.mostrar');
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }

    /** Seleccionar la sección con el paso */
    const pasoSelector = `#paso-${paso}`; // id="paso-1"
    const seccion = document.querySelector(pasoSelector); // <div id="paso-1" class="seccion">...</div>
    seccion.classList.add('mostrar');

    /** Quita la clase de actual al tab anterior */
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    /** Resalta el Tab actual */
    const tab = document.querySelector(`[data-paso="${paso}"]`)
    tab.classList.add('actual');
}

function botonesPaginador() {
    /** Registrar botonoes de siguiente y anterior */
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();
}

function paginaAnterior() {
    /** Seleccionar boton */
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function () {
        if (paso <= pasoInicial) return;

        paso--;

        botonesPaginador();
    });
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function () {
        if (paso >= pasoFinal) return;

        paso++;

        botonesPaginador();
    });
}

function mostrarSpinner() {
    const spinner = document.createElement('div');
    spinner.classList.add('sk-chase');

    spinner.innerHTML = `
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
    `;

    resultado.appendChild(spinner);
}

async function consultarAPI() {
    /** try, catch previene que tu aplicación deje de funcionar y te da un mensaje de error */
    try {
        const url = 'http://localhost:3000/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);

    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id; /** Atributo perzonalizado */

        /** Evento al Servicio */
        servicioDiv.onclick = function () {
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

function seleccionarServicio(servicio) {
    /** Objeto completo */
    const { id } = servicio;
    /** Objeto */
    const { servicios } = cita;
    /** Identificar el elemento al que se le da click */
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    /** Comprobar si un servicio ya fue agregao */
    if (servicios.some(agregado => agregado.id === id)) {
        /** true - Agregado 
         * Eliminarlo */
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    } else {
        /** false - no está agregado 
         * Agregarlo */
        /** Toma una copia del arreglo servicios dentro del objeto creado y le voy agregando el nuevo servicio seleccionado en la interfaz de usuario. */
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }

    console.log(cita);
}

function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function (e) {
        const dia = new Date(e.target.value).getUTCDay();

        if ([6, 0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Fines de semana no permitidos', 'error');
        } else {
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora() {
    const inputFecha = document.querySelector('#hora');
    inputFecha.addEventListener('input', function(e) {
        const horaCita = e.target.value;
        // const hora = horaCita.split(':')

        /* console.log(hora);
        2) ['17', '56']
        0: "17"
        1: "56"length: 2
        [[Prototype]]: Array(0) */

        const hora = horaCita.split(':')[0];
        if (hora < 10 || hora > 18) {
            e.target.value = '';
            mostrarAlerta('Hora No Válida', 'error');
        } else {
            /** hora válida */
            cita.hora = e.target.value;

            console.log(cita);
        }
    });
}

function mostrarAlerta(mensaje, tipo) {
    /** Previenen que se genere más de una alerta  */
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) return;

    /** Scripting para crear la alerta */
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const formulario = document.querySelector('#paso-2 p');
    formulario.appendChild(alerta);

    /** Eliminar la alerta */
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}