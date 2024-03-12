<?php
$conn = @mysqli_connect("localhost", "root", "", "tictactoe");

    // 1 -> 0, 2 -> X
    session_start();
    $ssid = session_id();
    $_POST['ssid'] = session_id();


    $data = $conn->query("SELECT * FROM `stats` WHERE `id` = 1");
    $row = $data->fetch_assoc();
    // print_r($row['id']);
    // if($row['id'] == 2){
    //     echo "ja";
    // }
    // else{
    //     echo "nein";
    // }
    // while($row = $data->fetch_assoc()){
    //     $row['id'];
    // }

    //fetch assoc - 



    if(isset($_POST["selected"])){
        $xo = $_POST["selected"];
        $turn = $xo == 'O' ? '1' : '2';
        $conn->query("UPDATE `stats` SET `$xo` = '$ssid', `last_turn` = '$turn' WHERE `id` = 1");
        
    }

    if(isset($_POST["position"])){
        if(!$row['O'] == "0" || !$row['X'] == "0"){
            $pos = intval($_POST["position"]);
            $xo = $row['O'] == $ssid ? '1' : '2';
            if($row['last_turn'] != $xo){
                $state = $row['state'];
                if($state[$pos] == '0'){
                  $state[$pos] = $xo;
                  $conn->query("UPDATE `stats` SET `state` = '$state', `last_turn` = '$xo' WHERE `id` = 1");
                } 
            }
        }
    }
    
    echo json_encode($row);
?>