<?php

namespace classes;

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

    
}
