/*
 CONCEPT: FULL RPS GAME — addEventListener, Arrow Functions, Keyboard Events, Autoplay
 - This is the final version of the Rock Paper Scissors game.
 - KEY UPGRADES from previous versions:
   1. Uses addEventListener() instead of inline onclick="" (cleaner separation of HTML and JS)
   2. Uses arrow functions (=>) for shorter callback syntax
   3. Adds keyboard event handling (press 'r', 'p', 's' to play)
   4. Adds autoplay feature using setInterval/clearInterval
   5. External JS file (script is in a .js file, not inline in HTML)
*/

// Load score from localStorage with || default pattern
let score = JSON.parse(localStorage.getItem('score')) || {
        win: 0,
        lose:0,
        tie:0
      };

      updateScore();

      /*
       CONCEPT: TOGGLE PATTERN WITH setInterval/clearInterval
       - isAutoPlaying tracks whether autoplay is ON or OFF (boolean flag).
       - intervalId stores the ID returned by setInterval() — needed to stop it later.
       - setInterval() returns a unique numeric ID that identifies that specific interval.
       - clearInterval(id) uses that ID to STOP the interval from running.
       - This creates a TOGGLE: click once to start, click again to stop.
      */
      let isAutoPlaying = false;
      let intervalId;

      function autoplay(){
        if(!isAutoPlaying){
            // Start autoplay — play a random game every 1 second
            intervalId = setInterval(() => {
                const playermove = pickComputerMove(); // Use the computer's random move as player's move
                playgame(playermove);
            }, 1000);   // 1000ms = 1 second
            isAutoPlaying = true;
        }
        else{
            // Stop autoplay — clear the interval and reset the flag
            clearInterval(intervalId);
            isAutoPlaying = false;
        }  
      }

      /*
       CONCEPT: addEventListener() WITH ARROW FUNCTIONS
       - Instead of onclick="" in HTML, we select elements and attach listeners in JS.
       - This is BETTER because:
         1. HTML stays clean (no JS code in HTML attributes)
         2. You can add/remove listeners dynamically
         3. You can attach MULTIPLE listeners to the same element
       - Arrow function () => { ... } is used as the callback — shorter than function() { }
      */
      document.querySelector('.js-rock-button')
        .addEventListener('click' , () => {
          playgame('rock');
        });

      document.querySelector('.js-paper-button')
        .addEventListener('click' , () => {
          playgame('paper');
        });
        
      document.querySelector('.js-scissors-button')
        .addEventListener('click' , () => {
          playgame('scissors');
        });  
      
      /*
       CONCEPT: KEYBOARD EVENT HANDLING
       - document.body.addEventListener('keydown', callback) listens for ANY key press on the page.
       - The 'event' object has a 'key' property telling you which key was pressed.
       - event.key returns the character: 'r', 'p', 's', 'Enter', 'Escape', etc.
       - This adds KEYBOARD SHORTCUTS to the game — press r/p/s to play without clicking!
      */
      document.body.addEventListener('keydown' , (event) => {
        if(event.key === 'r'){
          playgame('rock');
        }
        else if(event.key === 'p'){
          playgame('paper');
        }
        else if(event.key === 's'){
          playgame('scissors');
        }
      })

      // Core game logic — same as previous versions
      function playgame(playermove){
        const computerMove = pickComputerMove();
        let result = '';

        if(playermove === 'rock'){
          if (computerMove === 'rock'){
            result = 'Tie.';
          } else if (computerMove === 'paper') {
            result = 'You lose.';
          } else if (computerMove === 'scissors') {
            result = 'You win.';
          }
        } else if(playermove === 'paper'){
            if (computerMove === 'rock') {
            result = 'You win.';
          } else if (computerMove === 'paper') {
            result = 'Tie.';
          } else if (computerMove === 'scissors') {
            result = 'You lose.';
          }
        } else if(playermove === 'scissors'){
          if (computerMove === 'rock') {
            result = 'You lose.';
          } else if (computerMove === 'paper') {
            result = 'You win.';
          } else if (computerMove === 'scissors') {
            result = 'Tie.';
          }
        }
        if(result === 'You win.'){
          score.win += 1;
        }
        else if(result === 'You lose.'){
          score.lose += 1;
        }
        else if(result === 'Tie.'){
          score.tie += 1;
        }

        localStorage.setItem('score' , JSON.stringify(score));
        document.querySelector('.js-result').innerHTML = result;
        document.querySelector('.js-moves').innerHTML = `You <img src="images/${playermove}-emoji.png" class="move-image"> <img src="images/${computerMove}-emoji.png " class="move-image" >Computer`
        updateScore();
      }
      
      function updateScore(){
        document.querySelector('.js-score')
          .innerHTML = `Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;
      }

      function pickComputerMove(){
        const randomNumber = Math.random();

        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = 'rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = 'paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = 'scissors';
        }
        return computerMove;
      }