# Guía Rápida - Sistema de Autenticación Dadaísmo

## 🚀 Inicio Rápido

### Paso 1: Configurar la Base de Datos

Ejecuta el siguiente comando en tu terminal (dentro de XAMPP o tu servidor MySQL):

```bash
mysql -u root -p martes < setup_usuarios.sql
```

O copia y pega el contenido de `setup_usuarios.sql` en phpMyAdmin.

### Paso 2: Verificar Conexión

Asegúrate de que `conexion.php` tenga la configuración correcta:
- Host: `localhost`
- Usuario: `root`
- Contraseña: (deja vacío o pon tu contraseña)
- Base de datos: `martes`

### Paso 3: Iniciar el Servidor

Si usas XAMPP:
1. Inicia Apache
2. Inicia MySQL
3. Abre tu navegador en: `http://localhost/Agustina/UP/Dadaismo/`

### Paso 4: Probar el Sistema

1. Ve a `http://localhost/tu-ruta/registro.php`
2. Crea una cuenta nueva
3. Serás redirigido automáticamente a la página principal
4. Verás tu nombre en el menú de navegación
5. Haz clic en "Cerrar Sesión" para salir

## 📋 Archivos Principales

| Archivo | Descripción |
|---------|-------------|
| `login.php` | Formulario de inicio de sesión |
| `registro.php` | Formulario de registro de usuarios |
| `salir.php` | Cerrar sesión |
| `index.php` | Página principal (reemplaza a index.html) |
| `session_check.php` | Verifica estado de sesión |
| `setup_usuarios.sql` | Script para crear la tabla |

## 🔑 Características de Seguridad

✅ Contraseñas encriptadas con bcrypt
✅ Protección contra SQL Injection
✅ Validación de datos
✅ Sesiones seguras
✅ Emails únicos

## 🎨 Integración con el Sitio

El sistema está completamente integrado con el diseño Dadaísta:
- Colores coherentes
- Tipografía consistente
- Navegación unificada
- Footer y header originales

## ⚠️ Notas Importantes

1. La página principal ahora es `index.php` (no `index.html`)
2. Todas las páginas HTML ahora enlazan a `index.php`
3. El menú muestra opciones diferentes si estás logueado:
   - **Sin login**: "Iniciar Sesión" y "Registro"
   - **Con login**: "Cerrar Sesión (Tu Nombre)"

## 🐛 Solución de Problemas

### Error de conexión a MySQL
- Verifica que MySQL esté corriendo en XAMPP
- Revisa las credenciales en `conexion.php`

### La tabla no existe
- Ejecuta el script `setup_usuarios.sql`
- Verifica que estás usando la base de datos `martes`

### No aparece el formulario
- Verifica que Apache esté corriendo
- Asegúrate de estar accediendo a los archivos `.php`, no `.html`

## 📞 Flujo de Usuario

```
1. Usuario visita el sitio (index.php)
2. Ve "Iniciar Sesión" o "Registro" en el menú
3. Si no tiene cuenta → registro.php
4. Si tiene cuenta → login.php
5. Después de autenticarse → redirigido a index.php
6. Navega el sitio viendo su nombre en el menú
7. Cuando termina → clic en "Cerrar Sesión"
```

## 💡 Próximos Pasos Posibles

- Agregar recuperación de contraseña
- Implementar perfiles de usuario
- Añadir roles (admin, usuario)
- Crear contenido exclusivo para usuarios registrados
- Agregar avatar de usuario

---

¡El sistema está listo para usar! 🎉
