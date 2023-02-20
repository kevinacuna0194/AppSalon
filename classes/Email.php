<?php

namespace classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{
    public $nombre;
    public $email;
    public $token;

    public function __construct($nombre, $email, $token)
    {
        $this->nombre = $nombre;
        $this->email = $email;
        $this->token = $token;
    }

    /*
    object(classes\Email)#7 (3) {
    ["nombre"]=>
    string(5) "Kevin"
    ["email"]=>
    string(17) "correo@correo.com"
    ["token"]=>
    string(13) "63f2bd84809b1"
    }
    */

    // No pasamos informacion porque ya esta en la instancia del objeto ($email).
    public function enviarConfirmacion()
    {
        /** Crear el objeto para PHPMailer */
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '5b9ec453cd6e12';
        $mail->Password = '169fc04abc29c3';

        /** Destinatarios */
        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $mail->Subject = 'Confirma tu cuenta';

        /** Set HTML */
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        /** Contenido */
        $mail->Body = "
        <html>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');
                h2 {
                    font-size: 25px;
                    font-weight: 500;
                    line-height: 15px;
                    display: block;
                }
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #ffffff;
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 20px;
                }
                p {
                    line-height: 18px;
                }
                a {
                    position: relative;
                    z-index: 0;
                    display: inline-block;
                    margin: 5px 0;
                }
                a button {
                    padding: 0.7em 2em;
                    font-size: 16px !important;
                    font-weight: 500;
                    background: #000000;
                    color: #ffffff;
                    border: none;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition-property: background-color;
                    transition-duration: .3s;
                }
                a button:hover {
                    background-color: lighten(#000000, 10%);
                    cursor: pointer;
                }
                p span {
                    font-size: 12px;
                }
                div p{
                    border-bottom: 1px solid #000000;
                    border-top: none;
                }
            </style>
            <body>
                <h1>AppSalon</h1>
                <h2><b>Hola <u>" . $this->email . "</u></b></h2>
                <h2>¡Gracias por registrarte!</h2>
                <p>Por favor confirma tu correo electrónico para que puedas comenzar a disfrutar de todos los servicios de AppSalon</p>
                <a href='http://localhost:3000/confirmar-cuenta?token=" . $this->token . "'><button>Verificar</button></a>
                <p>Si tú no solicitaste este cambio, puedes ignora este correo electrónico.</p>
                <div><p></p></div>
                <p><span>Este correo electrónico fue enviado desde una dirección noreply. Por favor no respondas a este mensaje.</span></p>
            </body>
        </html>";

        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        /** Enviar email */
        $mail->send();
        /*
        if ($mail) {
            echo "Message has been sent";
        } else {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
        */
    }

    public function enviarInstrucciones()
    {
        /** Crear el objeto para PHPMailer */
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '5b9ec453cd6e12';
        $mail->Password = '169fc04abc29c3';

        /** Destinatarios */
        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $mail->Subject = 'Reestablece tu Password';

        /** Set HTML */
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        /** Contenido */
        $mail->Body = "
        <html>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');
                h2 {
                    font-size: 25px;
                    font-weight: 500;
                    line-height: 20px;
                    display: block;
                }
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #ffffff;
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 20px;
                }
                p {
                    line-height: 18px;
                }
                a {
                    position: relative;
                    z-index: 0;
                    display: inline-block;
                    margin: 5px 0;
                }
                a button {
                    padding: 0.7em 2em;
                    font-size: 16px !important;
                    font-weight: 500;
                    background: #000000;
                    color: #ffffff;
                    border: none;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition-property: background-color;
                    transition-duration: .3s;
                }
                a button:hover {
                    background-color: lighten(#000000, 10%);
                    cursor: pointer;
                }
                p span {
                    font-size: 12px;
                }
                div p{
                    border-bottom: 1px solid #000000;
                    border-top: none;
                }
            </style>
            <body>
                <h1>AppSalon</h1>
                <h2><b>Hola <u>" . $this->nombre . "</u></b></h2>
                <h2>Solicitaste reestablecer tu Password</h2>
                <p>Sigue el siguiente enlace:</p>
                <a href='http://localhost:3000/recuperar?token=" . $this->token . "'><button>Reestablecer</button></a>
                <p>Si tú no solicitaste este cambio, puedes ignora este correo electrónico.</p>
                <div><p></p></div>
                <p><span>Este correo electrónico fue enviado desde una dirección noreply. Por favor no respondas a este mensaje.</span></p>
            </body>
        </html>";

        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        /** Enviar email */
        $mail->send();
        /*
        if ($mail) {
            echo "Message has been sent";
        } else {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
        */
    }
}
