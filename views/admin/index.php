<h1 class="nombre-pagina">Panel de Administración</h1>

<?php include_once __DIR__ . '/../templates/barra.php' ?>

<h2>Buscar Citas</h2>

<div class="busqueda">
    <form class="formulario">
        <div class="campo">
            <label for="fecha">Fecha</label>
            <input type="date" id="fecha" name="fecha">
        </div>
    </form>
</div>

<div class="citas-admin">
    <ul class="citas">
        <?php
        $idCita = 0;
        foreach ($citas as $key => $cita) {
        ?>
            <?php if ($idCita != $cita->id) {
                $total = 0;
                /** Inicia en 0 una sola vez hasta que cambia el ID de cita */
            ?>
                <li>
                    <p>ID: <span><?php echo $cita->id; ?></span></p>
                    <p>Hora: <span><?php echo $cita->hora; ?></span></p>
                    <p>Cliente: <span><?php echo $cita->cliente; ?></span></p>
                    <p>Email: <span><?php echo $cita->email; ?></span></p>
                    <p>Teléfono: <span><?php echo $cita->telefono; ?></span></p>

                    <h3>Servicios</h3>
                <?php
                $idCita = $cita->id;
            }
            /** Fin de if */
            $total += $cita->precio;
                ?>
                <p class="servicio"><?php echo $cita->servicio . " $" . $cita->precio; ?></p>

                <?php
                $actual = $cita->id;
                /** Índice en el arreglo de la BD */
                $proximo = $citas[$key + 1]->id ?? 0;

                /** Detectar que estamos en el último elemento */
                if (esUltimo($actual, $proximo)) { ?>
                    <!-- Mostrar el total a pagar -->
                    <p class="total">Total: <span>$ <?php echo $total ?></span></p>
            <?php }
            }
            /** fin de foreach */ ?>
    </ul>
</div>