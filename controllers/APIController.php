<?php

namespace Controllers;

use Model\Cita;
use Model\Servicio;

class APIController
{
    public static function index()
    {
        $servicios = Servicio::all();

        /** Convertir arreglo a JSON */
        echo json_encode($servicios);

        /*
    array(11) {
        [0]=>
        object(Model\Servicio)#6 (3) {
        ["id"]=>
        string(1) "1"
        ["nombre"]=>
        string(22) "Corte de Cabello Mujer"
        ["precio"]=>
        string(5) "90.00"
    }

    [
    {
    id: "1",
    nombre: "Corte de Cabello Mujer",
    precio: "90.00"
    },

    */
    }

    public static function guardar()
    {
        $cita = new Cita($_POST);

       $resultado = $cita->guardar();

        /** json_encode() lo va a convertir a JSON Este arreglo asociativo lo puedo leer en JavaScript, porque un arreglo asociativo es un equivalente a un objeto en JavaScript. */
        echo json_encode($resultado);
        /** {datos: {…}}
         * datos: 
         * fecha: "2023-02-27"
         * hora: "16:11"
         * nombre: " Kevin Acuña"
         * [[Prototype]]: Object
         * [[Prototype]]: Object
         */
    }
}
