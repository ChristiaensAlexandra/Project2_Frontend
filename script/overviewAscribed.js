'use strict'
let frequency,
  chosenDays = [],
  baseURL = 'https://localhost:44374/api/',
  //payload = [],
  counter = 0,
  chosenItems,
  selects
const postCP = function (url, payload) {
  console.log('add client to progressive scheme')
  let body = JSON.stringify(payload)
  console.log(body)
  fetch(`${baseURL}${url}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })
    .then(res => res.json())
    .then(data => {
      console.log(data), console.log(data) //(window.location.href = backPage);
    })
    .catch(err => console.log(err))
}
const ShowInputs = function (items) {
  let html = ''
  for (let client of items.allChosenClients) {
    html += `<div class="c-title">${client.firstName} ${client.lastName}</div>`
    for (let ps of items.allChosenPs) {
      html += `
            <div>${ps.name}</div>
            <p>
            <label class="c-label" for="points">Te verdienen muntjes bij het afronden van het stappenplan </label>
            <input class="c-input js-points" type="number" name="points" min="1" max="100" placeholder="1 tot 100" />
        </p>
            <p>
            <label class="c-label" for="Frequency">Herhaling </label>
            <span class="c-custom-select">
                <select class="c-input c-custom-select__input js-select" name="Frequency" placeholder="keuze">
                    <option disabled selected hidden>Maak je keuze...</option>
                    <option class="c-custom__option">Nooit</option>
                    <option class="c-custom__option">Dagelijks</option>
                    <option class="c-custom__option">Elke ... dagen</option>
                    <option class="c-custom__option">Wekelijks</option>
                </select>
                <svg class="c-custom-select__symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M7,10l5,5,5-5Z" />
                </svg>
            </span>
        </p>

        <!-- Hier begint de kalender die enkel getoont moet worden nadat je de herhaling hebt gekozen-->
        <p>
            <label class="c-label" for="StartDate">Begindatum </label>
            <span class="c-custom-select">
                <input class="c-input c-custom-select__input js-startDate" name="StartDate" type="date" />
                <svg class="c-custom-select__symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M7,10l5,5,5-5Z" />
                </svg>
                <!-- <div class="c-cal__week">
        <span>M</span> <span>D</span><span>W</span> <span>D</span> <span>V</span> <span>Z</span>
        <span>Z</span>
    </div> -->
            </span>
        </p>
        <p>
            <label class="c-label" for="EndDate">Einddatum </label>
            <span class="c-custom-select">
                <input class="c-input c-custom-select__input js-endDate" name="EndDate" type="date" />
                <svg class="c-custom-select__symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M7,10l5,5,5-5Z" />
                </svg>
                <!-- <div class="c-cal__week">
        <span>M</span> <span>D</span><span>W</span> <span>D</span> <span>V</span> <span>Z</span>
        <span>Z</span>
    </div> -->
            </span>
        </p>
        <p class="c-time">
            <label class="c-label" for="time">Uur: &nbsp</label>
            <input class="c-input js-time" type="time" id="time" name="time" placeholder="00:00" />
        </p>`
      counter++
    }
  }
  document.querySelector('.js-frequency').innerHTML = html
  selects = document.querySelectorAll('.js-select')
  ListenToSelect(selects)
}
const makePayload = function (i, clientId, progressiveSchemeId) {
  let points = document.querySelectorAll('.js-points')
  let startDate = document.querySelectorAll('.js-startDate')
  let endDate = document.querySelectorAll('.js-endDate')
  let time = document.querySelectorAll('.js-time')
  console.log(time)
  let url

  let frequency = selects[i].value
  console.log(selects)
  console.log(frequency)
  switch (frequency) {
    case 'Dagelijks':
      url = 'clientprogressiveScheme/everyday'
      let cpDaily = [
        {
          clientId: clientId,
          progressiveSchemeId: progressiveSchemeId,
          progressiveSchemeCoins: parseInt(points[i].value),
          startDate: startDate[i].value,
          endDate: endDate[i].value,
          time: time[i].value
        }
      ]
      //payload.push(cpDaily)
      console.log(cpDaily)
      postCP(url, cpDaily)
      return url
    case 'Wekelijks':
      console.log(chosenDays)
      url = 'clientprogressiveScheme/everyWeek'

      let cpWeekly = [
        {
          clientId: clientId,
          progressiveSchemeId: progressiveSchemeId,
          progressiveSchemeCoins: parseInt(points[i].value),
          startDate: startDate[i].value,
          endDate: endDate[i].value,
          time: time[i].value,
          weekdays: chosenDays
        }
      ]
      //payload.push(cpWeekly)
      console.log(cpWeekly)
      postCP(url, cpWeekly)
      return url
    case 'Elke ... dagen':
      url = 'clientprogressiveScheme/everyFewDays'

      let cpEveryFewDays = [
        {
          numberOfDays: parseInt(numberOfDays.value),
          clientId: clientId,
          progressiveSchemeId: progressiveSchemeId,
          progressiveSchemeCoins: parseInt(points[i].value),
          startDate: startDate[i].value,
          endDate: endDate[i].value,
          time: time[i].value
        }
      ]
      //payload.push(cpEveryFewDays)
      console.log(cpEveryFewDays)
      postCP(url, cpEveryFewDays)

      return url
  }

  // postCP(url, payload)
}

const getDayOfWeek = function (day) {
  switch (day) {
    case 'Ma':
      return 'monday'
    case 'Di':
      return 'tuesday'
    case 'Wo':
      return 'wednesday'
    case 'Do':
      return 'thursday'
    case 'Vr':
      return 'friday'
    case 'Za':
      return 'saturday'
    case 'Zo':
      return 'sunday'
  }
}
const ListenToSelect = function (selects) {
  for (let select of selects) {
    select.addEventListener('change', function () {
      console.log(this.value)
      frequency = this.value
      switch (frequency) {
        case 'Dagelijks':
          return
        case 'Elke ... dagen':
          this.parentElement.innerHTML += `<div class="c-numberOfDays"><label class="c-label" for="numberOfDays">Elke&nbsp 
                <input class="c-input c-numberOfDays-input js-numberOfDays" type="number" name="numberOfDays" min="1" max="6" placeholder="1 tot 6" /> &nbspdagen</label></div>`
          let numberOfDaysInput = document.querySelector('.js-numberOfDays')
          ListenToNumberOfDays(numberOfDaysInput)
          return
        case 'Wekelijks':
          this.parentElement.innerHTML += `<div class="c-days"> <span class= "c-day" >Ma</span> <span class= "c-day">Di</span> <span class= "c-day">Wo</span> <span class= "c-day">Do</span> <span class= "c-day">Vr</span> <span class= "c-day">Za</span>
                <span class= "c-day">Zo</span> </div>`
          let allDays = document.querySelectorAll('.c-day')
          console.log(allDays)
          listenToDays(allDays)
          return
      }
    })
  }
}

const ListenToNumberOfDays = function (number) {
  number.addEventListener('change', function () {
    let numberOfDays = this.value
    console.log('numberofdays' + numberOfDays)
  })
}
const listenToDays = function (days) {
  for (let day of days) {
    day.addEventListener('click', function () {
      console.log(this.innerHTML)
      let day = getDayOfWeek(this.innerHTML)
      chosenDays.push(day)

      this.classList.add('c-selected')
    })
  }
}
const ListenToSubmit = function (button) {
  button.addEventListener('click', function (e) {
    e.preventDefault()
    let i = 0
    for (let client of chosenItems.allChosenClients) {
      let clientId = client.id
      for (let ps of chosenItems.allChosenPs) {
        let progressiveSchemeId = ps.id
        makePayload(i, clientId, progressiveSchemeId)
        i++
      }
    }
  })
}
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded - contact')
  chosenItems = JSON.parse(sessionStorage.items)
  console.log(chosenItems)
  let submit = document.querySelector('.js-submitbutton')
  ShowInputs(chosenItems)

  ListenToSubmit(submit)
})
