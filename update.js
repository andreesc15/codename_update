function getTeams(){
  var teamParameters = {
    //"muteHttpExceptions" : true,
    'method'      : 'get',
    'contentType' : 'application/json',
    'headers'     : {'Authorization':'Token '+API_TOKEN}
  }

  var listTeams = JSON.parse(UrlFetchApp.fetch(`${TAB_URL}/api/v1/tournaments/${TOURNAMENT_SLUG}/teams`, teamParameters));
 // Logger.log(listTeams[0].speakers[0].name);
  

  for (var team of listTeams){
    Logger.log(team);
    Logger.log([team.url, team.long_name, team.speakers[0].name, team.speakers[1].name]);

    SpreadsheetApp
    .getActiveSpreadsheet()
    .getActiveSheet()
    .appendRow([team.url, team.long_name, team.speakers[0].name, team.speakers[1].name]);
  } 
}

function updateTeamCode(){

  var listTeams = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange("A:E").getValues();
  Logger.log(listTeams);

  for (var team of listTeams){
    var teamParameters = {
    //"muteHttpExceptions" : true,
    'method'      : 'post',
    'contentType' : 'application/json',
    'headers'     : {'Authorization':'Token '+API_TOKEN},
    'payload'     : JSON.stringify(
      {
        "code_name"       : team[4]
      })//--end JSON.stringify
     }; //--end options variable declaration

    var postTeam = JSON.parse(team[0], teamParameters);
    Logger.log(postTeam);
    
  }

  
}
