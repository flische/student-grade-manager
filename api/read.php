<?php

$sql = "SELECT * FROM `student_data`";

$result = $conn->query($sql);

if(empty($result)){
    $output['error'][] = 'no data';

} else{

    if(mysqli_num_rows($result)>0){
        $output['success'] = true;
        
        while($row = mysqli_fetch_assoc($result)){
           $output['data'][] = $row; 
        }
    }
}
?>