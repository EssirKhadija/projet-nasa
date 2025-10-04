<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["email"], $data["password"])) {
    $email = trim($data["email"]);
    $password = trim($data["password"]);

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user["password"])) {
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "user" => [
                "id" => $user["id"],
                "username" => $user["username"],
                "email" => $user["email"]
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "Invalid credentials"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}
?>
