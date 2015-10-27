    var selfEasyrtcid = "";
     
     
    function connect() {
      easyrtc.setVideoDims(640,480);
      easyrtc.setRoomOccupantListener(convertListToButtonsV);
      easyrtc.easyApp("easyrtc.audioVideoSimple", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
       
      
         easyrtc.setPeerListener(addToConversation);
  easyrtc.setRoomOccupantListener(convertListToButtonsC);
              easyrtc.setRoomOccupantListener(convertListToButtonsV);
  easyrtc.connect("easyrtc.instantMessaging", loginSuccess, loginFailure);
        
     }
     
     
    function clearConnectList() {
     
        var otherClientDivV = document.getElementById("otherClientsV");
      while (otherClientDivV.hasChildNodes()) {
        otherClientDivV.removeChild(otherClientDivV.lastChild);
      }
    }
     
     
    function convertListToButtonsV (roomName, data, isPrimary) {
      clearConnectList();
      var otherClientDivV = document.getElementById("otherClientsV");
      for(var easyrtcid in data) {
        var button = document.createElement("button");
        button.onclick = function(easyrtcid) {
          return function() {
            performCall(easyrtcid);
          };
        }(easyrtcid);
     
        var label = document.createTextNode(easyrtc.idToName(easyrtcid));
        button.appendChild(label);
        otherClientDivV.appendChild(button);
      }
    }
     
     
    function performCall(otherEasyrtcid) {
      easyrtc.hangupAll();
     
      var successCB = function() {};
      var failureCB = function() {};
      easyrtc.call(otherEasyrtcid, successCB, failureCB);
    }
     
     
    function loginSuccess(easyrtcid) {
      selfEasyrtcid = easyrtcid;
      document.getElementById("iam").innerHTML = "I am " + easyrtc.cleanId(easyrtcid);
    }
     
     
    function loginFailure(errorCode, message) {
      easyrtc.showError(errorCode, message);
    }