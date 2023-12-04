<?php
header('Content-Type: application/json');

$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_dbname";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$response = ['success' => false, 'message' => 'Operation failed'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['addProxy'])) {
        // Add new proxy (similar to the previous code)
        // ...
        
        $response['success'] = true;
        $response['message'] = 'Proxy added successfully';
    }

    if (isset($_POST['editProxy'])) {
        // Edit proxy (similar to the previous code)
        // ...

        $response['success'] = true;
        $response['message'] = 'Proxy edited successfully';
    }

    if (isset($_POST['deleteProxy'])) {
        // Delete proxy (similar to the previous code)
        // ...

        $response['success'] = true;
        $response['message'] = 'Proxy deleted successfully';
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM proxies WHERE id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $response['data'] = $result->fetch_all(MYSQLI_ASSOC);
    }
}

$conn->close();
echo json_encode($response);
?>
