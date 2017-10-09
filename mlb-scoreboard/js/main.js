//Populataes datepicker to get date and displays it with specific formats
function getInfo() {
    var date = $('#datepicker').datepicker({
        dateFormat: "D M d yy",
        altFormat: "yy-mm-dd",
        altField: "#alt-date"
    });

    //Gets one of the session's items
    var dateArr = sessionStorage.getItem('dateArr');

    //If user is coming back from game datails, loads page with the previous selected date
    if (dateArr != undefined) {
        var dateString = dateArr.slice(0, 10);
        var dateArr = dateArr.split(',');
        date.datepicker('setDate', new Date(dateString));
        console.log(dateString);
        getGames(dateArr);
        updateDate(dateArr);
    } //Otherwise, loads page with the default today date
    else {
        date.datepicker('setDate', new Date());
        dateArr = convertDate();
        console.log(new Date());
        getGames(dateArr);
        updateDate(dateArr);
    }
}

//Converts Date to an array
function convertDate() {
    var altDate = $('#alt-date')[0].value;
    var dateArr = altDate.split('-');
    return dateArr;
}

//Gets new date input in a calendar
function updateDate() {
    $("#datepicker").datepicker({
        dateFormat: "D M d yy",
        altFormat: "yy-mm-dd",
        altField: "#alt-date",
        onSelect: function() {
            $(this).change();
        }
    }).on("change", function() {
        updateScoreboard($('#alt-date')[0].value);
    });

    //Gets new date input by next button
    $('#next').click(function() {
        var new_dateb = $('#datepicker').datepicker('getDate');
        new_dateb.setDate(new_dateb.getDate() + 1);
        $('#datepicker').datepicker('setDate', new_dateb);
        updateScoreboard($('#alt-date')[0].value);
        return false;
    });

    //Gets new date input by previous button
    $('#previous').click(function() {
        var new_dateb = $('#datepicker').datepicker('getDate');
        new_dateb.setDate(new_dateb.getDate() - 1);
        $('#datepicker').datepicker('setDate', new_dateb);
        updateScoreboard($('#alt-date')[0].value);
        return false;
    });
}

//Clears the scoreboard and calls to display games for the new selected date
function updateScoreboard() {
  document.getElementById('scoreboard').innerHTML = "";
  dateArr = convertDate($('#alt-date')[0].value);
  getGames(dateArr);
}

//Creates ajax url with date Array, gets data from API, creates and displays a table of games
function getGames(dateArr) {
    sessionStorage.clear(); //Clear sessions
    var year = dateArr[0];
    var month = dateArr[1];
    var day = dateArr[2];
    var URL = 'http://gd2.mlb.com/components/game/mlb' + '/year_' + year + '/month_' + month + '/day_' + day + '/master_scoreboard.json';
    $.ajax({
        url: URL,
        success: function(payload) {
            var games = payload.data.games.game;
            var output = $('#scoreboard');

            //If there is at least one game played on the selected date
            if (games != undefined) {
              //If there are more than one game played on the selected date
                if (Array.isArray(games)) {
                    reorder(games);
                    //Reorder games array to put "Blue Jays" team as the first element
                    function reorder() {
                        for (var i = 0; i < games.length; i++) {
                            if (((games[i].away_team_name).toLowerCase() || (games[0].away_team_name).toLowerCase()) === 'blue jays') {
                                var first = games.splice(i, 1);
                                games.unshift(first[0]);
                                break;
                            }
                        }
                    }

                    $.each(games, function(i, game) {

                        //If there is any records of the game's result (If the game is not Cancelld or Postponed)
                        if (game.linescore != undefined) {
                            var winner = winnerBold(game); //Makes the winner team bold

                            //Creates a row in the table for each game, displaying teams and scores
                            output.append(`
                              <tr onclick="gameSelected('${game.game_data_directory}')">
                              <td id="left">
                                ${winner}
                                <li>${game.status.status}</li></td>
                                <td id="right">
                                  <li>${game.linescore.r.home}</li>
                                  <li>${game.linescore.r.away}</li>
                                </td>
                              </tr>`);
                        } //If there isn't any records of the games' result (If the game is Cancelld or Postponed)
                        else {
                            //Creates a row in the table for each game, displaying only teams (not display scores)
                            output.append(`
                              <tr onclick="gameSelected('${game.game_data_directory}')">
                                <td id="left">
                                  <li>${game.home_team_name}</li>
                                  <li>${game.away_team_name}</li>
                                  <li>${game.status.status}</li></td>
                                <td id="right">
                                  <li></li>
                                  <li></li>
                                </td>
                              </tr>`);
                        }
                    });
                } //If there is only one game played on the selected date
                else {

                    //If there is any records of the game's result (If the game is not Cancelld or Postponed)
                    if (games.linescore != undefined) {
                        var winner = winnerBold(games); //Makes the winner team bold

                        //Creates a row in the table for the game, displaying teams and scores
                        output.append(`
                          <tr onclick="gameSelected('${games.game_data_directory}')">
                            <td id="left">
                                ${winner}
                              <li>${games.status.status}</li></td>
                              <td id="right">
                                <li>${games.linescore.r.home}</li>
                                <li>${games.linescore.r.away}</li>
                              </td>
                          </tr>`);
                    } //If there isn't any records of the game's result (If the game is Cancelld or Postponed)
                    else {

                        //Creates a row in the table for the game, displaying only teams (not display scores)
                        output.append(`
                          <tr onclick="gameSelected('${games.game_data_directory}')">
                            <td id="left">
                              <li>${games.home_team_name}</li>
                              <li>${games.away_team_name}</li>
                              <li>${games.status.status}</li></td>
                          </tr>`);
                    }
                }
            }
            //Displays a message if there is no game played on the selected date
            else {
                output.append('<br><br><p id="p"> No games today</p>');
            }
        }
    });
};

//Prints the teams' neams, and makes winner teams bold
function winnerBold(game) {
    var runs = game.linescore.r;
    var runOutput = '';
    if (runs.home > runs.away) {
        runsOutput = '<li id="winner">' + game.home_team_name + '</li><li>' + game.away_team_name + '</li>';

    } else {
        runsOutput = '<li>' + game.home_team_name + '</li><li id="winner">' + game.away_team_name + '</li>';
    }
    return runsOutput;
}

//Loads a detail page of the selected game
function gameSelected(id) {
    sessionStorage.setItem('gameId', id);
    window.location = 'game.html';
    return false;
}

//Creates ajax url with game Id, gets data from API, creates and displays the details of the selected game
function getGame() {
    var gameId = sessionStorage.getItem('gameId');
    var URL = 'http://gd2.mlb.com' + gameId + '/boxscore.json';
    console.log(URL);
    getHomeBatter()
    $.ajax({
        url: URL,
        success: function(payload) {
            var output = $('#gameDetail');
            var innings = payload.data.boxscore.linescore.inning_line_score;

            //Displays home and away teams' codes at the top left of the page
            document.getElementById('htc').innerHTML = payload.data.boxscore.home_team_code.toUpperCase();
            document.getElementById('atc').innerHTML = payload.data.boxscore.away_team_code.toUpperCase();

            //Creates a cell at the top center of the details page for each inning, displaying the innings' numbers
            $.each(innings, function(i, inning) {
                $('#th12').append(`
                  <td class="innertable">${inning.inning}</td>`);
            });

            //Creates a cell at the top center of the details page for each inning, displaying home team's scores on each inning
            $.each(innings, function(i, inning) {
                $('#td22').append(`
                <td class="innertable">${inning.home}</td>`);
            });

            //Creates a cell at the top center of the details page for each inning, displaying away team's scores on each inning
            $.each(innings, function(i, inning) {
                $('#td32').append(`
                <td class="innertable">${inning.away}</td>`);
            });

            //Displays home team's runs, hits, and errors on the top right of the details page
            document.getElementById('htr').innerHTML = payload.data.boxscore.linescore.home_team_runs;
            document.getElementById('hth').innerHTML = payload.data.boxscore.linescore.home_team_hits;
            document.getElementById('hte').innerHTML = payload.data.boxscore.linescore.home_team_errors;

            //Displays away team's runs, hits, and errors on the top right of the details page
            document.getElementById('atr').innerHTML = payload.data.boxscore.linescore.away_team_runs;
            document.getElementById('ath').innerHTML = payload.data.boxscore.linescore.away_team_hits;
            document.getElementById('ate').innerHTML = payload.data.boxscore.linescore.away_team_errors;

            //Displays home and away team's full name in the center of the detail page
            document.getElementById('hfn').innerHTML = payload.data.boxscore.home_fname;
            document.getElementById('afn').innerHTML = payload.data.boxscore.away_fname;
        },

        error: function(XMLHttpRequest) {
        document.getElementById('outtertb').innerHTML = '';
        document.getElementById('errtd').innerHTML = '<br/>No results yet!<br/><br/><br/><br/>';
        }
    });
}

//Creates ajax url with game Id, gets data from API, creates and displays the details of each batter of the home team
function getHomeBatter() {
    var gameId = sessionStorage.getItem('gameId');
    var URL = 'http://gd2.mlb.com' + gameId + '/boxscore.json';
    $.ajax({
        url: URL,
        success: function(payload) {
            document.getElementById('batter').innerHTML = "";
            var output = $('#batter');
            var batters = payload.data.boxscore.batting[0].batter;
            $.each(batters, function(i, batter) {
                output.append(`
                <tr>
                <td class="batleft">${batter.name}</td>
                <td class="batright">${batter.ab}</td>
                <td class="batright">${batter.r}</td>
                <td class="batright">${batter.h}</td>
                <td class="batright">${batter.rbi}</td>
                <td class="batright">${batter.bb}</td>
                <td class="batright">${batter.so}</td>
                <td class="batright">${batter.avg}</td>
                </tr>`);
            });
        }
    });
}

//Creates ajax url with game Id, gets data from API, creates and displays the details of each batter of the away team
function getAwayBatter() {
    var gameId = sessionStorage.getItem('gameId');
    var URL = 'http://gd2.mlb.com' + gameId + '/boxscore.json';
    console.log(URL);
    $.ajax({
        url: URL,
        success: function(payload) {
            document.getElementById('batter').innerHTML = "";
            var output = $('#batter');
            var batters = payload.data.boxscore.batting[1].batter;
            $.each(batters, function(i, batter) {
                output.append(`
                <tr>
                <td class="batleft">${batter.name}</td>
                <td class="batright">${batter.ab}</td>
                <td class="batright">${batter.r}</td>
                <td class="batright">${batter.h}</td>
                <td class="batright">${batter.rbi}</td>
                <td class="batright">${batter.bb}</td>
                <td class="batright">${batter.so}</td>
                <td class="batright">${batter.avg}</td>
                </tr>`);
            });
        }
    });
}

//Creates ajax url with game Id, gets data from API, and reloads the last page that has been left off
function goBack() {
    var gameDate = sessionStorage.getItem('gameId').slice(0,47);
    var URL = 'http://gd2.mlb.com' + gameDate + 'master_scoreboard.json';
    console.log(URL);
    $.ajax({
        url: URL,
        success: function(payload) {
            var dateArr = payload.data.games.game[0].original_date;
            var dateArr = dateArr.split('/');
            sessionStorage.setItem('dateArr', dateArr);
            console.log(dateArr);
            window.location = 'index.html';
            return false;
        }
    });
}
