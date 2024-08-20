<?php
session_start();

// Conectar con la base de datos
$host = "localhost";
$user = "root";  // Cambia esto si tienes un usuario diferente
$pass = "7924";      // Cambia esto si tienes una contraseña configurada
$db = "pbroker"; // Nombre de tu base de datos

$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el correo y la contraseña del formulario
$correo = $_POST['correo'];
$password = $_POST['password'];

// Consulta para verificar el usuario en la base de datos
$sql = "SELECT * FROM usuarios WHERE Correo = '$correo' AND Documento = '$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Usuario encontrado: iniciar sesión
    $_SESSION['auth'] = true;
    $_SESSION['user'] = $correo; // Guarda el correo del usuario en la sesión
    header("Location: /index.html"); // Redirige a una página alternativa
} else {
    // Usuario no encontrado: redirigir a inicio de sesión con error
    header("Location: /Inicio_Sesion/frm_index_inicio.html?error=1");
}

$conn->close();
?>
