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
                    if ($usuario->comprobarPasswordAndVerificado($auth->password)) {
                        /** Autenticar al usuario */
                        session_start();

                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre . " " . $usuario->apellido;
                        $_SESSION['email'] = $usuario->email;
                        $_SESSION['login'] = true;

                        /** Redireccionamiento */
                        // debuguear($usuario->admin); 0 / 1
                        if ($usuario->admin === "1") {
                            $_SESSION['admin'] = $usuario->admin ?? null;
                            header('Location: /admin');
                        } else {
                            header('Location: /cita');
                        }
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

    public static function olvide(Router $router)
    {
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $auth = new Usuario($_POST);

            $alertas = $auth->validarEmail();

            if (empty($alertas)) {
                $usuario = Usuario::where('email', $auth->email);

                if ($usuario && $usuario->confirmado === "1") {
                    /** Existe y está confirmado 
                     * Generar Token
                     */
                    $usuario->crearToken();

                    /** Actualizar en la BD */
                    $usuario->guardar();

                    $email = new Email($usuario->nombre, $usuario->email, $usuario->token);

                    $email->enviarInstrucciones();

                    /** Alerta de exito */
                    Usuario::setAlerta('exito', 'Revisa tu email');
                } else {
                    Usuario::setAlerta('error', 'El Usuario no existe o no está confirmado');
                }
            }
        }

        $alertas = Usuario::getAlertas();

        $router->render('auth/olvide-password', [
            'alertas' => $alertas
        ]);
    }

    public static function recuperar(Router $router)
    {
        $alertas = [];
        $error = false;

        $token = s($_GET['token']);

        /** Buscar usuario por su Token */
        $usuario = Usuario::where('token', $token);

        if (empty($usuario)) {
            // null
            Usuario::setAlerta('error', 'Token No Válido');
            $error = true;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            /** Leer el nuevo password */
            $password = new Usuario($_POST);

            $alertas = $password->validarPassword();

            if (empty($alertas)) {
                $usuario->password = null;

                $usuario->password = $password->password;
                $usuario->hashPassword();
                $usuario->token = null;

                $resultado = $usuario->guardar();

                if ($resultado) {
                    header('Location: /');
                }
            }
        }

        $alertas = Usuario::getAlertas();

        $router->render('auth/recuperar-password', [
            'alertas' => $alertas,
            'error' => $error
        ]);
    }

    public static function logout()
    {
        session_start();

        $_SESSION = [];

        header('Location: /');
    }

    public static function mensaje(Router $router)
    {
        $router->render('auth/mensaje');
    }
}
