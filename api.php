<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "proxies";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Thêm mới proxy
    if (isset($_POST['addProxy'])) {
        $fullFormat = $_POST['fullFormat'];
        $dateCreated = $_POST['dateCreated'];
        $dateExpired = $_POST['dateExpired'];
        $note = $_POST['note'];

        $stmt = $conn->prepare("INSERT INTO proxies (fullFormat, dateCreated, dateExpired, note) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $fullFormat, $dateCreated, $dateExpired, $note);
        $stmt->execute();
        $stmt->close();
    }

    // Sửa thông tin proxy
    if (isset($_POST['editProxy'])) {
        $id = $_POST['id'];
        $fullFormat = $_POST['fullFormat'];
        $dateCreated = $_POST['dateCreated'];
        $dateExpired = $_POST['dateExpired'];
        $note = $_POST['note'];

        $stmt = $conn->prepare("UPDATE proxies SET fullFormat=?, dateCreated=?, dateExpired=?, note=? WHERE id=?");
        $stmt->bind_param("ssssi", $fullFormat, $dateCreated, $dateExpired, $note, $id);
        $stmt->execute();
        $stmt->close();
    }

    // Xóa proxy
    if (isset($_POST['deleteProxy'])) {
        $id = $_POST['id'];

        $stmt = $conn->prepare("DELETE FROM proxies WHERE id=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
    }
}

$sql = "SELECT * FROM proxies";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

$conn->close();

echo json_encode($data);
?>
