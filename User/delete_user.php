<?php
session_start();

// Verificar si el usuario está autenticado como administrador
if (!isset($_SESSION['auth']) || $_SESSION['auth'] !== true || $_SESSION['role'] !== 'admin') {
    header("Location: /Inicio_Sesion/frm_index_inicio.html");
    exit();
}

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

// Obtener el ID del usuario a eliminar de manera segura
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // Preparar la declaración SQL para evitar inyecciones SQL
    $stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        header("Location: admin.php"); // Redirigir después de eliminar
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
} else {
    echo "ID de usuario no válido.";
}

$conn->close();
?>
