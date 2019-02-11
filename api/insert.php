<?php

$name = mysqli_real_escape_string($conn,$_GET['name']);
$grade = mysqli_real_escape_string($conn,$_GET['grade']);
$course_name = mysqli_real_escape_string($conn,$_GET['course_name']);

$sql = "INSERT INTO `student_data`(`name`, `grade`, `course_name`) 
    VALUES ('$name','$grade','$course_name')";

$result = $conn->query($sql);

if(!$result){
    $output['error'][] = 'unable to add student.';
} else{
    $output['success'] = true;
    $conn->insert_id;
}
?>