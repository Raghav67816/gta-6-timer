document.addEventListener('DOMContentLoaded', () => {

    const timerDisplay = document.querySelector('.timer');
    const timeInput = document.querySelector('.time-input');
    const startBtn = document.querySelector('.start-btn');

    let countdownInterval;

    const alarmSound = new Audio('./soft.mp3');

    function startTimer() {
        const inputTime = timeInput.value.split(':'); 
        let totalSeconds = parseInt(inputTime[0], 10) * 3600 + parseInt(inputTime[1], 10) * 60;

        if (isNaN(totalSeconds) || totalSeconds <= 0) {
            alert('Please enter a valid time!');
            return;
        }

        timeInput.disabled = true;
        startBtn.disabled = true;

        countdownInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(countdownInterval);
                alert('Time is up!');
                alarmSound.play();
                resetTimer();
                return;
            }

            totalSeconds--;
            const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
            const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
            const seconds = (totalSeconds % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    }

    function resetTimer() {
        clearInterval(countdownInterval);
        timerDisplay.textContent = '00:00:00';
        timeInput.disabled = false;
        startBtn.disabled = false;
    }

    // Add event listener to the Start button
    startBtn.addEventListener('click', startTimer);
});

