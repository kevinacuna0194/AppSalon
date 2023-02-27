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

    mostrarResumen(); /** Muestra el resumen de la cita */
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

        mostrarResumen();
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
            mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora() {
    const inputFecha = document.querySelector('#hora');
    inputFecha.addEventListener('input', function (e) {
        const horaCita = e.target.value;
        // const hora = horaCita.split(':')

        /* console.log(hora);
        2) ['17', '56']
        0: "17"
        1: "56"length: 2
        [[Prototype]]: Array(0) */

        const hora = horaCita.split(':')[0];
        if (hora < 10 || hora >= 18) {
            e.target.value = '';
            mostrarAlerta('Hora No Válida', 'error', '.formulario');
        } else {
            /** hora válida */
            cita.hora = e.target.value;
        }
    });
}

function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    /** Limpiar el contenido de Resumen */
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    /*
    console.log(Object.values(cita));
    (4) [' Kevin Acuña', '', '', Array(0)]
    0: " Kevin Acuña"
    1: ""
    2: ""
    3: []
    length: 4
    [[Prototype]]: Array(0)
    */

    if (Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta('Faltan Datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen', false);

        return;
    }

    /** Formatear Div de resumen 
     * lo primero que voy a hacer aquí es de aplicar destructuring al Objeto de cita, a estas alturas ya tenemos todos los datos, ya pase la validación, se que todo va a tener información. */
    const { nombre, fecha, hora, servicios } = cita;

    /** Heading para servicios en Resumen */
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    /** Iterando y mostrando los servicios */
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });

    /** Heading para Cita en Resumen */
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    /** Formatear fecha en español */
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth()
    const dia = fechaObj.getDate();
    const year = fechaObj.getFullYear();

    /** console.log(fechaObj);  Sun Feb 26 2023 21:00:00 GMT-0300 (hora estándar de Uruguay) */
    /** console.log(mes);  1 - Febrero */
    /**console.log(dia);  26 */
    /** console.log(year);  2023 */

    const fechaUTC = new Date(Date.UTC(year, mes, dia));

    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const fechaFormateada = fechaUTC.toLocaleDateString('es-ES', opciones);

    /** console.log(fechaUTC); /** Sat Feb 25 2023 21:00:00 GMT-0300 (hora estándar de Uruguay) */
    /** console.log(fechaFormateada); /** 2023 sábado */

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    /** Boton para crear una Cita */
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    /** Evento en el boton */
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    resumen.appendChild(botonReservar);
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
    /** Previenen que se genere más de una alerta  */
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    /** Scripting para crear la alerta */
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if (desaparece) {
        /** Eliminar la alerta */
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

async function reservarCita() {

    const { nombre, fecha, hora, servicios } = cita;

    const idServicios = servicios.map(servicio => servicio.id);
    // console.log(idServicios);

    const datos = new FormData(); /** Submit pero con JavaScript */
    datos.append('nombre', nombre);
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('servicios', idServicios);

    /** console.log([...datos]); /** [Array(2)] */
    /** Array(3)
    0: (2) ['nombre', ' Kevin Acuña']
    1: (2) ['fecha', '2023-02-27']
    2: (2) ['hora', '16:08']
    length: 3
    [[Prototype]]: Array(0) */

    /** Petición hacia la API */
    const url = 'http://localhost:3000/api/citas';
    /** Enviar petición a la API con fetch. 1- fetch a la URL 2 - Objeto de configuración. Es meramente opcional, pero cuando envías una petición de tipo post es obligatorio */
    const respuesta = await fetch(url, {
        method: 'POST',
        body: datos
    });

    const resultado = await respuesta.json(); // Resultado del método en el Controller.

    console.log(resultado);
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