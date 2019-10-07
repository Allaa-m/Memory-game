/*
 * Declaration of Variables part
 */ 
    const Cardsicons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
    const MainContainer = document.getElementById("deck");
    let ClickedCards = [];
    let matchedCards = [];
    let cardContainer = document.getElementsByClassName("card");
/*
 * Add Click function on each card
 */    

let i;
for (i = 0; i < cardContainer.length; i++) {
  cardContainer[i].addEventListener("click", ShowCard);
}

//Show Cards with icons and compare each clicked card
 
function ShowCard(event) {
    if (ClickedCards.length === 1){
    // Flip Cards on click

    this.classList.add("open","show","disable");
    

    ClickedCards.push(this);
      //comapre two clicked cards 
        if(this.innerHTML===ClickedCards[0].innerHTML){
    //Match Case
             this.classList.add("match","disable");
             ClickedCards[0].classList.add("match","disable");
             matchedCards.push(this,ClickedCards[0]);
             ClickedCards = [];
             gameOver();
             stopTimer();      
        }
        //In case the cards don't match
        else { 
             this.classList.add("unmatched","disable");
             ClickedCards[0].classList.add("unmatched","disable");
        let CardOne =this;
        let CardTwo = ClickedCards[0];
            setTimeout ( function(){
            CardOne.classList.remove("open","show","unmatched","disable");
            CardTwo.classList.remove("open","show","unmatched","disable")
         }
         ,400)
            
           ClickedCards = []; 
            
         }
         //Add move each time the user choose two cards
          moveCounter();

    }
    //just show the icons on the cards whwn clicked
    else {
    this.classList.add("open","show","disable");
    ClickedCards.push(this);    
    }
}

// shuffle the list of cards 
    function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//Restart the game with reset button
    const restartBtn = document.getElementById("restartBtn")
    restartBtn.addEventListener("click",restart)
    function restart(){
//Remove all the elements from the page to reset them
        MainContainer.innerHTML= "";
//draw all the elements again on Html page
        for(let i = 0; i < Cardsicons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${Cardsicons[i]}"></i>`;
        MainContainer.appendChild(card);
        card.addEventListener("click", ShowCard);      
    }
    //reset number of the matched card
    matchedCards = [];
    //reset number of moves
    moves=0
    MovesText.innerHTML = moves;
    //rest stars number
    startsCounter.innerHTML = `<li style="color: orange"><i class="fa fa-star"></i></li>
    <li style="color: orange"><i class="fa fa-star"></i></li>
    <li style="color: orange"><i class="fa fa-star"></i></li>`
//reset the timer 
  second = 0, minute = 0; hour = 0;
 //Hide the congrats div
  modal.style.display ="none";
  startTimer();
 //shuffle the cards in the second trial
    shuffle(Cardsicons);
    }
//This function is to count the Number of moves
  const MovesText = document.querySelector(".moves");
  let moves=0;
  function moveCounter() {
  moves++;
  MovesText.innerHTML = moves;
  //Change the number of stars according to the number of moves
  givingStars();

}
//Number of stars 
const startsCounter = document.querySelector(".stars")
function givingStars(){
   if( moves>=20){
startsCounter.innerHTML = `<li style="color: orange"><i class="fa fa-star"></i></li>
<li style="color: orange"><i class="fa fa-star"></i></li>`
  }
  if(moves>=30){
startsCounter.innerHTML = `<li style="color: orange"><i class="fa fa-star"></i></li>`
  }
 if(moves==40){
startsCounter.innerHTML = " "
  }

}
//Congratulation Overlay
const modal = document.getElementById("popup")
  function gameOver() {
    if(matchedCards.length === Cardsicons.length) {
      modal.style.display ="block";
       const starRating = document.querySelector(".stars").innerHTML;
       const    finalTime = timer.innerHTML;
        //showing move, rating, time on modal
        document.getElementById("lastMove").innerHTML = moves;
        document.getElementById("NumberOfStars").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;     
    }
} 

/*
 * Start timer on game play
 */
  let second = 0, minute = 0; hour = 0;
  let timer = document.querySelector(".timer");
  let Playinterval;

  function startTimer(){
    Playinterval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
//pause the time
  function stopTimer() {
    clearInterval(Playinterval);
}
//Reset the game on clicking play again button
  const playagainBtn = document.getElementById("play-again")
  playagainBtn.addEventListener("click",restart)
