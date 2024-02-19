<?php
    $conn = @mysqli_connect("localhost", "root", "", "tictactoe");
    $conn->query("UPDATE `stats` SET `X` = '0', `O` = '0', `state` = '000000000', `last_turn` = '0' WHERE `stats`.`id` = 1;");
?>