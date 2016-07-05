
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
  this._cards = [];


}

Deck.prototype.reset = function(){
  this._cards = [];
  for(var v = 0; v < 13; v++){
    for(var s = 0; s <= 3; s++){
      this._cards.push(new Card(v, s));
    }
  }
}
Deck.prototype.shuffle = function() {
  if(this._cards.length == 0){
    this.reset();
  }
  for(var i = 0; i < 1000; i++){
      var index = Math.floor(Math.random() * this._cards.length);
      var card = this._cards.splice(index, 1);
      this._cards.push(card[0]);
  }
}

Deck.prototype.dealCard = function(){
  var index = Math.floor(Math.random() * this._cards.length);
  var card = this._cards.splice(index, 1);
  // console.log('remains', this._cards.length);
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
  // console.log(deck._cards.length);
  if(deck === undefined || deck._cards === undefined){
    throw new Error('not deck');
  }
  this.hand.push(deck.dealCard());
  // console.log(this.hand);
}

Player.prototype.discardCard = function(){
  if(this.hand.length > 0){
    var index = Math.floor(Math.random() * this.hand.length);
    return this.hand.splice(index, 1);
  }else{
     return null;
  }
}


var deck = new Deck();
deck.shuffle();
// deck.reset();
// for(var idx in deck._cards){
//    console.log(deck._cards[idx]);
// }
// console.log(deck._cards.length);

// while(deck._cards.length > 0){
//    console.log(deck.dealCard());
//    console.log('remain', deck._cards.length);
// }

var p1 = new Player('player 1');
var p2 = new Player('player 2');
for(var i = 0; i < 1; i++){
  p1.takeCard(deck);
  p2.takeCard(deck);
}
console.log(p1.hand);
console.log(p1.discardCard());
console.log(p1.discardCard());
console.log(p1.discardCard());

