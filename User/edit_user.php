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
$pass = "";      // Cambia esto si tienes una contraseña configurada
$db = "pbroker"; // Nombre de tu base de datos

$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el ID del usuario a editar
$id = $_GET['id'];

// Obtener los detalles del usuario
$sql = "SELECT * FROM usuarios WHERE id = $id";
$result = $conn->query($sql);
$user = $result->fetch_assoc();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos del formulario
    $correo = $_POST['correo'];
    $nombre = $_POST['nombre'];
    $rol = $_POST['rol'];

    // Actualizar la información del usuario
    $update_sql = "UPDATE usuarios SET correo='$correo', nombre='$nombre', rol='$rol' WHERE id=$id";
    if ($conn->query($update_sql) === TRUE) {
        header("Location: admin.php"); // Redirigir después de actualizar
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuario</title>
    <link rel="stylesheet" href="stylesAdmin.css"> <!-- Asegúrate de vincular tu archivo CSS -->
</head>
<body>
    <header>
        <nav>
            <a href="admin.php">Administrar Usuarios</a>
            <a href="/Inicio_Sesion/frm_index_inicio.html">Cerrar Sesión</a>
        </nav>
    </header>

    <main>
        <h1>Editar Usuario</h1>
        <form method="POST">
            <label for="correo">Correo:</label>
            <input type="email" id="correo" name="correo" value="<?php echo htmlspecialchars($user['correo']); ?>" required>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value="<?php echo htmlspecialchars($user['nombre']); ?>" required>
            <label for="rol">Rol:</label>
            <input type="text" id="rol" name="rol" value="<?php echo htmlspecialchars($user['rol']); ?>" required>
            <button type="submit">Guardar Cambios</button>
        </form>
    </main>
</body>
</html>
