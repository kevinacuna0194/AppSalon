<?php

namespace Controllers;

use MVC\Router;
use Model\Usuario;

class LoginController
{
    public static function login(Router $router)
    {
        $router->render('auth/login', []);
    }

    public static function crear(Router $router)
    {
        $usuario = new Usuario();

        /** Alertas vacias */
        $alertas = $usuario::getAlertas();

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario->sincronizar($_POST);

            $alertas = $usuario->validarNuevaCuenta();

            /** Revisar que $alertas este vacio */
            if(empty($alertas)) {
                echo "Pasaste la validación...";
            }
        }

        $router->render('auth/crear-cuenta', [
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function olvide(Router $router)
    {
        $router->render('auth/olvide-password', []);
    }

    public static function logout()
    {
        echo "Desde Logout...";
    }

    public static function recuperar()
    {
        echo "Desde Recuperar...";
    }
}
