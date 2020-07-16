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

	export default smoothDocument;