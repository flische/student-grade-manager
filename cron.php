<?php

$conn = mysqli_connect('', '', '', '');

$truncateSQL = "TRUNCATE `student_data`";

mysqli_query($conn, $truncateSQL);

$insertSQL = "INSERT INTO `student_data` (`id`, `name`, `grade`, `course_name`) VALUES
(1, 'Miles', 90, 'Speedy Names'),
(2, 'Patrick', 99, 'Smug Smiles'),
(3, 'Donald', 85, 'Knowing Everything'),
(4, 'Joshua', 45, 'Selfishness'),
(5, 'Andres', 89, 'How to get 89'),
(6, 'Miranda', 92, 'Cats'),
(7, 'Ryan', 100, 'Asking Questions'),
(8, 'Brian', 75, 'Evil programming laughs');";

mysqli_query($conn, $insertSQL);
?>