<?php

header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from your frontend origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

class Database{
    private $servername;
    private $username;
    private $password;
    private $dbname;
    protected $conn;

    public function __construct() {
        $this->servername = "localhost";
        $this->username = "root";
        $this->password = "root";
        $this->dbname = "task_management";

        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }
    public function closeConnection(){
        $this->conn->close();
    }
    public function insertData($title, $desc, $dueDate){
        $data = [
            'title_err' => '',
            'desc_err' => ''
        ];
        if(empty($title)){
            $data['title_err'] = 'Title field can not be empty';
        }
        if(empty($desc)){
            $data['desc_err'] = 'Description field can not be empty.';
        }
        if (empty($data['title_err']) && empty($data['desc_err'])) {
            $createdAt = date("Y-m-d");
            $status = "to be done"; // Default status

            $sql = "INSERT INTO `tasks` (`title`, `description`, `due_date`, `status`, `created_at`) VALUES ('$title', '$desc', '$dueDate', '$status', '$createdAt')";

            if ($this->conn->query($sql) === true) {
                echo json_encode(["message" => "Record inserted successfully"]);
            } else {
                echo json_encode(["message" => "Error: " . $this->conn->error]);
            }
        } else {
            echo json_encode($data);
        }
    }
    public function getTasks() {
        $query = "SELECT * FROM tasks";
        $data = $this->conn->query($query);

        if ($data->num_rows > 0){
            $array = [];
            while ($row = $data->fetch_assoc()){
                $array[] = $row;
            }
            echo json_encode($array);
        }else{
            echo json_encode(["message" => "no data"]);
        }
    }
    public function deleteTask($taskId) {
        $query = "DELETE FROM tasks WHERE id = $taskId";
        if ($this->conn->query($query) === true) {
            echo json_encode(array("message" => "Task deleted successfully."));
        } else {
            echo json_encode(array("message" => "Unable to delete task."));
        }
    }
    public function updateData($taskId, $title, $desc, $dueDate, $status) {
        $data = [
            'title_err' => '',
            'desc_err' => ''
        ];

        if (empty($title)) {
            $data['title_err'] = 'Title field can not be empty';
        }
        if (empty($desc)) {
            $data['desc_err'] = 'Description field can not be empty.';
        }

        if (empty($data['title_err']) && empty($data['desc_err'])) {
            $sql = "UPDATE `tasks` SET `title` = '$title', `description` = '$desc', `due_date` = '$dueDate', `status` = '$status' WHERE `id` = $taskId";

            if ($this->conn->query($sql) === true) {
                $response = ["message" => "Record updated successfully"];
            } else {
                $response = ["error" => "Error: " . $this->conn->error];
            }
        } else {
            $response = $data;
        }

        // Send a JSON response header
        header('Content-Type: application/json');

        // Encode the response data as JSON and echo it
        echo json_encode($response);
    }



}