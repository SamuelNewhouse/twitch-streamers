$(document).ready( function() {
  var streamers = ["freecodecamp", "ESL_SC2", "OgamingSC2", "bobross", "comster404", "riotgames", "dansgaming", "brunofin"];  
  var resultsDiv = document.getElementById("resultsDiv");
  var qMark = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Circle-question-red.svg/240px-Circle-question-red.svg.png";
    
  function displayAll(userName) {
    var urlUser = "https://wind-bow.gomix.me/twitch-api/channels/" + userName + "?callback=?";
    $.getJSON(urlUser, function(userResult) {    
      var urlStream = "https://wind-bow.gomix.me/twitch-api/streams/" + userName + "?callback=?";
      $.getJSON(urlStream, function(streamResult) {
        
        var url = "";
        var imgDisplay = "";
        var nameDisplay = "";
        var statusDisplay = "";
        var statClass = "";
        
        if( userResult.hasOwnProperty("error") ) {
          url = "#";
          imgDisplay = qMark;
          nameDisplay = userName;
          statusDisplay = "<em>ERROR: Channel Not Found.</em>"
          statClass = "statError";
        } else {
          url = userResult.url;
          imgDisplay = userResult.logo;
          nameDisplay = userResult.display_name;
          if( streamResult.stream ){
            statusDisplay = userResult.status;
            statClass = "statOnline";
          } else {
            statusDisplay = "<em>offline</em>"
            statClass = "statOffline";
          }
        }
        
        var newHTML = "<a href='" + url + "' target='_blank'>" +
                        "<div class='container userBox " + statClass + "'>" + 
                          "<div class='row'>" +
                            "<div class='col-2 imgCol'>" +        
                              "<img class='streamLogo' src='" + imgDisplay + "'>" +
                            "</div>" +
                            "<div class='col-5 nameCol'>" +
                              "<h4>" + nameDisplay + "</h4>" +
                            "</div>" +
                            "<div class='col-5 statusCol'>" +
                              "<p>" + statusDisplay + "</p>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</a>"
        
        resultsDiv.insertAdjacentHTML("beforeend", newHTML);         
      });
    });
  }
  
  streamers.forEach( function(element) {
    displayAll(element);
  });
});