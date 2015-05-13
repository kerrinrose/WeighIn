<?php
    $db_user = ****;
    $db_password = ****;
    $db_host = ****;
    $db_name = *****;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

else {
 echo "successfully connected!" ;  
}

  if ($_GET["ContainerID"] && $_GET["CurWeight"] ) {
    $ContainerID = $_GET["ContainerID"];
    $CurWeight = $_GET["CurWeight"];  
      
$sql = "UPDATE SmartContainer set CurWeight=$CurWeight WHERE ContainerID=$ContainerID";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

      
  }
$conn->close();
?>