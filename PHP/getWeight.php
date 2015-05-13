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


// get all messages
$messages = null;
// shortcut vars - unneccessary, - but it makes the
// sql below look cleaner

// get all messages within one mile of user
$sql = "SELECT ContainerID,CurWeight,IntWeight,LabelName from SmartContainer";

$result = mysqli_query($db, $sql) or die('Query failed');

while($row = mysqli_fetch_assoc($result))
{

	
	// add to messages array
	$messages[] = array(
		'ContainerID' => $row['ContainerID'],
		'CurWeight' => $row['CurWeight'],
        'IntWeight' => $row['IntWeight'],
        'LabelName' => $row['LabelName']
	);
}
// send messages to the app
$output = json_encode($messages);
echo $output;
?>