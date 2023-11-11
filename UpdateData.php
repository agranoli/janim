<?php
include "db.php";

$db = new Database;

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    if ($data == null) {
        echo json_encode(["message" => "Invalid JSON data"]);
    } else {
        $taskId = $data->taskId; // Assuming taskId is included in your JSON data
        $title = $data->title;
        $desc = $data->description;
        $dueDate = $data->dueDate;
        $status = $data->status;

        $db->updateData($taskId, $title, $desc, $dueDate, $status);
    }
}

$db->closeConnection();
?>
