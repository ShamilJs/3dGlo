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

export default ourTeam;