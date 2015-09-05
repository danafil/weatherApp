$(function(){
    moment.locale('ua', {
    months : "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),
    monthsShort : "січ._лют._бер_квіт._трав._черв._лип._серп._вер._жовт._лист._груд.".split("_")
    });

    moment.locale('ua');

    $('#btnGetWeather').click(function () {
        if ($('#inputCityName').val() == '')
            return false;  
        getWeatherByCity('ua', dataReceived, showError, $('#inputCityName').val());
    });
    
    getWeatherData('ua', dataReceived, showError);
    

    function dataReceived(data) {
        var offset = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC  в мілісекундах
        var city = data.city.name;
        var country = data.city.country;
        $("#weatherTable").children().remove();

        var today = data.list[0];
        populateCurrentDay(
            today.weather[0].icon,
            Math.round(today.temp.day) + '&deg;C',
            today.temp.morn + '&deg;C',
            today.temp.day + '&deg;C',
            today.temp.eve + '&deg;C',
            today.temp.night + '&deg;C',
            today.pressure,
            today.humidity  + '%',
            today.speed + 'м/с',
            today.weather[0].description
        );
        data.list.shift();
        $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offset); // конвертуємо час з UTC у локальний
            addWeather(
                this.weather[0].icon,
                moment(localTime).format('D MMMM YYYY'),   // Використовуємо moment.js для представлення дати
                this.weather[0].description,
                Math.round(this.temp.day) + '&deg;C'
            );

        });
        $('#location').html(city + ', <b>' + country + '</b>'); // Додаємо локацію на сторінку
    }

    function addWeather(icon, day, condition, temp){
        var markup = '<li>'+
                '<span>' + day + '</span>' +
                '<span>' + getIcon(icon) + '</span>' +
                '<span>' + temp + '</span>' +
                '<span>' + condition + '</span>'
            + '</li>';
        var weatherTable = $('#weatherTable');
        weatherTable.append(markup); // Додаємо рядок до таблиці
    }

    function populateCurrentDay(icon, temp, morn, day, eve, night, pressure, humidity, wind, condition){
        $('#today-icon').html(getIcon(icon));
        $('#temp').html(temp);
        $('#morning').html(morn);
        $('#noon').html(day);
        $('#eve').html(eve);
        $('#night').html(night);
        $('#pressure').html(pressure);
        $('#humidity').html(humidity);
        $('#wind').html(wind);
        $('#condition').html(condition);
    }

    function showError(msg){
        $('#error').html('Сталася помилка: ' + msg);
    }

    function getIcon(icon){
        return '<img src="images/icons/'+ ( (icon === '10ddd')? '10d' : icon) +'.png" />';
    }
});
