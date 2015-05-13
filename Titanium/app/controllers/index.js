
$.index.open();

var nfc = require('com.acktie.mobile.android.nfc');

// If NFC is not enabled not point in init'ing
if(nfc.isNFCEnabled)
{
	nfc.init();
}
else
{
	alert('Device does not support NFC! :( )');
}






// get messages from a PHP script
function getWeight()
{
	var currentWeight;
	var intWeight;
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function()
	{
		// parse JSON from the server
		var weight = JSON.parse(this.responseText);
		
		
				// create an empty array
		var weightData = [];

 		if(weight)
		{
			// loop through all messages
	 		for (var i = 0; i < weight.length; i++) 
	 		{
	 			currentWeight = weight[i].CurWeight;
	 			intWeight = weight[i].IntWeight;
	 			var percentLeft = currentWeight/intWeight *100;
	 			
	 			
	 			// add message onto the array
	 			weightData.push({
	 				ContainerID: weight[i].ContainerID,
	 				initialWeightBind: {id: weight[i].IntWeight} ,
	 				CurWeightBind: {id: weight[i].CurWeight},
	 				containerLabelBind: {text: weight[i].LabelName},
				    CurWeightPercent: {text: 'Percent left: '+ percentLeft + "%"},
				
	 			});
			}

			// add messages to the listView
			
			
			$.containerView.sections[0].setItems(weightData);			
		} 
	};
	
	xhr.onerror = function()
	{
		alert('Could not get messages');
	};

	xhr.open('GET', 'http://52.24.159.58/getWeight.php');
	xhr.setRequestHeader('User-Agent','SmartTray');
	xhr.send();		
}

getWeight();


$.refresh.addEventListener('click', function() {
	
getWeight();
	Titanium.API.info('refresh');
	
});

$.containerView.addEventListener('itemclick', function(e) 
 
 {
	
	
	
	var item = e.section.getItemAt(e.itemIndex);
	var initialWeight = item.initialWeightBind.id;
	var currentWeight = item.CurWeightBind.id;
	var containerID = item.ContainerID;
	var name = item.containerLabelBind.text;
	
	Titanium.API.info(currentWeight);
	
	
	Titanium.API.info("containID: " + containerID);
	Titanium.API.info("int: " + initialWeight);
	Titanium.API.info("cur: " + currentWeight);
	
	//Titanium.API.info("item.dateAdded.text: " + item.dateAdded.text);
	
	var section = e.section;
	var itemIndex = e.itemIndex;
	 
	 var textfield = Ti.UI.createTextField();
 
var dialog = Ti.UI.createAlertDialog({
    title: 'Label your container',
    cancel: 1,
    androidView: textfield,
    buttonNames: ['Label it', 'Cancel']
});
dialog.show();

dialog.addEventListener('click', function(e){
	
	 if (e.index != e.source.cancel) {
	 	
	 	Titanium.API.info(textfield.value);
    item.containerLabelBind.text = textfield.value;
  	//section.updateItemAt(itemIndex, item); 

  	initialWeight = currentWeight;
  	
  	Titanium.API.info("New init weight:"+ initialWeight);
  	
  	sendData(textfield.value, initialWeight, containerID);
  	//getWeight();
  	 }
	
});

 

});
	function sendData(newName, newInit, containerID) {
		
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function()
	{
		Titanium.API.info("newName: " + newName + " newInit: " + newInit + " containerID: " + containerID);
		
		
	};
	
	xhr.onerror = function()
	{
		alert('Could not save label');
	};


	xhr.open('POST', 'http://52.24.159.58/saveData.php?newName=' + newName + '&newInit=' + newInit + '&containerID=' + containerID);
	xhr.setRequestHeader('User-Agent','SmartTray');
	xhr.send();
	
	getWeight();

		
};
		
	

