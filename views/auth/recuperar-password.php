<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Coloca tu nuevo Password a continuación</p>

<?php include_once __DIR__ . "/../templates/alertas.php" ?>

<?php if ($error) : ?>
    <div class="acciones">
        <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una</a>
        <a href="/olvide">¿Olvidaste tu Password?</a>
    </div>
    <?php return null ?>
<?php endif; ?>

<form class="formulario" method="POST">
    <div class="campo">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Tu Nuevo Password" />
    </div>

    <input type="submit" class="boton" value="Guardar Nuevo Password" onclick=mostrarSpinner() />

    <div id="resultado" class="resultado"></div>
</form>

<div class="acciones">
    <a href="/">¿Ya tienes cuenta? Iniciar Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una</a>
</div>