<?php

namespace Controllers;

use MVC\Router;
use Model\Usuario;
use Classes\Email;

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
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario->sincronizar($_POST);

            $alertas = $usuario->validarNuevaCuenta();

            /** Revisar que $alertas este vacio */
            if (empty($alertas)) {
                /** Verificar que el usuario no este registrado */
                $resultado = $usuario->existeUsuario();

                if ($resultado->num_rows) {
                    // Vuelvo a crear la variable porque ya pase la validación. L apaso a la vista.
                    $alertas = Usuario::getAlertas();
                } else {
                    /** Hashear Password */
                    $usuario->hashPassword();

                    /** Generar Token único */
                    $usuario->crearToken();

                    /** Instanciar clase helper. Enviar email */
                    $email = new Email($usuario->nombre, $usuario->email, $usuario->token);

                    debuguear($email);
                }
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
