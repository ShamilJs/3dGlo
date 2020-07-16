
window.addEventListener('DOMContentLoaded', () => {
	// eslint-disable-next-line strict
	'use strict';

	// Timer
	const countTimer = deadLine => {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');
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

			if (timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0) {
				let hoursStr = timer.hours + '';
				let minutesStr = timer.minutes + '';
				let secondsStr = timer.seconds + '';

				hoursStr = (hoursStr.length < 2) ? '0' + hoursStr :  hoursStr;
				minutesStr = (minutesStr.length < 2) ? '0' + minutesStr :  minutesStr;
				secondsStr = (secondsStr.length < 2) ? '0' + secondsStr :  secondsStr;

				timerHours.textContent = hoursStr;
				timerMinutes.textContent = minutesStr;
				timerSeconds.textContent = secondsStr;
			} else {
				const timerAction = document.querySelector('.timer-action');
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
				timerAction.textContent = 'Акция закончилась!';
			}
			if (timer.timeRemaining < 0) {
				clearInterval(idInterval);
			}
		};
		idInterval = setInterval(updateClock, 1000);
	};
	countTimer('20 july 2020');

	// меню
	const toggleMenu = () => {
		const menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};
		document.body.addEventListener('click', event => {
			const target = event.target;
			if (target.closest('.menu') || target.closest('.close-btn') || (target.closest('menu ul>li>a')) ||
				(!target.closest('.active-menu') && document.querySelector('.active-menu'))) {
				handlerMenu();
			}
		});
	};
	toggleMenu();

	// открытие-закрытие модального окна
	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content');
		let step = 0,
			step1 = 10;

		const openPopup = () => {
			const requestId = requestAnimationFrame(openPopup);
			step1++;
			popup.style.display = 'block';
			if (popup.style.opacity < 1) {
				popup.style.opacity = step += 0.04;
				popupContent.style.left = step1 + '%';
			} else {
				cancelAnimationFrame(requestId);
			}
		};
		const closePopup = () => {
			step = 0;
			step1 = 10;
			popup.style.display = 'none';
			popup.style.opacity = 0;
			popupContent.style.left = 0;
		};

		popupBtn.forEach(item => {
			item.addEventListener('click', () => {
				if (screen.width > 768) {
					openPopup();
				} else {
					popup.style.display = 'block';
				}
			});
		});

		popup.addEventListener('click', event => {
			let target = event.target;
			if (target.classList.contains('popup-close')) {
				closePopup();
			} else {
				target = target.closest('.popup-content');
				if (!target) {
					closePopup();
				}
			}
		});
	};
	togglePopup();

	// плавный переход по меню
	const smoothDocument = () => {
		let anchors = document.querySelectorAll('a[href*="#"]');
		anchors = [...anchors].slice(0, 7);
		anchors.forEach(item => {
			item.addEventListener('click', event => {
				event.preventDefault();
				const blockID = item.getAttribute('href').substr(1);
				if (blockID !== 'close') {
					document.getElementById(blockID).scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			});
		});
	};
	smoothDocument();

	// табы
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			tabContent.forEach((item, i) => {
				if (i === index) {
					tab[i].classList.add('active');
					item.classList.remove('d-none');
				} else {
					item.classList.add('d-none');
					tab[i].classList.remove('active');
				}
			});
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');
			if (target) {
				tab.forEach((item, index) => {
					if (item === target) {
						toggleTabContent(index);
					}
				});
			}
		});
	};
	tabs();

	// слайдер
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			ulDots = document.querySelector('.portfolio-dots'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0,
			interval;
		const dot = [];

		const createDots = () => {
			for (let i = 0; i < slide.length; i++) {
				dot[i] = document.createElement('li');
				dot[i].classList.add('dot');
				ulDots.append(dot[i]);
			}
		};
		createDots();

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 1000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();
			const target = event.target;
			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('.dot')) {
				dot.forEach((item, index) => {
					if (item === target) {
						currentSlide = index;
					}
				});
			}
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn, .dot')) {
				startSlide();
			}
		});
		startSlide(1500);
	};
	slider();

	// калькулятор
	const calculator = (price = 100) => {
		let calcItem = document.querySelectorAll('.calc-item');
		calcItem = [...calcItem].splice(1, calcItem.length);
		calcItem.forEach(item => {
			item.addEventListener('input', () => {
				item.value = item.value.replace(/\D/g, '');
			});
		});

		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcCount = document.querySelector('.calc-count'),
			calcDay = document.querySelector('.calc-day'),
			totalValue = document.getElementById('total');
		let sum = 0,
			total = 0;

		const iterateValue = () => {
			const requestId = requestAnimationFrame(iterateValue);
			if (sum < Math.floor(total)) {
				sum += 10;
				totalValue.textContent = sum;
			} else if  (sum > Math.floor(total)) {
				sum -= 10;
				totalValue.textContent = sum;
			} else {
				cancelAnimationFrame(requestId);
			}
		};

		const countSum = () => {
			let countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;
			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1)  / 10;
			}
			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}
			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			} else {
				total = 0;
			}
			iterateValue();
		};

		calcBlock.addEventListener('change', event => {
			const target = event.target;
			if (target === calcType || target === calcSquare ||
				target === calcCount || target === calcDay) {
				countSum();
			}
		});
	};
	calculator(100);

	// наша команда--> смена карточек
	const ourTeam = () => {
		const commandPhoto = document.querySelectorAll('.command__photo');
		commandPhoto.forEach(item => {
			let photoSrc;
			item.addEventListener('mouseenter', event => {
				photoSrc = event.target.src;
				event.target.src = event.target.dataset.img;
			});
			item.addEventListener('mouseleave', event => {
				event.target.src = photoSrc;
			});
		});
	};
	ourTeam();

	// Отправка данных с форм
	const sendForm = () => {
		const load = document.createElement('div');
		load.innerHTML = `<hr/><hr/><hr/><hr/>`;
		load.classList.add('load');

		const newModalView = (arg, error) => {
			let decriment = 1;
			const modalNew = document.getElementById('send-finaly');
			modalNew.classList.toggle('modal-news');
			const animeMessage = () => {
				decriment = decriment - 0.005;
				const requestId = requestAnimationFrame(animeMessage);
				modalNew.style.opacity = decriment;
				if (decriment < 0) {
					cancelAnimationFrame(requestId);
				}
			};
			animeMessage();

			if (arg === 0) {
				modalNew.innerHTML = `<div class="modal__title">
					Спасибо за обращение к нам! <br> Менеджер свяжется
			        с Вами в ближайшее время</div> `;
			} else {
				modalNew.innerHTML = `<div class="modal__title">
					${error}</div>`;
			}
		};

		const body = {};

		const validation = (form, statusMessage) => {
			form.querySelectorAll('input').forEach(elem => {
				elem.addEventListener('input', event => {
					statusMessage.textContent = '';
					if (event.target.classList.contains('form-phone')) {
						maskPhone('.form-phone');
					} else if (!event.target.classList.contains('form-email')) {
						elem.value = elem.value.replace(/[^а-я ]/gi, '');
						if (event.target.getAttribute('name') === "user_name") {
							elem.setAttribute('maxlength', '20');
						} else {
							elem.setAttribute('maxlength', '150');
						}
					}
				});
			});
		};

		const postData = body => {
			return fetch('./server.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});
		};

		const forms = document.querySelectorAll('form');
		forms.forEach(form => {
			const statusMessage = document.createElement('div');
			statusMessage.style.cssText = 'font-size: 2rem; color: red';
			validation(form, statusMessage);
			form.addEventListener('submit', event => {
				event.preventDefault();
				form.appendChild(statusMessage);
				form.appendChild(load);

				const formData = new FormData(form);
				formData.forEach((item, index) => {
					body[index] = item;
				});


				postData(body)
				.then(response => {
					if (response.status !== 200) {
						throw new Error('Что-то пошло не так...');
					}
					newModalView(0);
				})
				.catch(error => {
					newModalView(1, error);
				})
				.finally(() => {
					load.remove();
					form.querySelectorAll('input').forEach(elem => {
						elem.value = '';
					});
					setTimeout(newModalView, 5000);
				});
				
			});
		});
	};
	sendForm();
});

