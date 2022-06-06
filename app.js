const X_class = 'x'
const O_class = 'o'
const winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const boxElement = document.querySelectorAll('[boxes]')
const board = document.getElementById('board')
const winningpage = document.getElementById('winningPage')
const winningMessage = document.querySelector('[display-text]')
const restart = document.getElementById('restartButton')
let Oturn

startgame()
restart.addEventListener('click', startgame)

function startgame(){
    Oturn = false
    boxElement.forEach(box => {
    box.classList.remove(O_class)
    box.classList.remove(X_class)
    box.removeEventListener('click', clickedBoxes)
    box.addEventListener('click', clickedBoxes, {once: true})
})
hoverboard()
winningpage.classList.remove ('display')
}
function clickedBoxes(e){
const box = e.target
const currentClass =  Oturn ? O_class : X_class
placeLetter(box, currentClass) 


if(checkwin(currentClass)){
    endgame(false)
    } else if (draw()){
        endgame(true)
    }else{
        switchTurns()
        hoverboard()
    }
}
function endgame(draw) {
    if(draw){
winningMessage.innerText = 'Draw!'
    }else{
        winningMessage.innerText = `${Oturn ? "O's" : "X's"} Wins!`
    }
    winningpage.classList.add('display')
}

function draw(){
    return [...boxElement].every(box =>{
        return box.classList.contains(X_class) || 
         box.classList.contains(O_class)
    })
}

function placeLetter (box, currentClass){
    box.classList.add(currentClass)
}

function switchTurns (){
    Oturn = !Oturn
}

function hoverboard(){
    board.classList.remove(O_class)
    board.classList.remove(X_class)
    if(Oturn){
        board.classList.add(O_class)
    }else{
            board.classList.add(X_class)
        }
    }

    function checkwin(currentClass){
        return winning_combinations.some(combination => {
            return combination.every(index => {
                return boxElement[index].classList.contains
                (currentClass)
            })
        })
   }