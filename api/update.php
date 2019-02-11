<?php

if(!$_GET){
	print('no data');
} else {
	$name = $_GET['name'];
	$grade = $_GET['grade'];
	$course_name = $_GET['course_name'];
	$id = $_GET['id'];
}

$editStudent = "UPDATE `student_data` SET `name` = '$name', `grade` = '$grade', `course_name` = '$course_name' WHERE `id` = '$id'";

$result = $conn->query($editStudent);

if(empty($result)){
	$output['error'][] = 'database error';
} else {
	if(mysqli_affected_rows($conn) === 1){
		$output['success'] = true;
	} else {
		$output['error'] = 'update error';
	}
}

?>