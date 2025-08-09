<?php
// login.php
require_once __DIR__ . '/../src/db.php';

session_set_cookie_params([
  'lifetime' => 0,
  'path' => '/',
  'domain' => '', // opcional: example.com
  'secure' => true,     // HTTPS obrigatória em produção
  'httponly' => true,
  'samesite' => 'Lax'
]);
session_start();

function gen_csrf() {
  if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
  }
  return $_SESSION['csrf_token'];
}
function verify_csrf($t) {
  return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $t);
}

$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $token = $_POST['csrf_token'] ?? '';
  if (!verify_csrf($token)) {
    http_response_code(400);
    $error = 'Requisição inválida (CSRF).';
  } else {
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $password = $_POST['password'] ?? '';
    if (!$email || !$password) {
      $error = 'Preencha email e senha.';
    } else {
      // proteção básica por tentativas (implemente tabela login_attempts em produção)
      $stmt = $pdo->prepare('SELECT id, password, role FROM users WHERE email = ? LIMIT 1');
      $stmt->execute([$email]);
      $user = $stmt->fetch();
      if ($user && password_verify($password, $user['password'])) {
        session_regenerate_id(true);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        // atualiza last_login
        $u = $pdo->prepare('UPDATE users SET last_login = NOW() WHERE id = ?');
        $u->execute([$user['id']]);
        header('Location: dashboard.php');
        exit;
      } else {
        $error = 'Email ou senha inválidos.';
      }
    }
  }
}

$csrf = gen_csrf();
?>
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Login - ACT</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <main class="login-card">
    <h1>Entrar</h1>
    <?php if ($error): ?>
      <div class="error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="post" novalidate>
      <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrf) ?>">
      <label for="email">E-mail</label>
      <input id="email" name="email" type="email" required>
      <label for="password">Senha</label>
      <input id="password" name="password" type="password" required>
      <button type="submit">Entrar</button>
    </form>
  </main>
</body>
</html>
