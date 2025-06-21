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

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        header('Location: game.php');
        exit;
    } else {
        $error = "Usuario o contraseña incorrectos.";
    }
}
?>

<?php include 'inc/header.php'; ?>

<h2>Iniciar sesión</h2>
<?php if ($error): ?>
  <p class="error"><?php echo $error; ?></p>
<?php endif; ?>
<form method="POST" action="">
  <label>Usuario</label>
  <input type="text" name="username" required />
  <label>Contraseña</label>
  <input type="password" name="password" required />
  <button type="submit">Entrar</button>
</form>

<?php include 'inc/footer.php'; ?>