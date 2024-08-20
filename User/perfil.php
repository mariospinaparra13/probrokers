<?php
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['auth']) || $_SESSION['auth'] !== true) {
    header("Location: /Inicio_Sesion/frm_index_inicio.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil de Usuario</title>
</head>
<body>
    <h1>Bienvenido, <?php echo htmlspecialchars($_SESSION['user']); ?>!</h1>
    <p>Has iniciado sesión exitosamente.</p>
    <a href="/Inicio_Sesion/frm_index_inicio.html">Cerrar Sesión</a>
</body>
</html>
