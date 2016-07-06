
cardNames = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K'
];

cardSuites = [
  {
    name: 'spade',
    strength: 3,
    symbol: '&spades;'
  },

  {
    name: 'heart',
    strength: 2,
    symbol: '&hearts;'
  },

  {
    name: 'diamond',
    strength: 1,
    symbol: '&diams;'
  },

  {
    name: 'club',
    strength: 0,
    symbol: '&clubs;'
  }
];



function Deck () {
  this.cards_ = [];


}

Deck.prototype.reset = function(){
  this.cards_ = [];
  for(var v = 0; v < 13; v++){
    for(var s = 0; s <= 3; s++){
      this.cards_.push(new Card(v, s));
    }
  }
}
Deck.prototype.shuffle = function() {
  if(this.cards_.length == 0){
    this.reset();
  }
  for(var i = 0; i < 1000; i++){
      var index = Math.floor(Math.random() * this.cards_.length);
      var card = this.cards_.splice(index, 1);
      this.cards_.push(card[0]);
  }
}

Deck.prototype.dealCard = function(){
  var index = Math.floor(Math.random() * this.cards_.length);
  var card = this.cards_.splice(index, 1);
  // //console.log('remains', this.cards_.length);
  if(card.length == 1){
    return card[0];
  }
}



function Card (value,suite) {
  this.name = cardNames[value];
  this.value = value;
  this.suite = cardSuites[suite];
  // TODO: define strength
  this.strength = this.value + this.suite.strength ;
}

function Player(name) {
  this.name = name;
  this.hand = [];

}

Player.prototype.takeCard = function(deck){
  // //console.log(deck.cards_.length);
  if(deck === undefined || deck.cards_ === undefined){
    throw new Error('not deck');
  }
  this.hand.push(deck.dealCard());
  // //console.log(this.hand);
}

Player.prototype.discardCard = function(){
  if(this.hand.length > 0){
    var index = Math.floor(Math.random() * this.hand.length);
    return this.hand.splice(index, 1);
  }else{
     return null;
  }
}


function Game(name, dealer, players){
   this.name = name;
   this.deck_;
   this.players_ = players;
   this.dealer_ = dealer;
   this.winner = null;
   this.rule_ = new Rule();

}

Game.prototype.initialize = function(){
  // NOTE: there're 2 players, no dealer
  this.deck_ = new Deck();
  this.deck_.shuffle();

  for(var i = 1; i <= 2; i++){
    this.dealer_.takeCard(this.deck_);
    for(var p in this.players_){
      this.players_[p].takeCard(this.deck_);
    }
  }

  //console.log('dealer', this.dealer_);
  for(var p in this.players_){
    //console.log(this.players_[p]);

  }
  //console.log('-----');

  // TODO: inside rule
  if(this.rule_.point(this.dealer_.hand) < 17){
    this.dealer_.takeCard(this.deck_);
    //console.log(this.rule_.point(this.dealer_.hand));
  }
  var winnerPlayer_ = [];
  var highestPoint_ = 0;
  var dealerPoint_ = this.rule_.point(this.dealer_.hand);
  for(var p in this.players_){
    var playerPoint_ = this.rule_.point(this.players_[p].hand);
    if(dealerPoint_ < playerPoint_ ){
      // TODO: all player wins when dealer bust
      if(highestPoint_ <= playerPoint_){
        winnerPlayer_.push(this.players_[p]);
        highestPoint_ = playerPoint_;
      }
    }
  }
  if(winnerPlayer_.length == 0){
    winnerPlayer_.push(this.dealer_);
  }
  console.log(winnerPlayer_);
  console.log('winner');



}

function Rule(cards){
  this.cards_ = cards;
  this.point_ = 0;
}




Rule.prototype.point = function(cards){
  this.point_ = 0;
  for(var i in cards){
    var card = cards[i];
    //console.log('value:', card.value + 1);
    if(card.value > 9){
      this.point_ += 10;
    }else{
      if(card.value == 0 && this.point >= 10){
        this.point_ += 1;
      }else if(card.value == 0){
        this.point_ += 11;
      }else{
        this.point_ += (card.value + 1);
      }
    }
  }
  if(this.point_ > 21){
     this.point_ = 0;
     //console.log('bust');
  }
  //console.log('point', this.point_);
  return this.point_;
}

var deck = new Deck();
deck.shuffle();
// deck.reset();
// for(var idx in deck.cards_){
//    //console.log(deck.cards_[idx]);
// }
// //console.log(deck.cards_.length);

// while(deck.cards_.length > 0){
//    //console.log(deck.dealCard());
//    //console.log('remain', deck.cards_.length);
// }

var p1 = new Player('player 1');
var p2 = new Player('player 2');
var dealer = new Player('dealer');
// for(var i = 0; i < 1; i++){
//   p1.takeCard(deck);
//   p2.takeCard(deck);
// }
// //console.log(p1.hand);
// //console.log(p1.discardCard());
// //console.log(p1.discardCard());
// //console.log(p1.discardCard());
//
//

// var game = new Game('game', dealer, []);
var game = new Game('game', dealer, [p1, p2]);
game.initialize();
