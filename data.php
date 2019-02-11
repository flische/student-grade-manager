<?php
require('mysql_connect.php');
define('fromData', true);

if(empty($_GET['action'])){
	exit('no action specified');
}
$output = [
	'success'=> false, 
	'errors'=>[]
];
switch($_GET['action']){
	case 'read':
        include('api/read.php');
		break;
	case 'insert':
        include('api/insert.php');
		break;
	case 'delete':
        include('api/delete.php');
		break;
	case 'update':
        include('api/update.php');
		break;
}
$outputJSON = json_encode($output);
print_r($outputJSON);
?>
