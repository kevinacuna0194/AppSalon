<?php

namespace Controllers;

use MVC\Router;
use Model\Usuario;
use Classes\Email;

class LoginController
{
    public static function login(Router $router)
    {
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $auth = new Usuario($_POST);

            $alertas = $auth->validarLogin();

            if (empty($alertas)) {
                /** Comprobar que exista el usuario */
                $usuario = Usuario::where('email', $auth->email);

                if ($usuario) {
                    /** Verificar Password */
                    if ($usuario->comprobarPasswordAndVerificado($auth->password))  {
                        echo "Iniciando Sesion...";
                    }
                } else {
                    Usuario::setAlerta('error', 'Usuario no encontrado');
                }
            }
        }

        $alertas = Usuario::getAlertas();

        $router->render('auth/login', [
            'alertas' => $alertas
        ]);
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

                    $email->enviarConfirmacion();

                    /** Crear el usuario */
                    $resultado = $usuario->guardar();

                    if ($resultado) {
                        header('location: /mensaje');
                    }
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

    public static function mensaje(Router $router)
    {
        $router->render('auth/mensaje');
    }

    public static function confirmar(Router $router)
    {
        $alertas = [];

        $token = s($_GET['token']);

        $usuario = Usuario::where('token', $token);

        if (empty($usuario)) {
            /** Mostrar mensaje de error */
            Usuario::setAlerta('error', 'Token no válido');
        } else {
            /** Modificar usuario confirmado */
            $usuario->confirmado = '1';
            $usuario->token = null;
            $usuario->guardar();

            Usuario::setAlerta('exito', 'Cuenta comprobada Correctamente');
        }

        /** Obtener alertas */
        $alertas = Usuario::getAlertas();

        /** Renderizar la vista */
        $router->render('auth/confirmar-cuenta', [
            'alertas' => $alertas
        ]);
    }
}
