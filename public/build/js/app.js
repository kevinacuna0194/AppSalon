const resultado=document.querySelector("#resultado");let paso=1;function iniciarApp(){mostrarSeccion(),tabs()}function tabs(){document.querySelectorAll(".tabs button").forEach(s=>{s.addEventListener("click",(function(s){paso=parseInt(s.target.dataset.paso),mostrarSeccion()}))})}function mostrarSeccion(){const s=document.querySelector(".mostrar");s&&s.classList.remove("mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("mostrar");const e=document.querySelector(".actual");e&&e.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function mostrarSpinner(){const s=document.createElement("div");s.classList.add("sk-chase"),s.innerHTML='\n        <div class="sk-chase-dot"></div>\n        <div class="sk-chase-dot"></div>\n        <div class="sk-chase-dot"></div>\n        <div class="sk-chase-dot"></div>\n        <div class="sk-chase-dot"></div>\n        <div class="sk-chase-dot"></div>\n    ',resultado.appendChild(s)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));