<?php
require_once 'inc/auth.php';
requireLogin();
?>

<?php include 'inc/header.php'; ?>

<h2>Juego Bomberman</h2>
<div id="game-board"></div>

<script src="assets/js/game.js"></script>

<?php include 'inc/footer.php'; ?>