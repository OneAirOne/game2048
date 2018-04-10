(function($)
{
	$.fn.game2048 = function()
	{

		/**
		* display message befor a select tag
		* @param  {string} tag target tag where would spawn the message
		* @param  {[type]} msg message
		*/
		function displayMessageBefore(tag, msg)
		{
			$(tag).before('<div class="msg" style= "font-family: \'Courier New\', Courier, monospace;">' + msg +'</div>')
			setTimeout(function()
			{
				$(".msg").animate({"margin-left": "-200px"})
				$(".msg").animate({"margin-left": "1000px"})
			}, 3000)
			setTimeout(function()
			{
				$(".msg").remove()
			}, 3605)
		}

		/**
		* return the sind size of the grid enter by the user
		* the default value is 4
		* @return {int} size
		*/
		function gridParam()
		{
			var paramGrid = 4;

			if ($("#paramGrid").val() != "") {
				if (parseInt($("#paramGrid").val(),10) <= 1 || isNaN(parseInt($("#paramGrid").val(),10))) {
					displayMessageBefore(".intro","Are you kidding me ?? we'll start with 4 x 4 ... ");
				} else {
					paramGrid = parseInt($("#paramGrid").val(),10);
					$("#paramGrid").val("");
				}
			}
			return paramGrid;
		};

		/**
		* display the grid
		* @param  {int} param side size of the grid
		*/
		function drawGrid(param)
		{
			$("#scene").remove();
			$("#validParam").after("<div id=\"scene\"></div>");
			var id = 1;
			var posX = 0;
			var posY = 0;


			for (var y = 0 ; y < param ; y++) {

				for (var x = 0 ; x < param ; x++) {

					$("#scene").last().append("<div class= 'grid' x= " + x + " y= " + y + " empty= 'true'></div>")
					var square = $("[x='" + x + "'][y='" + y + "']");
					// creation of attribute with the pixel position on the window
					square.attr("posX", square.position().left);
					square.attr("posY", square.position().top);
				}
				x = 0;
			}
		}

		/**
		* return the number 2 or the number 4
		* 2 have 2/3 of chance to be generate
		* @return {int} random number
		*/
		function generateNumber()
		{
			var numberRand = (Math.random() * 10)

			if (numberRand < 3) {
				var number = 4;
			} else {
				var number = 2;
			}
			return number;
		}

		/**
		* generate random tile with random number
		* @param  {int} randomNbr 2 or 4 -> generate by generateNumber function
		*/
		function generateTile(randomNbr)
		{
			var emptyElement =  $(".grid[empty = 'true']");
			var randomIndex = Math.random() * emptyElement.length;
			var element = $(emptyElement[parseInt(randomIndex)]);
			var posX = element.attr("posX");
			var posY = element.attr("posY");
			var x = element.attr("x");
			var y = element.attr("y");

			$("#scene").append("<div class='element' x =" + x + " y=" + y + " </div>");

			var square = $("[class=element][x='" + x + "'][y='" + y + "']");

			// assignation of the value of the grid
			square.css({top: parseFloat(posY), left: parseFloat(posX)});

			square.attr("color", randomNbr.toString())
			square.html(randomNbr);






			// $(tileToDrawSelect[parseInt(randomIndex)]).attr("empty", false).addClass("color").attr("color",randomNbr.toString()).html(randomNbr).hide();
			// $(tileToDrawSelect[parseInt(randomIndex)]).attr("empty", false).addClass("color").attr("color",randomNbr.toString()).html(randomNbr).show({ effect: "bounce", origin: "center", speed: 50});






			// $(tileSelect[parseInt(randomIndex)]).attr("empty", false).attr("content", randomNbr).addClass("color").attr("color",randomNbr.toString()).html(randomNbr).hide();
			// $(tileSelect[parseInt(randomIndex)]).attr("empty", false).attr("content", randomNbr).addClass("color").attr("color",randomNbr.toString()).html(randomNbr).show({ effect: "bounce", origin: "center", speed: 50});
			// $("#_1").html(4).attr("color", 4)
			console.log("POP")
			console.log($(emptyElement[parseInt(randomIndex)]).attr("x"))
			console.log($(emptyElement[parseInt(randomIndex)]).attr("y"))
		}

		/**
		* init of the game
		* @param  {int} gridSize the size of the grid to determinate the number of init spawn
		*/
		function init(gridSize)
		{

			var init = 2;
			var initGridSize = gridSize / init;

			if (gameStart == true) {
				for (var i = 0 ; i < initGridSize ; i++) {
					generateTile(generateNumber());
				}
			}
		}


		/**
		* move right all numbers
		* @param  {int} sizeGrid the size of the grid
		*/
		function move_right(sizeGrid)
		{

				var move = 0;
				var max = (sizeGrid - 1) // 3
				var y = 3;
				var x = 3;

				while (y >= 0 ) {
					while (x >= 0) {

						var active = $("[x='" + x + "'][y='" + y + "']");
						// si la case active est vide
						if (active.attr("empty") == "true") {
							var next = x - 1;
							// recherche d'une valeur
							while (next >= 0) {
								var cursor = $("[x='" + next + "'][y='" + y + "']");
								if (cursor.attr("empty") == "false") {

									// -------- deplacement du cursor vers active -> move

									// -----------------------------------------------
									x++;
									move = 1;
									break;

								}
								next--;
							}
						} else {
							console.log("case non vide")
							// si la case active n'est pas vide
							var next = x - 1;
							// recherche d'une valeur
							while (next >= 0) {
								var cursor = $("[x='" + next + "'][y='" + y + "']");
								// si la valeur trouvee par le curseur correspond a la valeur active -> merge
								if (parseInt(cursor.attr("content")) == parseInt(active.attr("content"))) {
									var sum = parseInt(cursor.attr("content")) + parseInt(active.attr("content"));

									// -------- deplacement du cursor vers active -> move

									// -----------------------------------------------

									score = score + sum;
									move = 1;
									break;

								// si la valeur trouvee par le curseur ne correspond pas a la valeur active
								} else if (parseInt(cursor.attr("content")) != parseInt(active.attr("content")) && cursor.attr("empty") == "false") {
									break;
								}
								next--;
							}
						}
						x--;
					}
						x = 3;
						y--;
				}
			if(move > 0) {
				return 1;
			} else {
				return 0;
			}
		}



		function checkWin(sizeGrid)
		{
			var y = 0;
			var x = 0;
			var nbElement = 0;
			var mergePossibility = 0;
			var maxElement = (sizeGrid * sizeGrid);

			// horizontal check
			while (y < sizeGrid) {
				while (x < sizeGrid) {
					var element = $("[x=" + x + "][y=" + y + "]");
					var content = parseInt(element.attr("content"),10);

					if (x > 0) {
						var elementPrevious = $("[x=" + (x - 1) + "][y=" + y + "]");
						var contentPrevious = parseInt(elementPrevious.attr("content"),10);

						if (element.attr("empty") == "false") {
							nbElement++;
						}
						if (content == contentPrevious) {
							mergePossibility++;
						}
					} else {
						if (element.attr("empty") == "false") {
							nbElement++;
						}
					}
					x++;
				}
				x = 0;
				y++;
			}

			var y = 0;
			var x = 0;
			// vertical check
			while (x < sizeGrid) {
				while (y < sizeGrid) {
					var element = $("[x=" + x + "][y=" + y + "]");
					var content = parseInt(element.attr("content"),10);

					if (y > 0) {
						var elementPrevious = $("[x=" + x + "][y=" + (y - 1) + "]");
						var contentPrevious = parseInt(elementPrevious.attr("content"),10);

						if (content == contentPrevious) {
							mergePossibility++;
						}
					}

					y++;
				}
				y = 0;
				x++;
			}
			if ((mergePossibility == 0) && (nbElement == maxElement)) {
				return 1;
			}
		}






		//  -------------
		//  -- > main <--
		//  -------------

		var gameStart = false;
		var score = 0;
		var konamiCode = 0;
		var paramGrid = 0;
		var arrayPos = [];

		// html generation of parameter input
		this.after("<button id=\"validParam\" type=\"button\" name=\"button\">go</button>");
		this.after("<input id=\"paramGrid\"></input>");
		this.after("<label for=\"paramGrid\">Size</label>");
		this.after("<p class='intro'>Select the size of the grid</p>");
		this.after("<div class='score'>")

		// --> game start
		gameStart = true;
		$(".score").html("score: " + 0);
		paramGrid = gridParam();
		drawGrid(paramGrid);
		init(paramGrid);
		//test
		// $("#_1").html(4).attr("color", 4)

		$("#validParam, #playAgain").on("click", function(e)
		{
			if (e.type == "click") {
				$("#validParam").html("reset");
				drawGrid(paramGrid);
				init(paramGrid);
				score = 0;
			}
		})



		// --> keyboard move event
		$(document).ready(function()
		{
			var moveReturn;

			$(this).on({
				keydown: function(e)
				{
					switch (e.keyCode) {
						case 38:
						console.log("UP");
						moveReturn = move_up(paramGrid)
							$(".score").html("score: " + score);
						// pop of a new tile if minimum 1 move
						if (moveReturn == 1) {
							generateTile(generateNumber());

						}
						if (checkWin(paramGrid) == 1) {
							if($('.msg').length == 0) {
								displayMessageBefore(".intro","I'm sorry but it's over... try again !");
								$("#validParam").html("play again");
								gameStart = false;
							}
						}
						break;

						case 40:
						console.log("DOWN");
						moveReturn = move_down(paramGrid);
						$(".score").html("score: " + score);
						// pop of a new tile if minimum 1 move
						if (moveReturn == 1) {
							generateTile(generateNumber());

						}
						if (checkWin(paramGrid) == 1) {
							if($('.msg').length == 0) {
								displayMessageBefore(".intro","I'm sorry but it's over... try again !");
								$("#validParam").html("play again");
								gameStart = false;
							}
						}
						break;

						case 37:
						console.log("LEFT");
						moveReturn = move_left(paramGrid);
						$(".score").html("score: " + score);
						// pop of a new tile if minimum 1 move
						if (moveReturn == 1) {
							generateTile(generateNumber());

						}
						if (checkWin(paramGrid) == 1) {
							if($('.msg').length == 0) {
								displayMessageBefore(".intro","I'm sorry but it's over... try again !");
								$("#validParam").html("play again");
								gameStart = false;
							}
						}
						break;

						case 39:
						console.log("RIGHT");
						moveReturn = move_right(paramGrid);
						$(".score").html("score: " + score);
						// pop of a new tile if minimum 1 move
						if (moveReturn == 1) {
							generateTile(generateNumber());

						}
						if (checkWin(paramGrid) == 1) {
							if($('.msg').length == 0) {
								displayMessageBefore(".intro","I'm sorry but it's over... try again !");
								$("#validParam").html("play again");
								gameStart = false;
							}
						}
						break;
						case 76:
						if (konamiCode == 0) {
							$("body").css("background-color", "black");
							$("body").css("color", "#28E642");
							$("table").css("border", "1px solid #28E642");
							$("td").css("border", "1px solid #28E642");
							konamiCode = 1;

						} else {
							$("body").css("background-color", "white");
							$("body").css("color", "black");
							$("table").css("border", "1px solid black");
							$("td").css("border", "1px solid black");
							konamiCode = 0;
						}

					}
				}
			});
		});
		return this;
	};
})(jQuery);
