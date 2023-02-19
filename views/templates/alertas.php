<?php

/*
array(1) {
  ["error"]=>
  array(2) {
    [0]=>
    string(38) "El Apellido del Cliente es Obligatorio"
    [1]=>
    string(36) "El Nombre del Cliente es Obligatorio"
  }
}

** 2 foreach() **
El primero va a iterar sobre el arreglo principal para acceder al Key y el segundo ya acceder a los mensajes.

* Los doble foreach() es porque nuestro arreglo tiene una llave que tenemos que identificar y después accedemos a los mensajes
*/
foreach ($alertas as $key => $mensajes) :
    foreach ($mensajes as $mensaje) :
?>

        <div class="alerta <?php echo $Key; ?>">
            <?php echo $mensaje; ?>
        </div>

<?php
    endforeach;
endforeach;
