const input = document.getElementById("input")
const guessResponse = document.getElementById("guess-response")
const timer = document.getElementById("timer");
const buttons = document.querySelectorAll(".button");
const endGameButton = document.getElementById("end-game")
const customSetting = document.getElementById("custom-setting")
const customMaxValue = document.getElementById("custom-range")
const customTimeLimit = document.getElementById("custom-limit")
customSetting.style.display = "none"
let score = 0;
let attempt;
let count;

function app(min,max, timeLeft, maxAttempts){
    customSetting.style.display = "none"
    buttons[3].textContent = "CUSTOM"
    let attempts = maxAttempts;
    attempt = 0;
    input.disabled = false;
    
    document.getElementById('game-screen').style.display = "flex";
    document.getElementById('difficulty-screen').style.display = "none";
    
    Math.ceil(min);
    Math.floor(max);
    const GUESS = Math.floor(Math.random()*(max-min+1)+min)
    
    Math.ceil(timeLeft);
    const timeFrame = timeLeft;

    function time(){
        clearInterval(count)
        count = setInterval(()=>{
            timer.innerText=`00:${String(timeLeft).padStart(2, "0")}`
            if (input.value == GUESS){
                clearInterval(count)
            }
            if (timeLeft == 0 && input.value !== GUESS){
                input.disabled = true;
                guessResponse.innerText="Game is over"
                clearInterval(count)
            }
            timeLeft--
        },1000)
    }time()
        
    
    input.addEventListener("input", inputFunction)
    function inputFunction(e){
        let value = e.target.value;
        if (value != "") attempt++;
        console.log(attempt)
        // console.log(value, GUESS)
        guessResponse.innerText = responseFunction(value);
        if (attempt > attempts){
            input.disabled = true;
            setTimeout(()=>{
                guessResponse.innerText= `Game is over after ${attempts} attempts`},1500)
            timeLeft = 0;
        }
        // document.getElementById('score').innerText=score;
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
            endGameButton.innerText = "CONTINUE"
        }else if (value == ""){
            response = "Enter a number"
        }
        value =0
        return response;
        
    }
    document.getElementById('instruction').innerText = `My secret number is between 1 and ${max} \n You have ${timeLeft} to guess this number. \n Enter your guess and I will tell you whether it is too high or too low. \n Good luck!`

    endGameButton.addEventListener('click', endGame)
    function endGame(){
        if (endGameButton.innerText === "END GAME"){
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
    }else if (value == "custom"){
        customSetting.style.display = "flex"
        buttons[3].textContent = "START"
        // e.textContent = "START"
        

        
    }if (value == "custom" && buttons[3].textContent == "START"){
        if (customMaxValue.value != "" && customTimeLimit.value != ""){
            app(1, customMaxValue.value, customTimeLimit.value,10)
        }
        // customSetting.style.display = "none"
    }

}