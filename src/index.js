// eslint-disable-next-line strict
'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);


import "es6-promise";

import "fetch-polyfill";

import "formdata-polyfill";


import 'mdn-polyfills/Node.prototype.append';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import smoothDocument from './modules/smoothDocument';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calculator from './modules/calculator';
import ourTeam from './modules/ourTeam';
import sendForm from './modules/sendForm';



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