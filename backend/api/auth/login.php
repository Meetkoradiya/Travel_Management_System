<?php
require_once '../config/db.php';
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->username) && isset($data->password)) {
    $username = $conn->real_escape_string($data->username);
    $password = $data->password;

    $stmt = $conn->prepare("SELECT id, username, password FROM admin_users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Success
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "user" => [
                    "id" => $row['id'],
                    "username" => $row['username']
                ],
                "token" => base64_encode(random_bytes(32)) // Mock token, for real app use JWT
            ]);
        } else {
            // Invalid password
            http_response_code(401);
            echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
        }
    } else {
        // Invalid username
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Incomplete data"]);
}
?>
