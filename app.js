(function(){

	var war = window.war(4);
	war.shuffle();
	war.deal();
	console.log(war.draw());
	console.log(war.draw());
	console.log(war.tableCards);
})();
