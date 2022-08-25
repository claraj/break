const runTimerContainer = document.querySelector('#run-timer')
const setTimerContainer = document.querySelector('#configure-timer')

const convenientButtons = document.querySelectorAll('.start-timer')
const inputTime = document.querySelector('#custom-time-input')
const customButton = document.querySelector('#start-custom')

const timerDisplay = document.querySelector('#timer')
const timerLengthDisplay = document.querySelector('#total-timer')
const resetButton = document.querySelector('#reset')

let interval 

runTimerContainer.style.display = 'none'

inputTime.addEventListener('input', function(){
    // clear error when typing 
    inputTime.classList.remove('error')
})


convenientButtons.forEach(button => {
    button.addEventListener('click', function() {
        const time = button.dataset.time
        if (time <= 0) {
            // no negative times
            inputTime.classList.add('error')
        } else {
            inputTime.classList.remove('error')
            startTimer(time)
        }
    })
})

customButton.addEventListener('click', function() {
    const time = inputTime.value 
    if (time <= 0) {
        // no negative times
        inputTime.classList.add('error')
    }
    else if (!!time) {
        startTimer(time)
    }
})

resetButton.addEventListener('click', function(){
    clearInterval(interval)
    runTimerContainer.style.display = 'none'
    setTimerContainer.style.display = 'block'

})

function startTimer(time) {   // in minutes. No fractions
    runTimerContainer.style.display = 'block'
    setTimerContainer.style.display = 'none'

    if (time <= 0) {
        return
    }

    if (time == 1) {
        timerLengthDisplay.innerHTML = `Break for 1 minute`
    }
    else {

        timerLengthDisplay.innerHTML = `Break for ${time} minutes`
    }


    let totalTime = time * 60
     
    displayTime(totalTime)

    totalTime -= 1

    interval = setInterval(function() {

        if (totalTime <= 0) {
            clearInterval(interval)
            timerDisplay.innerHTML = 'Time is up'  
        }
        else {
            displayTime(totalTime)
            totalTime -= 1
        }

    }, 1000)

}


function displayTime(totalTime) {
    let mins = Math.floor(totalTime / 60).toFixed(0)
    let secs = Math.floor(totalTime % 60).toFixed(0)
    secs = secs.padStart(2, '0')  // pad with leading 0s
    timerDisplay.innerHTML = `Back in ${mins}:${secs}`
}


