let timerKey;


export function Timer({time, id, action = null}){

    const div = document.createElement('div')
    div.classList.add('timer-div')

    const span = document.createElement('span')
    span.classList.add('time-text')
    span.innerText = "Carregando..."

    timerKey = id

    const savedEndTime = localStorage.getItem(timerKey)
    if (savedEndTime) {
        startTimer(span, savedEndTime, action);
    } else{
        startQuiz(time, span, action)
    }
    

    div.append(span)

    return div
}

function startQuiz(minutes, element, action = null) {
    const currentTime = new Date().getTime();
    const endTime = currentTime + minutes * 60 * 1000;
    localStorage.setItem(timerKey, endTime);
    startTimer(element, endTime, action);
}

function startTimer(element, savedEndTime, action = null) {
    const timerInterval = setInterval(function() {
        const currentTime = new Date().getTime();
        let timeRemaining = Math.floor((savedEndTime - currentTime) / 1000);

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            localStorage.removeItem(timerKey);
            timeRemaining = 0;
            if(action){
                action()
            }
        }

        const hours = Math.floor(timeRemaining / 3600);
        const mins = Math.floor((timeRemaining % 3600) / 60);
        const secs = timeRemaining % 60;

        const div = document.querySelector('.timer-div')
        if (timeRemaining <= 60) {
            div.classList.add('red')
        } else {
            div.classList.remove('red');
        }

        if(hours < 1){
            element.innerText = 
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;;
        } else if (hours < 1 && mins < 1){
            element.innerText = 
            `${secs.toString().padStart(2, '0')}`;
        } else{
            element.innerText = 
            `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }

    }, 1000);
}