<?php
    session_start();
    $_POST['ssid'] = session_id();
    
    $conn = @mysqli_connect("localhost", "root", "", "tictactoe");
    $ssid = session_id();
    $conn->query("UPDATE `stats` SET `X` = '$ssid' WHERE `id` = 1");
    echo json_encode($_POST);
?>