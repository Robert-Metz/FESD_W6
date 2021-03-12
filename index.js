
class Card {
    constructor(suit, title, value, name) {
        this.suit = suit;
        this.title = title;
        this.value = value;
        this.name = name;
    }
    
}

class Deck {
    constructor(cards = []) {
        this.cards = cards;
    }
    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];

        }
    }

    splitDeck() {
        const splitDeck1 = [];
        const splitDeck2 = [];
        for(let i = 0; i < this.cards.length; i++) {
            if(i % 2 === 0) {
                splitDeck1.push(this.cards[i]);
            }
            else{
                splitDeck2.push(this.cards[i]);
            }
        }
        return [splitDeck1, splitDeck2];
    }

}

class Player {
    constructor(name, hand = [], score) {
        this.name = name;
        this.hand = hand;
        this.score = score;
    }

    increaseScore() {
        this.score += 1;
    }
}



function setUpGame() {
    const suit = ["Clubs", "Diamonds", "Spades", "Hearts"];
    const titles = {
        "2":2, 
        "3":3, 
        "4":4, 
        "5":5, 
        "6":6, 
        "7":7, 
        "8":8, 
        "9":9, 
        "10":10, 
        "Jack":11, 
        "Queen":12, 
        "King":13,
        "Ace":14};
    
    let sortedDeck = [];
    
    console.log(Object.keys(titles));
    
    for(let i = 0; i < suit.length; i++) {
        Object.keys(titles).forEach((key)=>{
            const name = `${key} of ${suit[i]} with a value of ${titles[key]}`;
            const card = new Card(suit[i], key, titles[key],name);
            sortedDeck.push(card);
        });
    }
    
    console.log(sortedDeck);
    
    const deck = new Deck(sortedDeck);
    deck.shuffleDeck();
    console.log(deck.cards);
    const splitDecks = deck.splitDeck();
    console.log(splitDecks);
    const player1 = new Player("Greg", splitDecks[0], 0);
    const player2 = new Player("Stephanie", splitDecks[1], 0);

    return [player1, player2];
    
}

function gameOn(player1, player2) {
    for(let i = 0; i < player1.hand.length; i++) {
       const player1Card = player1.hand[i].value;
       const player2Card = player2.hand[i].value;
       if(player1Card > player2Card) {
           player1.increaseScore();
          console.log(`${player1.name} won round ${i+1} and now has a score of ${player1.score}`);
       }
        else if(player1Card < player2Card) {
           player2.increaseScore();
            console.log(`${player2.name} won round ${i+1} and now has a score of ${player2.score}`);
        }
        else{
            console.log("Draw!")
        }
    }
    if(player1.score > player2.score) {
        console.log(`${player1.name} won the game with a score of ${player1.score}\n${player2.name} only had a score of ${player2.score}`);
        return "Player 1 Wins!";
    }
    else if(player1.score < player2.score) {
        console.log(`${player2.name} won the game with a score of ${player2.score}\n${player1.name} only had a score of ${player1.score}`);
        return "Player 2 Wins!";
    }
    else {
        console.log(`The game is a draw! The scores were ${player1.score} against ${player2.score}`);
        return "DRAW!";
    }
}
const players = setUpGame();
gameOn(players[0], players[1]);