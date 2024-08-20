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

// Obtener la lista de usuarios
$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Gestión de Usuarios</title>
    <link rel="stylesheet" href="stylesAdmin.css"> <!-- Vincular el CSS -->
    <link rel="stylesheet" href="stylesError.css">
</head>
<body>
    <header>
        <nav class="nav-main">
            <img src="img/Grand.png" alt="TechNews LOGO" class="nav-brand" />
            <ul class="nav-menu">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="admin.php">Administrar Usuarios</a></li>
            </ul>
            <ul class="nav-menu-right">
                <li><a href="logout.php">Cerrar Sesión</a></li>
            </ul>
        </nav>
        <hr />
    </header>

    <main>
        <h1>Administrar Usuarios</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($result->num_rows > 0): ?>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $row['id']; ?></td>
                            <td><?php echo $row['nombre']; ?></td>
                            <td><?php echo $row['correo']; ?></td>
                            <td>
                                <a href="edit_user.php?id=<?php echo $row['id']; ?>" class="btn">Editar</a>
                                <a href="delete_user.php?id=<?php echo $row['id']; ?>" class="btn" onclick="return confirm('¿Estás seguro de que deseas eliminar este usuario?');">Eliminar</a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="4">No hay usuarios registrados.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </main>

    <script src="admin.js"></script>
</body>
</html>

<?php $conn->close(); ?>
