const resultado=document.querySelector("#resultado");let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("mostrar");const o=document.querySelector(".actual");o&&o.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador())}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,botonesPaginador())}))}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:o,precio:n}=e,a=document.createElement("P");a.classList.add("nombre-servicio"),a.textContent=o;const c=document.createElement("P");c.classList.add("precio-servicio"),c.textContent="$"+n;const s=document.createElement("DIV");s.classList.add("servicio"),s.dataset.idServicio=t,s.onclick=function(){seleccionarServicio(e)},s.appendChild(a),s.appendChild(c),document.querySelector("#servicios").appendChild(s)})}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,n=document.querySelector(`[data-id-servicio="${t}"]`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),n.classList.remove("seleccionado")):(cita.servicios=[...o,e],n.classList.add("seleccionado"))}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(e.target.value="",mostrarAlerta("Fines de semana no permitidos","error",".formulario")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<10||t>=18?(e.target.value="",mostrarAlerta("Hora No Válida","error",".formulario")):cita.hora=e.target.value}))}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("Faltan Datos de Servicios, Fecha u Hora","error",".contenido-resumen",!1);const{nombre:t,fecha:o,hora:n,servicios:a}=cita,c=document.createElement("P");c.innerHTML="<span>Nombre:</span> "+t;const s=document.createElement("P");s.innerHTML="<span>Fecha:</span> "+o;const r=document.createElement("P");r.innerHTML="<span>Hora:</span> "+n,a.forEach(t=>{const{id:o,nombre:n,precio:a}=t,c=document.createElement("DIV");c.classList.add("contenedor-servicio");const s=document.createElement("P");s.textContent=n;const r=document.createElement("P");r.innerHTML="<span>Precio</span> $"+a,c.appendChild(s),c.appendChild(r),e.appendChild(c)}),e.appendChild(c),e.appendChild(s),e.appendChild(r),console.log(e)}function mostrarAlerta(e,t,o,n=!0){const a=document.querySelector(".alerta");a&&a.remove();const c=document.createElement("DIV");c.textContent=e,c.classList.add("alerta"),c.classList.add(t);document.querySelector(o).appendChild(c),n&&setTimeout(()=>{c.remove()},3e3)}function mostrarSpinner(){const e=document.createElement("div");e.classList.add("sk-chase"),e.innerHTML='\n        <div class="sk-chase-dot"></div>\n        <div class="sk-chase-dot"></div>\n        <div class="sk-chase-dot"></div>\n        <div class="sk-chase-dot"></div>\n        <div class="sk-chase-dot"></div>\n        <div class="sk-chase-dot"></div>\n    ',resultado.appendChild(e)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));
//# sourceMappingURL=app.js.map
