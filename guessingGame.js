const input = document.getElementById("input")
const guessResponse = document.getElementById("guess-response")
const timer = document.getElementById("timer");
const buttons = document.querySelectorAll(".button");
const endGameButton = document.getElementById("end-game")
let score = 0;
let count;

function app(min,max, timeLeft, attempts){
    
    document.getElementById('game-screen').style.display = "flex";
    document.getElementById('difficulty-screen').style.display = "none";
    
    Math.ceil(min);
    Math.floor(max);
    const GUESS = Math.floor(Math.random()*(max-min+1)+min)
    
    Math.ceil(timeLeft);
    const timeFrame = timeLeft;

    function time(timeleft){
        clearInterval(count)
        timeleft = timeLeft
        count = setInterval(()=>{
            timer.innerHTML=`00:${String(timeLeft).padStart(2, "0")}`
            if (input.value == GUESS){
                clearInterval(count)
            }
            if (timeLeft == 0 && input.value !== GUESS){
                input.disabled = true;
                guessResponse.innerHTML="Game is over"
                clearInterval(count)
            }
            timeLeft--
        },1000)
    }time()
        
    let attempt = 0;
    input.addEventListener("input", inputFunction)
    function inputFunction(e){
        const value = e.target.value;
        if (value != "") attempt++;
        console.log(value, GUESS)
        guessResponse.innerHTML = responseFunction(value);
        if (attempt > attempts){
            input.disabled = true;
            setTimeout(()=>{
                guessResponse.innerHTML= `Game is over after ${attempts} attempts`},1000)
            timeLeft =0;
        }
        // document.getElementById('score').innerHTML=score;
        // console.log(score)
    }

    function responseFunction(value){  

        if (value > GUESS){
            response = `${value} is too high`
        }else if (value < GUESS){
            response = `${value} is too low`
       }else if (value==GUESS){
            response = `Correct! It took you ${attempt} guesses and ${timeFrame - timeLeft} seconds`
            score = score + 5;
            input.disabled = true;
            endGameButton.innerHTML = "CONTINUE"
        }else if (value == ""){
            response = "Enter a number"
        }
        return response;
    }
    document.getElementById('instruction').innerHTML = `My secret number is between 1 and ${max} \n You have ${timeLeft} to guess this number. \n Enter your guess and I will tell you whether it is too high or too low. \n Good luck!`

    endGameButton.addEventListener('click', endGame)
    function endGame(){
        if (endGameButton.innerHTML === "END GAME"){
            document.getElementById('game-screen').style.display = "none";
            document.getElementById('difficulty-screen').style.display = "flex";
            timeLeft = 20;
    }
}
}

document.getElementById('game-screen').style.display = "none";

buttons.forEach(button => {
    button.addEventListener('click', selectDifficulty);
})



function selectDifficulty(e){
    value = e.target.value;
    if (value == "easy"){
        app(1,10,20,5)
        // buttons.forEach(button => button.disabled = true)
    }else if(value=="medium"){
        app(1,50,20,15)
        // buttons.forEach(button => button.disabled = true)
    }else if (value=="hard"){
        app(1,100,15,10)
        timer.innerText = "00:15"
        // buttons.forEach(button => button.disabled = true)
    }
}