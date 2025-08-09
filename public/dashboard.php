<?php
session_start();
if (empty($_SESSION['user_id'])) {
  header('Location: login.php');
  exit;
}
// Aqui você pode carregar dados do painel, permissões, etc.
?>
<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><title>Painel - ACT</title></head>
<body>
  <header>
    <h1>Painel Principal</h1>
    <a href="logout.php">Sair</a>
  </header>
  <section>
    <p>Bem-vindo, usuário <?= htmlspecialchars($_SESSION['user_id']) ?> (role: <?= htmlspecialchars($_SESSION['role']) ?>)</p>
    <!-- Conteúdo do painel -->
  </section>
</body>
</html>
