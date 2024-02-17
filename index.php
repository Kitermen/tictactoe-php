<?php
    // 1 -> 0, 2 -> X
    session_start();
    $ssid = session_id();
    $_POST['ssid'] = session_id();

    $conn = @mysqli_connect("localhost", "root", "", "tictactoe");

    $data = $conn->query("SELECT * FROM `stats` WHERE `id` = 1");
    $row = $data->fetch_assoc();

    // while($row = $data->fetch_assoc()){
    //     $row['id'];
    // }

    //fetch assoc - 



    if(isset($_POST["selected"])){
        $xo = $_POST["selected"];
        $conn->query("UPDATE `stats` SET `$xo` = '$ssid' WHERE `id` = 1");
    }

    if(isset($_POST["position"])){
        $pos = intval($_POST["position"]);
        $xo = $row['O'] == $ssid ? '1' : '2';
        $state = $row['state'];
        $state[$pos] = $xo;
        $conn->query("UPDATE `stats` SET `state` = '$state' WHERE `id` = 1");
    }
    
    echo json_encode($row);
?>