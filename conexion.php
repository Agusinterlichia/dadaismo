<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Usa 127.0.0.1 (no "localhost") para evitar plugins/sockets raros
$DB_HOST = 'localhost';
$DB_USER = 'root';        // o 'root' si lo prefieres
$DB_PASS = '';     // tu clave real
$DB_NAME = 'martes';

$conexion = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
$conexion->set_charset('utf8mb4');
