<?php

	// database credentials
	$db_user = ****;
    $db_password = ****;
    $db_host = ****;
    $db_name = *****;

	// connect to the database
	$db = mysqli_connect(
			$db_host,
			$db_user,
			$db_password,
			$db_name
		) OR die ('Can not connect ' . mysqli_connect_error());
	


if(	$_GET['newName'] && $_GET['newInit'] && $_GET['containerID'] ) {


	$newName = $_GET['newName'];
	$newInit = $_GET['newInit'];
    $containerID = $_GET['containerID'];



	
	$sql = "UPDATE SmartContainer SET LabelName='$newName', IntWeight='$newInit' WHERE ContainerID='$containerID'";



if (mysqli_query($db, $sql)) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . mysqli_error($db);
}





}

mysqli_close($db);


?> 
