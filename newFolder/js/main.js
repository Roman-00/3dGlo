'use strict';

const daysWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
	today = document.querySelector('.today'),
	dateNow = new Date(),
	hours = dateNow.getHours(),
	days = dateNow.getDay(),
	timeNow = dateNow.toLocaleTimeString('ru'),
	year = dateNow.getFullYear(),
	time = dateNow.getTime(),
	newYear = dateNow.setFullYear(year + 1, 1, 1);

let goodNow = '';
if (hours < 4) {
	goodNow = 'Доброй ночи';
} else if (hours < 10) {
	goodNow = 'Доброе утро';
} else if (hours < 19) {
	goodNow = 'Добрый день';
} else {
	goodNow = 'Добрый вечер';
}

function appendDate(text) {
	const div = document.createElement('div');
	div.textContent = text;
	today.append(div);
}

appendDate(goodNow);
appendDate('Сегодня: ' + daysWeek[days]);
appendDate('Текущее время: ' + timeNow);
appendDate('До нового года осталось ' + Math.floor((newYear - time) / 1024 / 60 / 60 / 24) + ' дней');
