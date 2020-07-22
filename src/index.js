// eslint-disable-next-line strict
'use strict';

import "@babel/polyfill";
import elementClosest from 'element-closest';
elementClosest(window);
import "es6-promise";
import "fetch-polyfill";
import "formdata-polyfill";
import 'mdn-polyfills/Node.prototype.append';
import 'mdn-polyfills/Node.prototype.remove';
import 'nodelist-foreach-polyfill';
import 'promise-polyfill';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
import 'whatwg-fetch';












import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import smoothDocument from './modules/smoothDocument';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calculator from './modules/calculator';
import ourTeam from './modules/ourTeam';
import sendForm from './modules/sendForm';
import sliderCarousel from './modules/sliderСarousel';


	// Timer
	countTimer();
	// меню
	toggleMenu();
	// открытие-закрытие модального окна
	togglePopup();
	// плавный переход по меню
	smoothDocument();
	// табы
	tabs();
	// слайдер
	slider();
	// калькулятор
	calculator();
	// наша команда--> смена карточек
	ourTeam();
	// Отправка данных с форм
	sendForm();

	const carousel = new sliderCarousel({ main: '.companies-wrapper',
										wrap: '.companies-hor',
										slidesToShow: 4,
										infinity: true,
										responsive: [{
											breakpoint: 1024,
											slidesToShow: 3
										},
										{
											breakpoint: 768,
											slidesToShow: 2
										},
										{
											breakpoint: 576,
											slidesToShow: 1
										}
									]
									 });
	carousel.init();
