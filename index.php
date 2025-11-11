<?php include('session_check.php'); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dadaísmo: El anti-arte</title>
    <link rel="stylesheet" href="css/estilos.css">
    <link href="https://fonts.googleapis.com/css?family=Bevan|Lato|Oswald:400,700" rel="stylesheet">
</head>
<body class="home-page">

    <header class="site-header">
        <div class="header-top">
            <div class="logo">
                <a href="index.php"><img src="img/Logo 1.png" alt="Logo Dadaísta"></a>
            </div>
            <nav class="main-navigation">
                <ul>
                    <li class="current-page"><a href="index.php">Esto no es una home</a></li>
                    <li><a href="historia.html">Dadaísmo (si es que existe)</a></li>
                    <li><a href="artistas.html">Los culpables de todo esto</a></li>
                    <li><a href="obras.html">Objetos que ya existian pero ahora son arte</a></li>
                    <li><a href="poesia.html">Perdes el tiempo aca</a></li>
                    <li><a href="contacto.html">Vos que pensas? (Aunque no importe)</a></li>
                    <?php if ($is_logged_in): ?>
                        <li><a href="salir.php">Cerrar Sesión (<?php echo htmlspecialchars($usuario_nombre); ?>)</a></li>
                    <?php else: ?>
                        <li><a href="login.php">Iniciar Sesión</a></li>
                        <li><a href="registro.php">Registro</a></li>
                    <?php endif; ?>
                </ul>
            </nav>
            <div class="search-container">
                <form id="buscador" action="resultados_buscar.html" method="get" class="buscador">
                    <input type="text" name="q" placeholder="Buscar artistas u obras…" required />
                    <button type="submit">Buscar</button>
                </form>
            </div>
        </div>
        <img src="img/linea_irregular.png" alt="Línea divisoria irregular" class="header-line-image">
    </header>

    <main class="main-content">
        <div class="hero-image-container">
            <img src="img/imagen central.png" alt="Esto no es una home">
        </div>
        <div class="button-container">
            <a href="#" class="image-button" id="no-entres-btn">
                <img src="img/no entres.png" alt="Botón No Entres">
                <div class="overlay">
                    <p class="overlay-text">¿Creías que iba a decir algo?</p>
                </div>
            </a>
            <a href="historia.html" class="image-button">
                <img src="img/entrar igual.png" alt="Botón Entrar Igual">
                <div class="overlay">
                    <p class="overlay-text">Nada tiene sentido, seguí scrolleando.</p>
                </div>
            </a>
        </div>
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

    <!-- Modal Structure -->
    <div id="dada-modal" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2 class="modal-title">¡Te dije que no entres!</h2>
            <img src="img/boca.png" alt="Labios gritando" class="modal-image">
        </div>
    </div>

    <script src="js/index.js"></script>
    <script src="js/search.js" defer></script>
</body>
</html>