<?php
session_start();
require_once('conexion.php');

// Redirect if already logged in
if (isset($_SESSION['usuario_id'])) {
    header('Location: index.php');
    exit();
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    if (!empty($email) && !empty($password)) {
        $stmt = $conexion->prepare("SELECT id, nombre, email, password FROM usuarios WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $resultado = $stmt->get_result();
        
        if ($resultado->num_rows == 1) {
            $usuario = $resultado->fetch_assoc();
            if (password_verify($password, $usuario['password'])) {
                $_SESSION['usuario_id'] = $usuario['id'];
                $_SESSION['usuario_nombre'] = $usuario['nombre'];
                $_SESSION['usuario_email'] = $usuario['email'];
                header('Location: index.php');
                exit();
            } else {
                $error = 'Email o contraseña incorrectos.';
            }
        } else {
            $error = 'Email o contraseña incorrectos.';
        }
        $stmt->close();
    } else {
        $error = 'Por favor, completa todos los campos.';
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - Dadaísmo</title>
    <link rel="stylesheet" href="css/estilos.css">
    <link href="https://fonts.googleapis.com/css?family=Bevan|Lato|Oswald:400,700" rel="stylesheet">
    <style>
        .auth-container {
            max-width: 500px;
            margin: 50px auto;
            padding: 40px;
            background-color: #F2E9D8;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .auth-container h1 {
            text-align: center;
            margin-bottom: 30px;
            color: #3B2F2F;
            font-family: 'Bevan', cursive;
        }
        
        .auth-form {
            display: flex;
            flex-direction: column;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #3B2F2F;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #3B2F2F;
            border-radius: 5px;
            font-size: 16px;
            font-family: 'Lato', sans-serif;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #D4A574;
        }
        
        .btn-submit {
            background-color: #3B2F2F;
            color: #F5F3E7;
            padding: 14px 30px;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
            font-family: 'Oswald', sans-serif;
        }
        
        .btn-submit:hover {
            background-color: #4A3C3C;
        }
        
        .error-message {
            background-color: #ffcccc;
            color: #cc0000;
            padding: 12px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .auth-links {
            text-align: center;
            margin-top: 20px;
        }
        
        .auth-links a {
            color: #3B2F2F;
            text-decoration: underline;
        }
        
        .auth-links a:hover {
            color: #D4A574;
        }
    </style>
</head>
<body>
    <header class="site-header">
        <div class="header-top">
            <div class="logo">
                <a href="index.php"><img src="img/Logo 1.png" alt="Logo Dadaísta"></a>
            </div>
            <nav class="main-navigation">
                <ul>
                    <li><a href="index.php">Esto no es una home</a></li>
                    <li><a href="historia.html">Dadaísmo (si es que existe)</a></li>
                    <li><a href="artistas.html">Los culpables de todo esto</a></li>
                    <li><a href="obras.html">Objetos que ya existian pero ahora son arte</a></li>
                    <li><a href="poesia.html">Perdes el tiempo aca</a></li>
                    <li><a href="contacto.html">Vos que pensas? (Aunque no importe)</a></li>
                </ul>
            </nav>
        </div>
        <img src="img/linea_irregular.png" alt="Línea divisoria irregular" class="header-line-image">
    </header>

    <main class="main-content">
        <div class="auth-container">
            <h1>Iniciar Sesión</h1>
            
            <?php if ($error): ?>
                <div class="error-message"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>
            
            <form method="POST" action="login.php" class="auth-form">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                
                <button type="submit" class="btn-submit">Iniciar Sesión</button>
            </form>
            
            <div class="auth-links">
                <p>¿No tienes cuenta? <a href="registro.php">Regístrate aquí</a></p>
                <p><a href="index.php">Volver al inicio</a></p>
            </div>
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
</body>
</html>
