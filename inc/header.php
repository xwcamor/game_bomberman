<?php
require_once 'auth.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Bomberman Moderno</title>
<link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
<header>
  <nav>
    <a href="game.php">Juego</a>
    <?php if (isLoggedIn()): ?>
      <span>Hola, <?php echo htmlspecialchars($_SESSION['username']); ?></span>
      <a href="logout.php">Cerrar sesión</a>
    <?php else: ?>
      <a href="index.php">Iniciar sesión</a>
      <a href="register.php">Registrarse</a>
    <?php endif; ?>
  </nav>
</header>
<main></main>