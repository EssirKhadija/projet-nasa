<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (empty($data->username) || empty($data->email) || empty($data->password)) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit();
}

$username = htmlspecialchars($data->username);
$email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
$password = password_hash($data->password, PASSWORD_BCRYPT);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email format"]);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "Username or email already exists"]);
        exit();
    }
    
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$username, $email, $password]);
    
    echo json_encode(["success" => true, "message" => "Registration successful"]);
} catch(PDOException $e) {
    echo json_encode(["success" => false, "message" => "Registration failed: " . $e->getMessage()]);
}
?>