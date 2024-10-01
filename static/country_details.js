"use strict";
const url = window.location.href // Get the full URL
const countryUrlCode = url.split('/details/')[1]
var apiData = {}

fetch("https://restcountries.com/v3.1/alpha/" + countryUrlCode, {
    headers:{
        'Accept': 'application/json'
    }
})
.then(res => res.json())
.then(data => {
    apiData = data
    changeUndefinedValue()
    getDetails()
})

document.getElementById("goBackBtn").addEventListener("click", function() {
    window.history.back()
})

function changeUndefinedValue () {
    if (apiData[0].flags.png === undefined) apiData[0].flags.svg = "—"
    if (apiData[0].name.common === undefined) apiData[0].name.common = "—"
    if (apiData[0].name.official === undefined) apiData[0].name.official = "—"
    if (apiData[0].capital === undefined) apiData[0].capital = "—"
    if (apiData[0].region === undefined) apiData[0].region = "—"
    if (apiData[0].subregion === undefined) apiData[0].subregion = "—"
    if (apiData[0].population === undefined) apiData[0].population = "—"
    if (apiData[0].area === undefined) apiData[0].area = "—"
    if (apiData[0].currencies === undefined) apiData[0].currencies = "—"
    if (apiData[0].timezones === undefined) apiData[0].timezones = "—"
    if (apiData[0].tld === undefined) apiData[0].tld = "—"
    if (apiData[0].idd === undefined) apiData[0].idd = "—"
    if (apiData[0].languages === undefined) apiData[0].languages = "—"

}

function getDetails () {
    showDetails(
        apiData[0].flags.svg,
        apiData[0].name.common,
        apiData[0].name.official,
        apiData[0].capital,
        apiData[0].region,
        apiData[0].subregion,
        apiData[0].population,
        apiData[0].area,
        apiData[0].currencies,
        apiData[0].timezones,
        apiData[0].tld,
        apiData[0].idd,
        apiData[0].languages,
    )
}

function showDetails (flag, name, officialName, capital, region, subRegion, population, area, currency, timezone, tld, idd, languages) {
    const flagId = document.getElementById('flag')
    const nameId = document.getElementById('name')
    const officialNameId = document.getElementById('official')
    const capitalId = document.getElementById('capital')
    const regionId = document.getElementById('region')
    const subRegionId = document.getElementById('sub-region')
    const areaId = document.getElementById('area')
    const populationId = document.getElementById('population')
    const currencyId = document.getElementById('currency')
    const timezoneId = document.getElementById('timezone')
    const tldId = document.getElementById('internet-code')
    const iddId = document.getElementById('calling-code')
    const languagesId = document.getElementById('languages')

    let currencyInfo
    let languagesInfo = []
    for(let key in currency) {
        currencyInfo = `${currency[key].symbol} (${currency[key].name})`
    }
    for(let key in languages) {
        languagesInfo.push(key)
    }
    for(let i = 0; i < languagesInfo.length; i++) {
        let currentLanguage = languagesInfo[i]
        if ( i === languagesInfo.length - 1) {
            languagesId.appendChild(document.createTextNode(languages[currentLanguage]))
        } else {
            languagesId.appendChild(document.createTextNode(
                `${languages[currentLanguage]}, `
            ))
        }
    }
    flagId.src = flag
    nameId.appendChild(document.createTextNode(name))
    officialNameId.appendChild(document.createTextNode(officialName))
    capitalId.appendChild(document.createTextNode(capital))
    regionId.appendChild(document.createTextNode(region))
    subRegionId.appendChild(document.createTextNode(subRegion))
    areaId.appendChild(document.createTextNode(`${area}km²`))
    populationId.appendChild(document.createTextNode(population))
    currencyId.appendChild(document.createTextNode(currencyInfo))
    timezoneId.appendChild(document.createTextNode(timezone[0]))
    tldId.appendChild(document.createTextNode(tld[0]))
    iddId.appendChild(document.createTextNode(idd.root))
}



