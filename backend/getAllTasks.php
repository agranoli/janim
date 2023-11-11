<?php
require_once 'db.php';

$db = new Database;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $db->getTasks();
}
$db->closeConnection();
?>
