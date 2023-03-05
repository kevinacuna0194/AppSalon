<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
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
        /** Almacena la Cita y devuelve el ID */
        $cita = new Cita($_POST);

        $resultado = $cita->guardar();
        $id = $resultado['id'];

        /** Almacena los servicios con el ID de la cita */
        $idServicios = explode(",", $_POST['servicios']);

        foreach ($idServicios as $idServicio) {
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio
            ];

            $citaServicio = new citaServicio($args);
            $citaServicio->guardar();
        }

        /** json_encode() lo va a convertir a JSON Este arreglo asociativo lo puedo leer en JavaScript, porque un arreglo asociativo es un equivalente a un objeto en JavaScript. */
        echo json_encode(['resultado' => $resultado]);
    }

    public static function eliminar()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $id = $_POST['id'];

            $cita = Cita::find($id);

            $cita->eliminar();

            /** Redireccionar a la misma página desde donde veníamos */
            header('Location:' . $_SERVER["HTTP_REFERER"]);
        }
    }
}
