<?php
require_once '../config/db.php';
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->refresh_token)) {
    $refresh_token = $data->refresh_token;

    // Check if refresh token is valid and not expired
    $stmt = $conn->prepare("SELECT id, user_id FROM user_tokens WHERE refresh_token = ? AND expires_at > NOW()");
    $stmt->bind_param("s", $refresh_token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $token_id = $row['id'];
        $user_id = $row['user_id'];
        
        $new_access_token = bin2hex(random_bytes(32));
        $new_refresh_token = bin2hex(random_bytes(32));
        $expires_at = date("Y-m-d H:i:s", strtotime("+1 hour"));

        // Update the token in database
        $update_stmt = $conn->prepare("UPDATE user_tokens SET access_token = ?, refresh_token = ?, expires_at = ? WHERE id = ?");
        $update_stmt->bind_param("sssi", $new_access_token, $new_refresh_token, $expires_at, $token_id);
        
        if ($update_stmt->execute()) {
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Token refreshed successfully",
                "access_token" => $new_access_token,
                "refresh_token" => $new_refresh_token
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to update token"]);
        }
        $update_stmt->close();
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid or expired refresh token"]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Refresh token is required"]);
}
?>
