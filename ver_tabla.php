<?php
include('conexion.php');

$consulta = mysqli_query($conexion, "SELECT * FROM artistas");

if (mysqli_num_rows($consulta) > 0) {
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>Nombre</th><th>Bio</th></tr>";
    while ($fila = mysqli_fetch_assoc($consulta)) {
        echo "<tr>";
        echo "<td>" . $fila['id'] . "</td>";
        echo "<td>" . $fila['nombre'] . "</td>";
        echo "<td>" . $fila['bio'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "No hay datos en la tabla 'artistas'.";
}

mysqli_free_result($consulta);
mysqli_close($conexion);
?>