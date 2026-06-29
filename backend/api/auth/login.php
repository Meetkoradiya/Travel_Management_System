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
            $access_token = bin2hex(random_bytes(32));
            $refresh_token = bin2hex(random_bytes(32));
            $expires_at = date("Y-m-d H:i:s", strtotime("+1 hour"));
            $user_id = $row['id'];
            
            $insert_stmt = $conn->prepare("INSERT INTO user_tokens (user_id, access_token, refresh_token, expires_at) VALUES (?, ?, ?, ?)");
            $insert_stmt->bind_param("isss", $user_id, $access_token, $refresh_token, $expires_at);
            $insert_stmt->execute();
            $insert_stmt->close();

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "user" => [
                    "id" => $user_id,
                    "username" => $row['username']
                ],
                "access_token" => $access_token
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
