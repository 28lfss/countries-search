"use strict";
var apiData = {}
var currentCountryList = []

fetch("https://restcountries.com/v3.1/all", {
    headers:{
       'Accept': 'application/json'
    }
})
.then(res => res.json())
.then(data => {
    apiData = data
    currentCountryList = data
    apiData.sort((a,b) => a.name.common.localeCompare(b.name.common))
    for (let i = 0; i < apiData.length; i++) {
        if (apiData[i].subregion === undefined) apiData[i].subregion = "—"
    }
    createPagination()
    goToPage(0)
    nameCondition = 0
})


///// NAVIGATION BY SEARCH FUNCTIONS /////

function navigationBySearch (event) {
    event.preventDefault()
    currentCountryList = []
    var input, filter, txtValue
    input = document.getElementById("input-search")
    filter = input.value.toUpperCase()

    apiData.sort((a,b) => a.name.common.localeCompare(b.name.common))

    for (let i = 0; i < apiData.length - 1; i++) {
            txtValue = apiData[i].name.common
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            currentCountryList.push(apiData[i])
        }
    }
    createPagination()
    goToPage(0)
}

function searchResultList () {
    clearCardContainer() // Clear all cards

    createPagination()
    goToPage(0)
}


///// SORTING FUNCTIONS & VARIABLES /////

// Sorting conditions
let currentFilterCondition = 0
let nameCondition = 1
let regionsCondition = 1
let subRegionsCondition = 1
let populationCondition = 1
let areaCondition = 1

// Sorting by Name
function sortNames() {
    regionsCondition = 1
    subRegionsCondition = 1
    populationCondition = 1
    areaCondition = 1

    currentFilterCondition = nameCondition === 0 ? 1 : 0
    nameCondition = currentFilterCondition

    clearCardContainer()
    currentCountryList.sort((a,b) => a.name.common.localeCompare(b.name.common))

    createPagination()
    goToPage(0)
}

// Sorting by Region
function sortRegions() {
    nameCondition = 1
    subRegionsCondition = 1
    populationCondition = 1
    areaCondition = 1

    currentFilterCondition = regionsCondition === 0 ? 1 : 0
    regionsCondition = currentFilterCondition

    clearCardContainer()
    currentCountryList.sort((a,b) => a.region.localeCompare(b.region))

    createPagination()
    goToPage(0)
}

// Sorting by Sub Regions
function sortSubRegions() {
    nameCondition = 1
    regionsCondition = 1
    populationCondition = 1
    areaCondition = 1

    currentFilterCondition = subRegionsCondition === 0 ? 1 : 0
    subRegionsCondition = currentFilterCondition

    clearCardContainer()
    currentCountryList.sort((a,b) => {
        if (a.subregion === "—") return 1;  // Move 'a' down
        if (b.subregion === "—") return -1; // Move 'b' down
        return a.subregion.localeCompare(b.subregion);
    })

    createPagination()
    goToPage(0)
}

// Sorting by Population
function sortPopulation() {
    nameCondition = 1
    regionsCondition = 1
    subRegionsCondition = 1
    areaCondition = 1

    currentFilterCondition = populationCondition === 0 ? 1 : 0
    populationCondition = currentFilterCondition

    clearCardContainer()
    currentCountryList.sort((a,b) => {
        if (a.population === "—") return 1;
        if (b.population === "—") return -1;
        return b.population - a.population
    })
    createPagination()
    goToPage(0)
}

// Sorting by Area
function sortArea() {
    nameCondition = 1
    regionsCondition = 1
    subRegionsCondition = 1
    populationCondition = 1

    currentFilterCondition = areaCondition === 0 ? 1 : 0
    areaCondition = currentFilterCondition

    clearCardContainer()
    currentCountryList.sort((a,b) => {
        if (a.area === "—") return 1;
        if (b.area === "—") return -1;
        return b.area - a.area
    })

    createPagination()
    goToPage(0)
}


///// FILTERS FUNCTIONS /////

// Filter by Region
function filterRegion (regionName) {
    currentCountryList = []
    var parameter, filter, txtValue
    parameter = regionName
    filter = parameter.toUpperCase()

    apiData.sort((a,b) => a.name.common.localeCompare(b.name.common))

    for (let i = 0; i < apiData.length - 1; i++) {
            txtValue = apiData[i].region
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            currentCountryList.push(apiData[i])
        }
    }
    createPagination()
    goToPage(0)
}

// Filter by Sub Region
function filterSubRegion (subRegionName) {
    currentCountryList = []
    var parameter, filter, txtValue
    parameter = subRegionName
    filter = parameter.toUpperCase()

    apiData.sort((a,b) => a.name.common.localeCompare(b.name.common))

    for (let i = 0; i < apiData.length - 1; i++) {
            txtValue = apiData[i].subregion
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            currentCountryList.push(apiData[i])
        }
    }
    createPagination()
    goToPage(0)
}

// Filter by Population amount
function filterPopulation (min, max) {
    currentCountryList = []
    var minPopulation, maxPopulation, populationValue
    minPopulation = min
    maxPopulation = max
    apiData.sort((a,b) => a.name.common.localeCompare(b.name.common))

    for (let i = 0; i < apiData.length - 1; i++) {
            populationValue = apiData[i].population
        if (minPopulation <= populationValue && (populationValue < maxPopulation || maxPopulation === 'unlimited')) {
            currentCountryList.push(apiData[i])
        }
    }
    createPagination()
    goToPage(0)
}


///// GENERATING CARDS & PAGINATION /////

// Create the cards based in the current list defined by goToPage() function
function cardsList (i) {
    let stopLoop = 'break'
    if (currentCountryList[i] === undefined) {
        return stopLoop
    } else {
        createCountryCard(
            currentCountryList[i].flags.svg,
            currentCountryList[i].name.common,
            currentCountryList[i].region,
            currentCountryList[i].subregion,
            currentCountryList[i].population,
            currentCountryList[i].area,
        )
    }
}

// Create the card HTML elements
function createCountryCard(flagUrl, countryName, region, subRegion, population, area) {
        var cardContainer = document.getElementById("card-container")

        var cardDiv = document.createElement("div") // class "card"
        var flagImg = document.createElement("img")
        var cardBody = document.createElement("div") // class "card-body"
        var cardTitle = document.createElement("h5")
        var regionParagraph = document.createElement("p")
        var subRegionParagraph = document.createElement("p")
        var populationParagraph = document.createElement("p")
        var areaParagraph = document.createElement("p")

        cardDiv.className = "card"
        cardDiv.addEventListener('click', function() {window.location.href = '/country/' + countryName})
        cardBody.className = "card-body"
        cardTitle.className = "card-title"

        flagImg.src = flagUrl
        cardTitle.appendChild(document.createTextNode(countryName))
        regionParagraph.appendChild(document.createTextNode("Region: " + region))
        subRegionParagraph.appendChild(document.createTextNode("Sub Region: " + subRegion))
        populationParagraph.appendChild(document.createTextNode("Population: " + population))
        areaParagraph.appendChild(document.createTextNode("Area: " + area))

        cardBody.appendChild(cardTitle)
        cardBody.appendChild(regionParagraph)
        cardBody.appendChild(subRegionParagraph)
        cardBody.appendChild(populationParagraph)
        cardBody.appendChild(areaParagraph)
        cardDiv.appendChild(flagImg)
        cardDiv.appendChild(cardBody)
        cardContainer.appendChild(cardDiv)
}

// Used to clear all the cards inside "card-container"
function clearCardContainer() {
    var cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ''
}

// Get the amount of pages necessary
function amountPages() {
    var listLength = currentCountryList.length
    var pages = Math.floor(listLength / 12)
    if ((listLength % 12) > 0) pages += 1
    return pages
}

// Create the pagination HTML elements per page
function createPagination() {
    var pagination = document.getElementById('pagination')
    pagination.innerHTML = ''
    const pages = amountPages()

    for (let i = 0; i < pages; i++) {
        const newLi = document.createElement('li')
        newLi.className = 'page-item'
        newLi.id = `page-${i + 1}`
        newLi.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i})">${i + 1}</a>`
        const nextPage = document.getElementById('next-page')
        pagination.appendChild(newLi)
    }
}

// Show the chosen page
function goToPage(pageNumber) {
    clearCardContainer()
    let firstArrValue, lastArrValue
    firstArrValue = pageNumber === 0 ? 0 : (pageNumber * 12)
    lastArrValue = (pageNumber + 1) * 12

    if (currentFilterCondition === 0) {
        for(firstArrValue; firstArrValue < lastArrValue; firstArrValue++) {
            let result = cardsList(firstArrValue)
            if (result === 'break') {
                break
            }
        }
    } else {
        currentCountryList.reverse()
        for(firstArrValue; firstArrValue < lastArrValue; firstArrValue++) {
            let result = cardsList(firstArrValue)
            if (result === 'break') {
                break
            }
        }
    }
}

/*  DB IMPLEMENTATION
    fetch(
        "/api/post_country_list",{
        method: "POST",
        headers: {
            Accept : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(res)
    })
*/