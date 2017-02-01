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

		this.ranks = [];

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

			return this.random(array);
			//algorithm for random sorting
		},

		//method for random sorting
		random:	function(array){
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
		draw: function(winner){
			var self = this;
			var playersDeck = self.playersDeck;
			var tableCards = self.tableCards;
			//If table is empty,draw one card. If table already have cards,
			//draw 2
			var drawAmount = (winner.length < 2) ? 1 : 2;

			for ( var player in playersDeck){
				//remove card from top of the hand and place them on table
				var drawnCard = playersDeck[player].splice(0,drawAmount);

				if(winner.length < 2){
					tableCards[player] = drawnCard;
				}else{
					tableCards[player] = [...tableCards[player],...drawnCard];
				}
			}
			return tableCards;
		},

		//compare the cards and decide who wins or who goes to war
		compare: function(prevWinners){
			//temp array for sorting and comparing player's cards
			var sortedTable = [];
			//temp array for storing winners
			var nextWinners = [];
			//push tableCards into sortdTable array in order to be sorted and compared
			var tableCards = this.tableCards;
			if(prevWinners.length > 1){
				sortedTable = prevWinners.map(function(winner){
					return {
						card:tableCards[winner.player][tableCards[winner.player].length - 1],
						player:winner.player
					};
				});
			}else{
				for(var player in tableCards){
					var obj = {
						card : tableCards[player][tableCards[player].length -1],
						player:player
					};
					sortedTable.push(obj);
				}
			}

			//sort cards from highest to lowest
			sortedTable = sortedTable.sort(function(a , b){
				return a["card"] - b["card"];
			});
			//sortedTable yield same results everytime. Look at tableCards;

			//check to see if there are more than 1 winners
			var pileSize = sortedTable.length - 1;

			for( var x = pileSize ; x > 0 ; x-- ){
				if(sortedTable[x].card === sortedTable[pileSize].card){
					nextWinners.push(sortedTable[x]);
				}else{
					break;
				}
			}

			if(nextWinners.length === 1){
				this.winnerTakesCards(nextWinners);
			}
			return nextWinners;
		},

		//winner of the war takes all of the cards
		winnerTakesCards:function(winner){
			//store all cards on the table in a temp array to shuffle before
			//placing them in the winners deck(this randomizes hand to prevent
			// possible infinite loops)
			var tableCards = this.tableCards;
			var playersDeck = this.playersDeck;
			var ranks = this.ranks;
			var winnerPot = [];
			//place all cards on the table in pot
			for(var hands in tableCards){
				tableCards[hands].forEach(function(card){
					winnerPot.push(card);
				});
			}
			//clear table
			this.tableCards = {};
			//randomize pot before placing in winner's hand so that we don't have infinite loops
			winnerPot = this.random(winnerPot);
			//winner takes all of the cards on the table and place at the bottom of their deck

			this.playersDeck[winner[0].player] = [...playersDeck[winner[0].player],...winnerPot];
			for(var player in playersDeck){
				if(playersDeck[player].length === 0){
					ranks.push(player);
					delete playersDeck[player];
				}
			}
		},
	};

	//export war to be used as a library
	window.war = war;

})();
