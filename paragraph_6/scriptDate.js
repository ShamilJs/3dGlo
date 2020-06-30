window.addEventListener('DOMContentLoaded', function(){
	'use strict';

const dayWeek = ['Восскресенье', 'Понедельник', 
				'Вторник', 'Среда', 
				'Четверг', 'Пятница', 
				'Суббота', 'Восскресенье'
			];

	const nowDay = (date, newDate) => {
		let day = dayWeek[date.getDay()],
			hours  = date.getHours(),
			timesOfDay = (hours >= 5 && hours <= 11) ? 'Доброе утро!' : 
						(hours > 11 && hours < 17) ? 'Добрый день!' : 
						(hours >= 17 && hours <= 23) ? 'Добрый вечер!' : 
						'Доброй ночи!',
			time = date.toLocaleTimeString('en'),
			newYear = Math.floor(((((newDate.getTime() - date.getTime()) / 1000) / 60) / 60) /24);
		return { day, hours, timesOfDay, time, newYear };
	};

	const print = () => {
		const formatDate = nowDay(new Date(), new Date(2021, 0, 1));
		const p = document.createElement('p');
		p.innerHTML = `${formatDate.timesOfDay} <br>
					Сегодня: ${formatDate.day} <br>
					Текущее время:${formatDate.time} <br>
					До нового года осталось: ${formatDate.newYear} дней`
					;
		const elm = document.querySelector('#elm');
		elm.append(p);
	};
	
	print();
});