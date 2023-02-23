<?php

namespace Controllers;

use Model\Servicio;

class APIController
{
    public static function index()
    {
        $servicios = Servicio::all();

        /** Convertir arreglo a JSON */
        json_encode($servicios);

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
}
