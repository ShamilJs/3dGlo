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


export default toggleMenu;