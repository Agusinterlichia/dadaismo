# Sistema de Autenticación - Dadaísmo

## Archivos Creados

### 1. Base de Datos
- **setup_usuarios.sql**: Script SQL para crear la tabla `usuarios` en la base de datos `martes`

### 2. Archivos PHP de Autenticación
- **login.php**: Formulario de inicio de sesión con validación
- **registro.php**: Formulario de registro de nuevos usuarios
- **salir.php**: Cierra la sesión del usuario
- **session_check.php**: Verifica el estado de sesión (incluido en otras páginas)
- **index.php**: Página principal con soporte de sesiones

## Instalación

### Paso 1: Crear la tabla de usuarios
Ejecuta el script SQL en tu base de datos MySQL:

```bash
mysql -u root -p martes < setup_usuarios.sql
```

O ejecuta manualmente en phpMyAdmin:

```sql
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Paso 2: Verificar la configuración de la base de datos
Asegúrate de que el archivo `conexion.php` tenga la configuración correcta:
- Host: localhost
- Usuario: root
- Contraseña: (vacía o la que uses)
- Base de datos: martes

### Paso 3: Configurar el servidor
El sistema requiere un servidor PHP (XAMPP, WAMP, MAMP, etc.) con MySQL.

## Funcionalidades

### Registro de Usuarios
- Formulario en `registro.php`
- Validación de campos (nombre, email, contraseña)
- Verificación de email único
- Contraseña hasheada con `password_hash()`
- Inicio de sesión automático después del registro

### Inicio de Sesión
- Formulario en `login.php`
- Validación de credenciales
- Uso de `password_verify()` para verificar contraseñas
- Creación de sesión PHP

### Gestión de Sesiones
- Muestra el nombre del usuario en la navegación
- Enlaces dinámicos (Login/Registro o Cerrar Sesión)
- Protección contra acceso no autorizado

### Cierre de Sesión
- Destruye la sesión completamente
- Elimina cookies de sesión
- Redirecciona a la página principal

## Uso

1. **Registrarse**: Visita `registro.php` para crear una cuenta nueva
2. **Iniciar sesión**: Visita `login.php` para entrar con tu cuenta
3. **Navegar**: Una vez logueado, verás tu nombre en el menú de navegación
4. **Cerrar sesión**: Haz clic en "Cerrar Sesión" en el menú

## Seguridad

- Contraseñas hasheadas con `password_hash()` (bcrypt)
- Uso de prepared statements para prevenir SQL injection
- Validación de entrada en el servidor
- Limpieza de output con `htmlspecialchars()`
- Gestión segura de sesiones

## Notas

- El sistema usa sesiones PHP nativas
- Las contraseñas deben tener al menos 6 caracteres
- Los emails deben ser únicos en la base de datos
- La página principal ahora es `index.php` en lugar de `index.html`
