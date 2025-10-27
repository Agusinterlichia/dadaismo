<!DOCTYPE html>
<html lang="es">
<head>
    <base href="/Agustina/UP/Dadaismo/">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dadaísmo: Artistas</title>
    <link rel="stylesheet" href="css/estilos.css">
    <link href="https://fonts.googleapis.com/css?family=Bevan|Lato|Oswald:400,700" rel="stylesheet">
    <style>
        /* Refuerzo para centrar y normalizar la grilla de resultados del buscador */
        .resultados-wrap { max-width: 980px; margin: 0 auto; }
        .resultados-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        .resultados-grid .artist-card { margin: 0; } /* por si el bio ya trae .artist-card */
        .resultado-bio { clear: both; }
        /* fallback por si algún bio deja floats abiertos */
        .resultado-bio::after { content: ""; display: block; clear: both; }

        /* Estado cerrado por defecto */
        .artist-details { display: none; }

        /* Estado abierto */
        .artist-details.is-open { display: block; }

        /* si creamos el detalle nosotros, lo ocultamos por defecto (opcional por compatibilidad) */
        .artist-details[data-autogen="1"] { display: none; }
    </style>
</head>
<body>

<header class="site-header">
    <div class="header-top">
        <div class="logo">
            <img src="img/Logo 1.png" alt="Logo Dadaísta">
        </div>
        <nav class="main-navigation">
            <ul>
                <li><a href="index.html">Esto no es una home</a></li>
                <li><a href="historia.html">Dadaísmo (si es que existe)</a></li>
                <li class="current-page"><a href="artistas.html">Los culpables de todo esto</a></li>
                <li><a href="obras.html">Objetos que ya existian pero ahora son arte</a></li>
                <li><a href="poesia.html">Perdes el tiempo aca</a></li>
                <li><a href="contacto.html">Vos que pensas? (Aunque no importe)</a></li>
            </ul>
        </nav>
        <div class="search-container">
            <form action="resultados_buscar.php" method="POST">
                <input type="search" id="searchInput" name="buscar" placeholder="Buscar algo (o nada)..." required>
                <button type="submit" style="display:none;"></button>
            </form>
        </div>
    </div>
    <img src="img/linea_irregular.png" alt="Línea divisoria irregular" class="header-line-image">
</header>

<main class="main-content artists-page">
    <h1>RESULTADOS DE TU BÚSQUEDA</h1>

    <?php
    include('conexion.php');

    $buscar = $_POST['buscar'];

    echo "<p>Su consulta: <em>" . htmlspecialchars($buscar, ENT_QUOTES, 'UTF-8') . "</em></p>";

    if ($buscar === '') {
        echo "<p>No escribiste nada... muy dadaísta de tu parte.</p>";
    } else {
        $stmt = $conexion->prepare("SELECT * FROM artistas WHERE nombre LIKE ?");
        $like = "%{$buscar}%";
        $stmt->bind_param("s", $like);
        $stmt->execute();
        $consulta = $stmt->get_result();

        echo '<div class="resultados-wrap">';
        echo "<p>Cantidad de Resultados: " . $consulta->num_rows . "</p>";
        echo '<div class="resultados-grid">';

        if ($consulta->num_rows === 0) {
            echo "<p>No encontramos nada con ese nivel de absurdo.</p>";
        } else {
            while ($row = $consulta->fetch_assoc()) {
                $nombre = htmlspecialchars($row['nombre'], ENT_QUOTES, 'UTF-8');
                $bioRaw = $row['bio']; // contiene HTML

                // ¿El bio YA trae tu estructura completa?
                $traeEstructura = (stripos($bioRaw, 'class="artist-card"') !== false)
                                  || (stripos($bioRaw, "class='artist-card'") !== false)
                                  || (stripos($bioRaw, 'class="artist-details"') !== false)
                                  || (stripos($bioRaw, 'class="leer-mas-btn"') !== false);

                echo '<section>';

                // Título visible en todos
                echo "<h2>{$nombre}</h2>";

                if ($traeEstructura) {
                    // Respetar HTML tal cual viene (como Tzara)
                    echo '<div class="resultado-bio">'.$bioRaw.'</div>';
                } else {
                    // Generar estructura estándar para que el botón funcione
                    echo '<div class="artist-card">';
                    // Si el bio trae una imagen o contenido largo, lo ponemos dentro de detalles
                    echo '<button class="leer-mas-btn" type="button" aria-expanded="false">Leer más</button>';
                    echo '<div class="artist-details" data-autogen="1">';
                    echo $bioRaw; // renderizamos el HTML guardado
                    echo '</div>';
                    echo '</div>';
                }

                echo '<hr style="margin:16px 0">';
                echo '</section>';
            }
        }

        echo '</div>'; // .resultados-grid
        echo '</article>';
        echo '</div>'; // .resultados-wrap

        $stmt->close();
        mysqli_close($conexion);
    }
    ?>
</main>

<footer class="site-footer">
    <div class="legal">
        <p>&copy; 2025 Anti-derechos reservados. El contenido puede o no tener sentido.</p>
    </div>
    <div class="social-icons">
        <a href="#" aria-label="X"><img src="img/twitter.png" alt="X"></a>
        <a href="#" aria-label="Instagram"><img src="img/instagram.png" alt="Instagram"></a>
        <a href="#" aria-label="YouTube"><img src="img/youtube.png" alt="YouTube"></a>
    </div>
</footer>

<script src="js/artistas.js" defer></script>
<script src="js/search.js" defer></script>

<!-- Delegación de eventos robusta para este archivo (por si artistas.js depende de otra estructura) -->
<script>
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.leer-mas-btn');
  if (!btn) return;

  // Buscamos el contenedor más lógico
  const scope = btn.closest('.artist-card, section, .resultado-bio') || document;

  // 1) Preferimos el hermano inmediato si es .artist-details
  let details = (btn.nextElementSibling && btn.nextElementSibling.classList?.contains('artist-details'))
    ? btn.nextElementSibling
    : scope.querySelector('.artist-details');

  if (!details) return;

  // Normalizamos: sacamos inline styles conflictivos
  details.style.removeProperty('display');

  const expanded = btn.getAttribute('aria-expanded') === 'true';
  const willOpen = !expanded;

  // Toggle accesibilidad + texto del botón
  btn.setAttribute('aria-expanded', String(willOpen));
  btn.textContent = willOpen ? 'Leer menos' : 'Leer más';

  // Toggle visual por clase (evita guerras de especificidad)
  details.classList.toggle('is-open', willOpen);
});
</script>

</body>
</html>