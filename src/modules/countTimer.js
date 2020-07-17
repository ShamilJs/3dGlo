	const countTimer = (deadLine = '20 july 2020') => {

		const timerHours = document.getElementById('timer-hours'),
			timerMinutes = document.getElementById('timer-minutes'),
			timerSeconds = document.getElementById('timer-seconds');
		let idInterval = 0;

		const getTimeRemaining = () => {
			const dateStop = new Date(deadLine).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return { timeRemaining, hours, minutes, seconds };
		};

		const updateClock = () => {
			const timer = getTimeRemaining();
			let hoursStr,
				minutesStr,
				secondsStr;
			if (timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0) {
				hoursStr = timer.hours + '';
				minutesStr = timer.minutes + '';
				secondsStr = timer.seconds + '';

				hoursStr = (hoursStr.length < 2) ? '0' + hoursStr :  hoursStr;
				minutesStr = (minutesStr.length < 2) ? '0' + minutesStr :  minutesStr;
				secondsStr = (secondsStr.length < 2) ? '0' + secondsStr :  secondsStr;
				
				timerHours.textContent = hoursStr;
				timerMinutes.textContent = minutesStr;
				timerSeconds.textContent = secondsStr;
			} else {
				const timerAction = document.querySelector('.timer-action');
				hoursStr = '00';
				minutesStr = '00';
				secondsStr = '00';
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
				timerAction.textContent = 'Акция закончилась!';
			}
			if (timer.timeRemaining < 0) {
				clearInterval(idInterval);
			}
		};
		idInterval = setInterval(updateClock, 0);
	};


	export default countTimer;
