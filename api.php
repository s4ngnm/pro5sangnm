<?php
header('Content-Type: application/json');

$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_dbname";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $response = ['success' => false, 'message' => 'Operation failed'];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['addProxy'])) {
            $fullFormat = $_POST['fullFormat'];
            $dateCreated = $_POST['dateCreated'];
            $dateExpired = $_POST['dateExpired'];
            $note = isset($_POST['note']) ? $_POST['note'] : null;

            $stmt = $conn->prepare("INSERT INTO proxies (fullFormat, dateCreated, dateExpired, note) VALUES (?, ?, ?, ?)");
            $stmt->execute([$fullFormat, $dateCreated, $dateExpired, $note]);

            $response['success'] = true;
            $response['message'] = 'Proxy added successfully';
        }

        if (isset($_POST['editProxy'])) {
            $id = $_POST['id'];
            $fullFormat = $_POST['fullFormat'];
            $dateCreated = $_POST['dateCreated'];
            $dateExpired = $_POST['dateExpired'];
            $note = isset($_POST['note']) ? $_POST['note'] : null;

            $stmt = $conn->prepare("UPDATE proxies SET fullFormat = ?, dateCreated = ?, dateExpired = ?, note = ? WHERE id = ?");
            $stmt->execute([$fullFormat, $dateCreated, $dateExpired, $note, $id]);

            $response['success'] = true;
            $response['message'] = 'Proxy edited successfully';
        }

        if (isset($_POST['deleteProxy'])) {
            $id = $_POST['id'];

            $stmt = $conn->prepare("DELETE FROM proxies WHERE id = ?");
            $stmt->execute([$id]);

            $response['success'] = true;
            $response['message'] = 'Proxy deleted successfully';
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
        $id = $_GET['id'];

        $stmt = $conn->prepare("SELECT * FROM proxies WHERE id = ?");
        $stmt->execute([$id]);

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            $response['data'] = $result;
        }
    }
} catch (PDOException $e) {
    $response['message'] = 'Connection failed: ' . $e->getMessage();
}

echo json_encode($response);
?>
