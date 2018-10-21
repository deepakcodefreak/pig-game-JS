// /*
// GAME RULES:
//
// - The game has 2 players, playing in rounds
// - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
// - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
// - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
// - The first player to reach 100 points on GLOBAL score wins the game
//
// */
//


var scores,roundScore,activePlayer,gamePlaying,previous,n=100;

  init();


function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //document.querySelector(`.dice`).style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector(`#name-1`).textContent = 'Player 2';
    document.querySelector(`#name-0`).textContent = 'Player 1';




   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.add('active');

}



function newPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.querySelector(`#current-0`).textContent = '0';
  document.querySelector(`#current-1`).textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.getElementById('dice-2').style.display  = 'none';
  document.getElementById('dice-1').style.display  = 'none';
}



//Events and Event Listeners....


document.querySelector('.btn-roll').addEventListener('click',function(){
  if (gamePlaying) {
        // Random number
    var dice1  = Math.floor(Math.random()*6+1);
    var dice2  = Math.floor(Math.random()*6+1);
        //Display the result
    var diceDOM1 = document.getElementById('dice-1');
    var diceDOM2 = document.getElementById('dice-2');
    diceDOM1.src = `dice-${dice1}.png`;
    diceDOM2.src = `dice-${dice2}.png`;
    diceDOM1.style.display = 'block';
    diceDOM2.style.display = 'block';


    //Update the roundScore
    /*
    if(previous === 6 && dice === 6){
      roundScore = 0;
      scores[activePlayer]  = 0;
      document.querySelector(`#current-${activePlayer}`).textContent = 0;
      document.querySelector(`#score-${activePlayer}`).textContent = 0;
      newPlayer();
    }
    else if (dice!==1) {
      roundScore+=dice;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    }else{
      newPlayer();
    }
    previous = dice;
  }
*/

// 2 dies ... yeahhh!!!!!!
if (dice1 === dice2) {
  newPlayer();
}else if (dice1!==1 && dice2!==1) {
  roundScore += dice1 + dice2;
  document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
}else{
  newPlayer();
}



}

});



document.querySelector(`.btn-hold`).addEventListener('click',function(){
  if (gamePlaying) {
    // Add current score to global scores
      scores[activePlayer] += roundScore;
        // Update UI
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    //check if player won the game
            if (scores[activePlayer]>=n) {
          document.querySelector(`#name-${activePlayer}`).textContent = 'Winner';
          document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
          document.getElementById('dice-2').style.display  = 'none';
          document.getElementById('dice-1').style.display  = 'none';
          gamePlaying = false;
      }else{

        newPlayer();
      }
  }

})


document.querySelector(`.btn-new`).addEventListener('click',init);



document.querySelector('#mybutton').addEventListener('click',function(){
    n = document.getElementById("myText").value;
    console.log(n);
})
