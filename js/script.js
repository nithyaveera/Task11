//fetch countries data from restcountries
async function restcountriesdata() {
  let res =await fetch ("https://restcountries.com/v2/all")
  let data =await res.json()
  console.log(data)

  data.forEach((country) => {
    let countryname = country.name
    let countryflag = country.flag
    let capital = country.capital
    let region = country.region
    let countrycode = country.alpha2Code
    let lat = country.latlng && country.latlng.length > 0 ? country.latlng[0] : 'Nil';
    let lon = country.latlng && country.latlng.length > 1 ? country.latlng[1] : 'Nil';
   
    let column = document.createElement("div")
    column.classList.add("col-sm-6", "col-md-4", "col-lg-4", "col-xl-4", "mb-4")
    row.append(column)

    let cardcontainer = document.createElement("div")
    cardcontainer.classList.add("card", "mt-4", "h-100")
    column.append(cardcontainer)
   
    let heading = document.createElement("div")
    heading.classList.add("card-header")
    heading.setAttribute("id", "cardhead")
    heading.innerText = `${countryname}`
    cardcontainer.append(heading)

    let cardbody = document.createElement("div")
    cardbody.classList.add("card-body")
    cardcontainer.append(cardbody)

    let flag = document.createElement("img")
    flag.classList.add("card-img-top")
    flag.setAttribute("src", `${countryflag}`)
    cardbody.append(flag)
    
    let cardtext = document.createElement("div")
    cardtext.classList.add("card-text")
    cardbody.append(cardtext)
   
    let counrtycapital = document.createElement("h6")
    counrtycapital.innerText = `Capital : ${capital}`
    cardtext.append(counrtycapital)

    let countryregion = document.createElement("h6")
    countryregion.innerText = `Region : ${region}`
    cardtext.append(countryregion)

    let code = document.createElement("h6")
    code.innerText = `Country Code : ${countrycode}`
    cardtext.append(code)

    let laning = document.createElement("h6")
    laning.innerText = `Latitude : ${lat} , Longitude : ${lon}`
    cardtext.append(laning)

    let btn = document.createElement("button")
    btn.innerText = "Click for Weather"
    cardtext.append(btn)

    let divcontainer = document.createElement("div")
    divcontainer.style.display = "none"
    divcontainer.setAttribute("id", "weathercon")
    cardtext.append(divcontainer)

    btn.addEventListener("click", async () => {
      let weatherforcounry = await weatherfun(country)
      divcontainer.innerHTML = " "
      if (divcontainer.style.display == "block") {
        divcontainer.style.display = "none"
         btn.innerText = "Click for Weather"
        
      }
      else {
        divcontainer.style.display = "block"
         btn.innerText = "Cancel"
        let temp = document.createElement("p")
        temp.innerText = `Temperature :${weatherforcounry.main.temp}`
        divcontainer.append(temp)

        let hum = document.createElement("p")
        hum.innerText = `Humidity : ${weatherforcounry.main.humidity}`
        divcontainer.append(hum)

        let pre = document.createElement("p")
        pre.innerText = `Pressure :${weatherforcounry.main.pressure}`
        divcontainer.append(pre)
        
        let visible = document.createElement("p")
        visible.innerText = `Visibility:${weatherforcounry.visibility}`
        divcontainer.append(visible)
      }
      })
  

 })
  
}
//fetch weather data from openweather app
async function weatherfun(country) {
  let lat = country.latlng && country.latlng.length > 0 ? country.latlng[0] : 'Nil';
  let lon = country.latlng && country.latlng.length > 1 ? country.latlng[1] : 'Nil';
  let apikey = '4fc88ae60ba5f9bce3c84026f02119db'
  let weatherres = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
  let weatherdata = await weatherres.json()
  console.log(weatherdata)
  return weatherdata
}
restcountriesdata()

// create html element
let bodyy = document.createElement("div")
bodyy.classList.add("container-fluid")
document.body.append(bodyy)

let container = document.createElement("div")
container.classList.add("container")
bodyy.append(container)

let heading = document.createElement("h1")
heading.innerText = "Restcountries & Weather using fetch API"
heading.setAttribute("id", "title")
heading.setAttribute("class","text-center")
heading.style.textAlign = "center"
heading.style.background = "#e8b5f7"
heading.style.borderRadius="12px"
container.append(heading)

let row = document.createElement("div")
   row.classList.add("row")
   container.append(row)
  