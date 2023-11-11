<?php
include "db.php";

$db = new Database;

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    if ($data == null) {
        echo json_encode(["message" => "invalid json data"]);
    } else {
        $id = $data->id;
        $db->deleteTask($id);
    }
}

$db->closeConnection();

?>
