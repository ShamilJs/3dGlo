	
import maskPhone from './maskPhone';

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
						elem.setAttribute('minlength', '12');
					}
					if (event.target.classList.contains('form-email')) {
						elem.value = elem.value.replace(/[^A-Za-z0-9_\-\.@]/gi, '');
					}
					if (event.target.getAttribute('name') === "user_name") {
						elem.value = elem.value.replace(/[^а-я ]/gi, '');
						elem.setAttribute('maxlength', '20');
					}

					if (event.target.getAttribute('name') === "user_message") {
						elem.value = elem.value.replace(/[a-z]/gi, '');
						elem.setAttribute('maxlength', '150');
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

export default sendForm;