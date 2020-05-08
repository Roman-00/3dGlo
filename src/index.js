'use strict';

import "@babel/polyfill";
import 'formdata-polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'es6-promise';
import 'fetch-polyfill';


import smoothScrolling from './modules/smoothScrolling';
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import photoReplacement from './modules/photoReplacement';
import validationCalc from './modules/validationCalc';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Плавная прокрутка по ссылкам
smoothScrolling();

// Timer
countTimer('30 April 2020');

//Меню
toggleMenu();

//popup
togglePopUp();

//Табы
tabs();

//Слайдер
slider();

// Function Our Teams photo replacement
photoReplacement();

//validation calc
validationCalc();

// Калькулятор
calc(100);

// Send Form
sendForm('form1');
sendForm('form2');
sendForm('form3');
