var expect = chai.expect;




describe('Game', function() {
    describe('#card', function() {
        it('should create an instance of a card', function() {
            var card = new Card("Hearts", "8", 8, "test");
            expect(card).to.deep.equal({suit: "Hearts", title: "8", value: 8, name: "test"}); 
        });
    });
    describe('#deck', function() {
        it('should create an array of cards', function() { 
            var deck = new Deck(["card1", "card2", "card3", "card4", "card5"]);
            expect(deck.cards).to.deep.equal(["card1", "card2", "card3", "card4", "card5"]);
        });
        it('should shuffle a deck of a cards', function() {
            var deck = new Deck(["card1", "card2", "card3", "card4", "card5"]);
            deck.shuffleDeck();
            expect(deck.cards).to.be.an("array").that.does.not.equal(["card1", "card2", "card3", "card4", "card5"]);
        });
        it('should split the deck in half', function(){
            var deck = new Deck(["card1", "card2", "card3", "card4", "card5","card6"]);
            var playerDecks = deck.splitDeck();
            expect(playerDecks[0]).to.deep.equal(["card1","card3","card5"]);
            expect(playerDecks[1]).to.deep.equal(["card2","card4","card6"]);
        });
     
    });
    describe('#player', function(){
        it('should create an instance of a player', function() {
            var player = new Player("Greg", [], 0);
            expect(player).to.deep.equal({name: "Greg", hand: [], score: 0});
        });
        it('should increase the players score', function(){
            var player = new Player("Greg", [], 0);
            player.increaseScore();
            expect(player.score).to.equal(1);
        });
    });
    describe('#setUpGame', function() {
        it('should return an array with 2 player objects with separate deck arrays', function() {
            const players = setUpGame();
            expect(players[0].hand.length).to.equal(26);
            expect(players[1].hand.length).to.equal(26);
        });
    });
    describe('#gameOn', function(){
        it('should declare player 1 a winner', function() {
            const player1 = new Player("Greg", [{suit: "Hearts", title: "8", value: 8, name: "test"}], 0);
            const player2 = new Player("Sandy", [{suit: "Hearts", title: "7", value: 7, name: "test"}], 0);
            var winner = gameOn(player1, player2);
            expect(winner).to.equal("Player 1 Wins!");

        });
        it('should declare player 2 a winner', function() {
            const player1 = new Player("Greg", [{suit: "Hearts", title: "7", value: 7, name: "test"}], 0);
            const player2 = new Player("Sandy", [{suit: "Hearts", title: "8", value: 8, name: "test"}], 0);
            var winner = gameOn(player1, player2);
            expect(winner).to.equal("Player 2 Wins!");

        });
        it('should declare a draw', function() {
            const player1 = new Player("Greg", [{suit: "Hearts", title: "8", value: 8, name: "test"}], 0);
            const player2 = new Player("Sandy", [{suit: "Hearts", title: "8", value: 8, name: "test"}], 0);
            var winner = gameOn(player1, player2);
            expect(winner).to.equal("DRAW!");

        });
    });
});


