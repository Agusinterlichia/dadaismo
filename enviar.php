<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Enviar</title>
</head>

<body>
<?php

//se arma el array POST
$nombre=$_POST['nombre'];
$email=$_POST['email'];
$comentario=$_POST["comentario"];

$destino="mail@mail.com";
$asunto="Contacto desde el sitio";
$mensaje="Nombre: ".$nombre." Email: ".$email." Mensaje: ".$comentario;

$header="From: ".$nombre."<".$email.">";

$enviado = mail($destino,$asunto,$mensaje,$header);

if($enviado == true){
	echo "Su correo ha sido enviado.";
}else{
	echo "Hubo un error en el envio del mail.";
}

$conexion = mysqli_connect("localhost","root","", "contactos") or die('No se pudo conectar al servidor');

$consulta = mysqli_query($conexion, "INSERT INTO contactos (nombre,email,comentario) VALUES ( '$nombre','$email','$comentario')") or die(mysqli_error($conexion));



?>
</body>
</html>