// @ts-nocheck
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

  var listTeams = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange("A2:E").getValues();
  Logger.log(listTeams);

  for (var team of listTeams){
    Logger.log(team);

    var parameters = {
    "muteHttpExceptions" : true,
    'method'      : 'get',
    'contentType' : 'application/json',
    'headers'     : {'Authorization':'Token '+API_TOKEN}}; //--end options variable declaration

      var getTeam = JSON.parse(UrlFetchApp.fetch(team[0],parameters));
      Logger.log(getTeam);

      var teamParameters = {
        'muteHttpExceptions' : true,
        'method'      : 'post',
        'contentType' : 'application/json',
        'headers'     : {'Authorization':'Token '+API_TOKEN},
        'payload'     : JSON.stringify(
          {
            'code_name'             : team[4],
            'institution'           : getTeam.institution, 
            'break_categories'      : getTeam.break_categories,
            'institution_conflicts' : getTeam.institution_conflicts 
            
          })//--end JSON.stringify
          }; //--end options variable declaration
      
      Logger.log(teamParameters);
      var request = UrlFetchApp.fetch(team[0], teamParameters);
      Logger.log(request);


  }

  
}
