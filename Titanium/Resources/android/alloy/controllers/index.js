function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getWeight() {
        var currentWeight;
        var intWeight;
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            var weight = JSON.parse(this.responseText);
            var weightData = [];
            if (weight) {
                for (var i = 0; i < weight.length; i++) {
                    currentWeight = weight[i].CurWeight;
                    intWeight = weight[i].IntWeight;
                    var percentLeft = currentWeight / intWeight * 100;
                    weightData.push({
                        ContainerID: weight[i].ContainerID,
                        initialWeightBind: {
                            id: weight[i].IntWeight
                        },
                        CurWeightBind: {
                            id: weight[i].CurWeight
                        },
                        containerLabelBind: {
                            text: weight[i].LabelName
                        },
                        CurWeightPercent: {
                            text: "Percent left: " + percentLeft + "%"
                        }
                    });
                }
                $.containerView.sections[0].setItems(weightData);
            }
        };
        xhr.onerror = function() {
            alert("Could not get messages");
        };
        xhr.open("GET", "http://52.24.159.58/getWeight.php");
        xhr.setRequestHeader("User-Agent", "SmartTray");
        xhr.send();
    }
    function sendData(newName, newInit, containerID) {
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            Titanium.API.info("newName: " + newName + " newInit: " + newInit + " containerID: " + containerID);
        };
        xhr.onerror = function() {
            alert("Could not save label");
        };
        xhr.open("POST", "http://52.24.159.58/saveData.php?newName=" + newName + "&newInit=" + newInit + "&containerID=" + containerID);
        xhr.setRequestHeader("User-Agent", "SmartTray");
        xhr.send();
        getWeight();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.refresh = Ti.UI.createButton({
        id: "refresh",
        top: "30",
        title: "Refresh"
    });
    $.__views.index.add($.__views.refresh);
    $.__views.containerInfo = Ti.UI.createScrollView({
        backgroundColor: "#fff",
        id: "containerInfo",
        top: "100",
        layout: "vertical"
    });
    $.__views.index.add($.__views.containerInfo);
    var __alloyId0 = {};
    var __alloyId3 = [];
    var __alloyId4 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId5 = [];
            var __alloyId6 = {
                type: "Ti.UI.Label",
                bindId: "containerLabelBind",
                properties: {
                    color: "#fff",
                    font: {
                        fontSize: 28
                    },
                    bindId: "containerLabelBind",
                    left: "10",
                    top: "5"
                }
            };
            __alloyId5.push(__alloyId6);
            return __alloyId5;
        }(),
        properties: {
            backgroundColor: "#409f97",
            top: "0",
            height: "50",
            width: "100%"
        }
    };
    __alloyId3.push(__alloyId4);
    var __alloyId7 = {
        type: "Ti.UI.Label",
        bindId: "CurWeightPercent",
        properties: {
            color: "#463e3e",
            font: {
                fontSize: 26
            },
            bindId: "CurWeightPercent",
            left: "10",
            top: "50"
        }
    };
    __alloyId3.push(__alloyId7);
    var __alloyId9 = {
        type: "Ti.UI.Label",
        bindId: "initialWeightBind",
        properties: {
            bindId: "initialWeightBind"
        }
    };
    __alloyId3.push(__alloyId9);
    var __alloyId11 = {
        type: "Ti.UI.Label",
        bindId: "CurWeightBind",
        properties: {
            bindId: "CurWeightBind"
        }
    };
    __alloyId3.push(__alloyId11);
    var __alloyId12 = {
        type: "Ti.UI.Label",
        bindId: "dateAdded",
        properties: {
            color: "#463e3e",
            font: {
                fontSize: 22,
                fontStyle: "italic"
            },
            bindId: "dateAdded",
            left: "10",
            top: "90",
            text: "Added on 5/8/15"
        }
    };
    __alloyId3.push(__alloyId12);
    var __alloyId13 = {
        type: "Ti.UI.Button",
        properties: {
            backgroundColor: "#45666d",
            color: "#fff",
            font: {
                fontSize: 24
            },
            width: "100%",
            height: "40",
            top: "150",
            title: "Reset Container"
        }
    };
    __alloyId3.push(__alloyId13);
    var __alloyId15 = {
        type: "Ti.UI.View",
        properties: {
            backgroundColor: "#fff",
            top: "190",
            height: "40"
        }
    };
    __alloyId3.push(__alloyId15);
    var __alloyId2 = {
        properties: {
            name: "template",
            backgroundColor: "#e1fdb2"
        },
        childTemplates: __alloyId3
    };
    __alloyId0["template"] = __alloyId2;
    $.__views.__alloyId16 = Ti.UI.createListSection({
        id: "__alloyId16"
    });
    var __alloyId18 = [];
    __alloyId18.push($.__views.__alloyId16);
    $.__views.containerView = Ti.UI.createListView({
        sections: __alloyId18,
        templates: __alloyId0,
        apiName: "Ti.UI.ListView",
        id: "containerView",
        width: "80%",
        top: "50",
        defaultItemTemplate: "template",
        classes: []
    });
    $.__views.containerInfo.add($.__views.containerView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    var nfc = require("com.acktie.mobile.android.nfc");
    nfc.isNFCEnabled ? nfc.init() : alert("Device does not support NFC! :( )");
    getWeight();
    $.refresh.addEventListener("click", function() {
        getWeight();
        Titanium.API.info("refresh");
    });
    $.containerView.addEventListener("itemclick", function(e) {
        var item = e.section.getItemAt(e.itemIndex);
        var initialWeight = item.initialWeightBind.id;
        var currentWeight = item.CurWeightBind.id;
        var containerID = item.ContainerID;
        item.containerLabelBind.text;
        Titanium.API.info(currentWeight);
        Titanium.API.info("containID: " + containerID);
        Titanium.API.info("int: " + initialWeight);
        Titanium.API.info("cur: " + currentWeight);
        e.section;
        e.itemIndex;
        var textfield = Ti.UI.createTextField();
        var dialog = Ti.UI.createAlertDialog({
            title: "Label your container",
            cancel: 1,
            androidView: textfield,
            buttonNames: [ "Label it", "Cancel" ]
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            if (e.index != e.source.cancel) {
                Titanium.API.info(textfield.value);
                item.containerLabelBind.text = textfield.value;
                initialWeight = currentWeight;
                Titanium.API.info("New init weight:" + initialWeight);
                sendData(textfield.value, initialWeight, containerID);
            }
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;