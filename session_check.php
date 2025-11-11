<?php
// This file checks if a user is logged in and displays appropriate links
session_start();

$is_logged_in = isset($_SESSION['usuario_id']);
$usuario_nombre = $is_logged_in ? $_SESSION['usuario_nombre'] : '';
?>
