(function(){

	var war = window.war(4);

	var remainingPlayers = 2;

	war.shuffle();
	war.deal();

	while(remainingPlayers > 1){
		drawCard([]);
		remainingPlayers = trackRemainingPlayers();
	}
	console.log(war.playersDeck);
	console.log(war.ranks);
	function drawCard(winner){
		//base case
		war.draw(winner);
		winner = war.compare(winner);
		//recursion
		if(winner.length < 2){
			return winner;
		}else{
			return drawCard(winner);
		}
	}

	function trackRemainingPlayers(){
		var playerCounter = 0;

		for(var player in war.playersDeck){
			if(player){
				playerCounter ++;
			}
		}
		return playerCounter;
	}

})();
