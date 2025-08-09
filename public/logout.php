<?php
session_start();
$_SESSION = [];
if (ini_get("session.use_cookies")) {
  $params = session_get_cookie_params();
  setcookie(session_name(), '', time() - 42000,
    $params["path"], $params["domain"],
    $params["secure"], $params["httponly"]
  );
}
session_destroy();
header('Location: login.php');
exit;

// script para criar usuário (ex: src/create_user.php - rodar via CLI)
require 'db.php';
$name = 'Admin';
$email = 'admin@exemplo.com';
$pass = 'SenhaMuitoForte123!';
$hash = password_hash($pass, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
$stmt->execute([$name, $email, $hash, 'admin']);
echo "Usuário criado\n";
