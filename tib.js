(function($) {
    $.fn.JQuery_RUSH = function(parameters) {
        return this.each(function() {
            score = 0;
            newGame = 0;
            isTable4 = 0;
            isMove = 0;
            timeAttack = 0;

            var elapsed = 60 * 5;
			var interval;
			var total = 0;
			music = 0;
			mode = ""


            $('#grid').before('<br><div id="scoreContainer"><p id="score"></p></div>');
            $('#score').before("<div id='mode'>"+mode+"</div>");

            $('#score').after('<button id="classic">New Classic game</button>');
            $('#classic').before('<h2 id="title">Welcome! Please chose a game mode</h2><br>');
            $('#classic').after('<button id="timeAttack">New Time Attack game</button>');
            $('#timeAttack').after('<input type="text" id="setTimer" placeholder="Please input countdown duration"></input>(min)');
            $('#score').after('<div id="timer"></div>');
            $('body').prepend('<h1>2048</h1>');
            // $('#scoreContainer').after('<div id="scoreboard"><table><tr><td id="scoreTable">Score</td></tr></table></div>')
            // $('button').attr("id", "gridSize");
            // $('#grid').after('<audio controls><source src="classic.ogg" type="audio/ogg"></audio>');
            // $('#grid').after('<audio controls><source src="OOT_Fanfare_Item.wav" type="audio/ogg"></audio>');
            myAudioClassic = new Audio('classic.ogg');
            myAudioVictory = new Audio('victory.ogg');
            myAudiotimeAttack = new Audio('timeAttack.ogg');
            myAudioLose = new Audio('lose.wav');
            myAudio10sec = new Audio('10sec.ogg')
            // console.log("entrée prog isTable4 = " + isTable4)
            function randomNb() {
                var notRandomNumbers = [2, 2, 2, 2, 2, 2, 2, 2, 4, 4];
                //var notRandomNumbers=[1024]
                var idx = Math.floor(Math.random() * notRandomNumbers.length);
                return notRandomNumbers[idx];
            }

            function randomX() {
                return (Math.floor(Math.random() * 4) + 0);
            }

            function randomY() {
                return (Math.floor(Math.random() * 4) + 0);
            }

            function genNb() {
                var nb1 = randomNb()
                var x1 = randomX()
                var y1 = randomY()
                if ($("td[isfull='0']").length == 0) {
                    console.log("You Lose !");
                    return;
                }
                if ($("td[x=" + x1 + "][y=" + y1 + "]").attr("isfull") == 1) {
                    genNb()
                } else {
                    var case1 = $("td[isfull=" + 0 + "][x=" + x1 + "][y=" + y1 + "]").html("" + nb1 + "")
                    case1.attr("isfull", "1");
                }
            }

            function grid4() {
                var x = 0;
                var y = 0;
                // console.log("entrée grid4 isTable4 = " + isTable4)
                if (isTable4 == 1) {
                    isTable4 = 0
                }
                if (isTable4 == 0) {
                    var nb1 = randomNb()
                    $('table').remove()
                    var table = $('<table id="board" class="4"></table>');
                    while (y < 4) {
                        var line = $('<tr></tr>');
                        while (x < 4) {
                            var cases = $('<td></td>')
                            cases.attr("x", x).attr("y", y).attr("isfull", 0)
                            line.append(cases)
                            x++;
                        }
                        table.append(line)
                        x = 0;
                        y++;
                        var nb1 = randomNb()
                    }
                    $('#scoreContainer').prepend(table);
                    genNb();
                    genNb();
                    isTable4 = 1
                }
            }

            function goLeft() {
                var x = 0;
                var y = 0;
                // isMove = 1
                while (y <= 3) {
                    while (x <= 3) {
                        var active = $("td[x='" + x + "'][y='" + y + "']");
                        if (active.attr("isfull") == 0) {
                            var tmp = x + 1;
                            while (tmp <= 3) {
                                var temp = $("td[x=" + tmp + "][y=" + y + "]")
                                if (temp.attr("isfull") == 1) {
                                    active.text(parseInt(temp.text())).attr("isfull", 1)
                                    temp.text("").attr("isfull", 0)
                                    // console.log(temp.attr("isfull"));
                                    x--;
                                    isMove = 1;
                                    break;
                                }
                                tmp++;
                            }
                        } else {
                            var tmp = x + 1;
                            while (tmp <= 3) {
                                var temp = $("td[x=" + tmp + "][y=" + y + "]")
                                if (parseInt(temp.text()) == parseInt(active.text())) {
                                    // console.log(parseInt(temp.text()));
                                    // console.log(parseInt(active.text()));
                                    active.text(parseInt(active.text()) * 2)
                                    temp.text("").attr("isfull", 0)
                                    // console.log(temp.attr("isfull"));
                                    score = score + parseInt(active.text())
                                    isMove = 1;
                                    break;
                                } else if (temp.text() != active.text() && temp.attr("isfull") == 1) {
                                    break;
                                }
                                tmp++
                            }
                        }
                        x++
                    }
                    x = 0
                    y++
                }
                checkEndTurn()
            }

            function goRight() {
                var x = 3;
                var y = 3;
                // isMove = 1
                while (y >= 0) {
                    while (x >= 0) {
                        var active = $("td[x='" + x + "'][y='" + y + "']");
                        if (active.attr("isfull") == 0) {
                            var tmp = x - 1;
                            while (tmp >= 0) {
                                var temp = $("td[x=" + tmp + "][y=" + y + "]")
                                if (temp.attr("isfull") == 1) {
                                    active.text(parseInt(temp.text())).attr("isfull", 1)
                                    temp.text("").attr("isfull", 0)
                                    // console.log(temp.attr("isfull"));
                                    x++;
                                    isMove = 1;
                                    break;
                                }
                                tmp--;
                            }
                        } else {
                            var tmp = x - 1;
                            while (tmp >= 0) {
                                var temp = $("td[x=" + tmp + "][y=" + y + "]")
                                if (parseInt(temp.text()) == parseInt(active.text())) {
                                    // console.log(parseInt(temp.text()));
                                    // console.log(parseInt(active.text()));
                                    active.text(parseInt(active.text()) * 2)
                                    temp.text("").attr("isfull", 0)
                                    // console.log(temp.attr("isfull"));
                                    score = score + parseInt(active.text())
                                    isMove = 1;
                                    break;
                                } else if (temp.text() != active.text() && temp.attr("isfull") == 1) {
                                    break;
                                }
                                tmp--
                                // $("td[x="+tmp+"][y="+y+"]").val()==$("td[x="+x+"][y="+y+"]").val()
                                // $("td[x="+x+"][y="+y+"]").val()=$("td[x="+tmp+"][y="+y+"]").val()
                            }
                        }
                        x--
                    }
                    x = 3
                    y--
                }
                checkEndTurn()
            }

            function goUp() {
                var x = 0;
                var y = 0;
                // isMove = 1
                while (y <= 3) {
                    while (x <= 3) {
                        var active = $("td[x='" + x + "'][y='" + y + "']");
                        if (active.attr("isfull") == 0) {
                            var tmp = y + 1;
                            while (tmp <= 3) {
                                var temp = $("td[x=" + x + "][y=" + tmp + "]")
                                if (temp.attr("isfull") == 1) {
                                    active.text(parseInt(temp.text())).attr("isfull", 1)
                                    temp.text("").attr("isfull", 0)
                                    // console.log(temp.attr("isfull"));
                                    y--;
                                    isMove = 1
                                    break;
                                }
                                tmp++;
                            }
                        } else {
                            var tmp = y + 1;
                            while (tmp <= 3) {
                                var temp = $("td[x=" + x + "][y=" + tmp + "]")
                                if (parseInt(temp.text()) == parseInt(active.text())) {
                                    // console.log(parseInt(temp.text()));
                                    // console.log(parseInt(active.text()));
                                    active.text(parseInt(active.text()) * 2)
                                    temp.text("").attr("isfull", 0)
                                    // console.log(temp.attr("isfull"));
                                    score = score + parseInt(active.text())
                                    isMove = 1
                                    break;
                                } else if (temp.text() != active.text() && temp.attr("isfull") == 1) {
                                    break;
                                }
                                tmp++
                                // $("td[x="+tmp+"][y="+y+"]").val()==$("td[x="+x+"][y="+y+"]").val()
                                // $("td[x="+x+"][y="+y+"]").val()=$("td[x="+tmp+"][y="+y+"]").val()
                            }
                        }
                        x++
                    }
                    x = 0
                    y++
                }
