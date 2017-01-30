(function(){

	//self initialize constructor function
	var war = function(players){
		return new War(players);
	};

	//generate deck of 52 cards
	function generateDeck(){
		var deck = [];

		for(var x = 2 ; x < 15 ; x ++) {
			for(var z = 0 ; z < 4 ; z ++){
				deck.push(x);
			}
		}
		return deck;
	}

	/*constructor for war
	*////////////////////////////////////////////////
	function War(players){

		this.players = players;

		this.deck = generateDeck();

		this.playersDeck = {};

		this.tableCards = {};

		//make sure there are only even number of player to play the game
		if(players % 2 != 0 ){
			throw "Can only accept Even number of players";
		}else{
			//generate # of players
			for(var x  = 0 ; x < players ; x++){
				this.playersDeck[x + 1] = [];
			}
		}
	}


	War.prototype = {
		//method for shuffling deck
		shuffle: function(){
			var array = this.deck;

			//algorithm for random sorting
			for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}

			return array;
		},

		//method for dealing out deck to players
		deal: function(){
			var counter = 1;
			var self = this;
			//push card from deck to player's hand
			self.deck.forEach(function(card){
				self.playersDeck[counter].push(card);
				if(counter === self.players){
					counter = 1;
				}else{
					counter++ ;
				}
			});
			return self.playersDeck;
		},

		//draw cards and place card on table(tableCards)
		draw: function(){

			var self = this;
			//If table is empty,draw one card. If table already have cards,
			//draw 2
			var drawAmount = (!self.tableCards[1]) ? 1 : 2;

			for ( var player in self.playersDeck){
				//remove card from top of the hand and place them on table
				var drawnCard = self.playersDeck[player].splice(0,drawAmount);

				if(!self.tableCards[player]){
					self.tableCards[player] = drawnCard;
				}else{
					self.tableCards[player] = self.tableCards[player].concat(drawnCard);
				}
			}
			return self.tableCards;


		}
	};

	//export war to be used as a library
	window.war = war;

})();
