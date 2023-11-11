<?php
include "db.php";

$db = new Database;

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    if ($data == null){
        echo json_encode(["message" => "invalid json data"]);
    }else{
        $title = $data->title;
        $desc = $data->description;
        $dueDate = $data->dueDate;
        $db->insertData($title, $desc, $dueDate);
    }
}
$db->closeConnection();
?>
