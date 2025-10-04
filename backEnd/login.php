<?php
require_once 'db.php';
session_start();

$data = json_decode(file_get_contents("php://input"));

if (empty($data->username) || empty($data->password)) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit();
}

$username = htmlspecialchars($data->username);
$password = $data->password;

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "user" => [
                "id" => $user['id'],
                "username" => $user['username'],
                "email" => $user['email']
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    }
} catch(PDOException $e) {
    echo json_encode(["success" => false, "message" => "Login failed: " . $e->getMessage()]);
}
?>