<?php

$id = $_GET['student_id'];

$sql = "DELETE FROM `student_data` WHERE `id` = $id";

$result = $conn->query($sql);

if(empty($result)){
    $output['error'][] = 'no data';

} else{

    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;     
        
    }else{
        $output['error'][] = 'no data';
    }
}
?>