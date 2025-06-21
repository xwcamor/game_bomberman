<?php
require_once 'inc/db.php';
session_start();

if (isset($_SESSION['user_id'])) {
    header('Location: game.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    $password_confirm = $_POST['password_confirm'];

    if ($password !== $password_confirm) {
        $error = "Las contraseñas no coinciden.";
    } else {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        try {
            $stmt->execute([$username, $hash]);
            header('Location: index.php');
            exit;
        } catch (PDOException $e) {
            $error = "El usuario ya existe.";
        }
    }
}
?>

<?php include 'inc/header.php'; ?>

<h2>Registrarse</h2>
<?php if ($error): ?>
  <p class="error"><?php echo $error; ?></p>
<?php endif; ?>
<form method="POST" action="">
  <label>Usuario</label>
  <input type="text" name="username" required />
  <label>Contraseña</label>
  <input type="password" name="password" required />
  <label>Confirmar contraseña</label>
  <input type="password" name="password_confirm" required />
  <button type="submit">Registrar</button>
</form>

<?php include 'inc/footer.php'; ?>