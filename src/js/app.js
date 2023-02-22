const resultado = document.querySelector('#resultado');

let paso = 1;

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion() /** Mustra la seccion por defaul en /cita al ingresar  */
    tabs(); /** Cambiar la seccion cuando se presionen los Tabs */
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');
    
    botones.forEach( boton => {
        boton.addEventListener('click', function(e) {
            /** Detectar a que le estamos dando click para mostrar esa sección */
            // console.log(e.target.dataset); // DOMStringMap {paso: "1"}
            // console.log(typeof parseInt(e.target.dataset.paso)); 
            paso = parseInt(e.target.dataset.paso); 
            mostrarSeccion();
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