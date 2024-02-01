const weatherApp = {
    API_KEY: '',
    isLoading: false,
    selector: document.querySelector('.weather'),
    insetData: function (element,dataToInset) {
        this.selector.querySelector(element).innerText = dataToInset;
    },
    fetchWeather: async function (cityName) {
        this.isLoading = true
        // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.API_KEY}&lang=ua&units=metric`)
        //     .then((res) => res.json())
        //     .then(data => this.renderWeather(data))
        //     .catch((e) => {alert(e.message)})
        //     .finally(() => {
        //         this.isLoading = false
        //     })

        // let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.API_KEY}&lang=ua&units=metric`)
        // let data = await result.json()
        // this.renderWeather(data)
        // this.isLoading = false
    },
    renderWeather: function (info) {
        this.insetData('.name', info.name)
        this.insetData('.summary', info.weather[0].description)
        this.insetData('.temp', Math.round(info.main.temp) + "°C")
        this.insetData('.feels-like', Math.round(info.main.feels_like) + "°C")
        this.insetData('.humidity', "Humidity: " + info.main.humidity + "%")
        this.insetData('.wind', "Wind speed: " + Math.round(info.wind.speed) + " км/год" )

        this.selector.querySelector('.icon').setAttribute('src',`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`)
        this.selector.querySelector('.icon').setAttribute('alt',info.weather[0].main)

    }
}

document.forms.search.addEventListener('submit', function () {
    event.preventDefault()
    weatherApp.fetchWeather(document.forms[0].elements.city.value)
    document.forms[0].reset()
})



// Аргументами функции будут:
// - функция, которую надо «откладывать»;
// - интервал времени, спустя которое функцию следует вызывать.
function debounce(callee, timeoutMs) {
    // Как результат возвращаем другую функцию.
    // Это нужно, чтобы мы могли не менять другие части кода,
   // чуть позже мы увидим, как это помогае.

    return function perform(...args) {

        // В переменной previousCall мы будем хранить
        // временную метку предыдущего вызова...
        let previousCall = this.lastCall

        // ...а в переменной текущего вызова —
        // временную метку нынешнего момента.
        this.lastCall = Date.now()

        // Нам это будет нужно, чтобы потом сравнить,
        // когда была функция вызвана в этот раз и в предыдущий.
        // Если разница между вызовами меньше, чем указанный интервал,
        // то мы очищаем таймаут...
        if (previousCall && this.lastCall - previousCall <= timeoutMs) {
            clearTimeout(this.lastCallTimer)
        }

        // ...который отвечает за непосредственно вызов функции-аргумента.
        // Обратите внимание, что мы передаём все аргументы ...args,
        // который получаем в функции perform —
        // это тоже нужно, чтобы нам не приходилось менять другие части кода.
        console.log(...args)

        this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)

        // Если таймаут был очищен, вызова не произойдёт
        // если он очищен не был, то callee вызовется.
        // Таким образом мы как бы «отодвигаем» вызов callee
        // до тех пор, пока «снаружи всё не подуспокоится».
    }
}
function test(str) {
    console.log(str)
}
document.querySelector('input').addEventListener('input', debounce(test(), 5000))
