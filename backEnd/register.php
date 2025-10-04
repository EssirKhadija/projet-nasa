<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["username"], $data["email"], $data["password"])) {
    $username = trim($data["username"]);
    $email = trim($data["email"]);
    $password = password_hash($data["password"], PASSWORD_DEFAULT);

    try {
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $password]);
        echo json_encode(["success" => true, "message" => "User registered successfully!"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => "Registration failed: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}
?>
