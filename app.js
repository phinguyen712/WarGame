(function(){

	var war = window.war(12);
	war.shuffle();
	war.deal();

	console.log(drawCard([]));
	//recursion for drawing cards until one player win
	function drawCard(winner){
		//basee case
		war.draw(winner);
		winner = war.compare(winner);
		//recursion
		if(winner.length < 2){
			return winner;
		}else{
			return drawCard(winner);
		}
	}

})();
