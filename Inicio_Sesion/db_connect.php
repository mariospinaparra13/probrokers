<?php
$servername = "localhost";
$username = "root";   // Cambia esto por tu usuario de MySQL
$password = "7924"; // Cambia esto por tu contraseña de MySQL
$dbname = "pbroker";         // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
