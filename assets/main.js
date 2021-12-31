let n = 10;
let k = 0;
let score = 0;
let bestScore = 0;
let pair = [];

FlexCol = document.createElement("div");
FlexCol.setAttribute("class", "flex-container-column card");

for(let i=0; i<n; i++){
    FlexRow = document.createElement("div");
    FlexRow.setAttribute("class", "flex-container-row");
    for(let j=0; j<n; j++){
        box = document.createElement("div");
        box.setAttribute("class", "button");
        box.setAttribute("id", k)
        box.innerText = Math.floor(100*Math.random());
        FlexRow.appendChild(box);
        k++;
    }
    FlexCol.appendChild(FlexRow);

}
document.getElementById("board").appendChild(FlexCol);

//Getting all boxes/button between button1 and button2
function getButtons(button1, button2){
    id1 = parseInt(button1.getAttribute("id"));
    id2 = parseInt(button2.getAttribute("id"));
    row_diff = Math.floor(id2/n)-Math.floor(id1/n);
    col_diff = id2 % n - id1 % n;

    let arr = [id1];
    if(col_diff > 0){
        while(col_diff > 0){
            arr.push(++id1);
            col_diff--;
        }
    } else if(col_diff < 0){
        while(col_diff < 0){
            arr.push(--id1);
            col_diff++;
        }
    }

    if(row_diff > 0){
        while(row_diff > 0){
            arr.push(arr[arr.length-1]+n);
            row_diff--;
        }
    } else if(row_diff < 0){
        while(row_diff < 0){
            arr.push(arr[arr.length-1]-n);
            row_diff++;
        }
    }

    let content = [];
    for(let i of arr){
        content.push(parseInt(document.getElementById(i).innerText));
    }

    obj = {
        id: arr,
        content: content
    }
    return obj;
}

function isPrime(obj){
    let sum = 0
    for(let i of obj["content"]){
        sum += i;
    }

    if(sum === 2){
        return true;
    }

    if(sum <= 1){
        return false;
    }

    for(let i=2; i<sum; i++){
        if(sum % i === 0){
            // console.log("sum",sum);        
            return false;
        }
    }
    // console.log("sum",sum);

    return true;
}

const buttons = document.getElementsByClassName("button");

let first = null;
let second = null;
let result = null;

function updateScore(score){
    element = document.getElementById("score");
    element.innerText = score;
    // console.log(element);
    if(localStorage.getItem(CACHE_KEY) !== null){
        if(localStorage.getItem(CACHE_KEY) < score){
            bestScore = score;
            updateBestScore(score);
        }
    } else{
        updateBestScore(score);
    }

    document.getElementById("bestScore").innerText = localStorage.getItem(CACHE_KEY);
    // console.log(document.getElementById("score").innerText);
}
if(localStorage.getItem(CACHE_KEY) !== null){
    document.getElementById("bestScore").innerText = localStorage.getItem(CACHE_KEY);
}


function changeButtonColor(obj){
    let ids = obj["id"];
    for(let id of ids){
        document.getElementById(id).style.background = "#B1D0E0";
    }

    setTimeout(() => {
        for(let button of buttons){
            button.style["background-color"] = "#1A374D";
        }
    }, 1000);
}

function isClicked(first, second){
    for(let element of pair){
        if(element['first'] === first.getAttribute("id") && element['second'] === second.getAttribute("id")){
            return true; 
        } else{
            if(Math.floor(first.getAttribute("id")/n) === Math.floor(second.getAttribute("id")/n)){
                if(element['first'] === second.getAttribute("id") && element['second'] === first.getAttribute("id")){
                    return true;
                }
            }
        }
    }
    return false;
}

function playCorrectSound(){
    let audio = new Audio("assets/audios/y2meta.com - Correct Answer Double (Version 3) (Right Win Winning Success Good Idea Quiz Show App Game Tone... (128 kbps).mp3");
    audio.play();
}
function playWrongSound(){
    let audio = new Audio("assets/audios/y2meta.com - Wrong Answer Bong Spring (Incorrect Lose Losing Failure Fail Bad Idea Quiz Show App Game Tone... (128 kbps).mp3");
    audio.play();
}
for(let button of buttons){
    button.addEventListener("click", (event) => {
        if(first == null){
            first = event.target;
            first.style.background = "#B1D0E0";
        } else if(second == null){
            second = event.target;
            result = isPrime(getButtons(first, second));
            changeButtonColor(getButtons(first, second));
            temp = {
                first: first.getAttribute("id"),
                second: second.getAttribute("id")
            };

            if(!isClicked(first, second)){
                pair.push(temp);
                if(result){
                    playCorrectSound();
                    score += 1;
                    updateScore(score);
                } else{
                    playWrongSound();
                    score -= 1;
                    updateScore(score);
                }
            }
            first = null;
            second = null;
        } 
    })
}
