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
    nameCondition = 1
})

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
    searchResultList()
}

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
    searchResultList()
}

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
    searchResultList()
}

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
    searchResultList()
}

function searchResultList () {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ''; // Clear all cards

    for (let i = 0; i < currentCountryList.length ; i++) {
        createCountryCard(
            currentCountryList[i].name.common,
            currentCountryList[i].flags.svg,
            currentCountryList[i].region,
            currentCountryList[i].subregion,
            currentCountryList[i].population,
            currentCountryList[i].area,
        )
    }
}

///// SORTING FUNCTIONS & VARIABLES /////

let nameCondition = 0
let regionsCondition = 0
let subRegionsCondition = 0
let populationCondition = 0
let areaCondition = 0

// Sorting by Name
function sortNames() {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ''; // Clear all cards

    currentCountryList.sort((a,b) => a.name.common.localeCompare(b.name.common))

    if (nameCondition === 0) {
        cardsList()
        nameCondition = 1
    } else {
        cardsListReversed()
    }

}

// Sorting by Region
function sortRegions() {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ''; // Clear all cards

    currentCountryList.sort((a,b) => a.region.localeCompare(b.region))

    if (regionsCondition === 0) {
        cardsList()
        regionsCondition = 1
    } else {
        cardsListReversed()
    }
}

// Sorting by Sub Regions
function sortSubRegions() {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = '';

    currentCountryList.sort((a,b) => {
        if (a.subregion === "—") return 1;  // Move 'a' down
        if (b.subregion === "—") return -1; // Move 'b' down
        return a.subregion.localeCompare(b.subregion);
    })

    if (subRegionsCondition === 0) {
        cardsList()
        subRegionsCondition = 1
    } else {
        cardsListReversed()
    }
}

// Sorting by Population
function sortPopulation() {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ''; // Clear all cards

    currentCountryList.sort((a,b) => {
        if (a.population === "—") return 1;
        if (b.population === "—") return -1;
        return b.population - a.population
    })

    if (populationCondition === 0) {
        cardsList()
        populationCondition = 1
    } else {
        cardsListReversed()
    }
}

// Sorting by Area
function sortArea() {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ''; // Clear all cards

    currentCountryList.sort((a,b) => {
        if (a.area === "—") return 1;
        if (b.area === "—") return -1;
        return b.area - a.area
    })

    if (areaCondition === 0) {
        cardsList()
        areaCondition = 1
    } else {
        cardsListReversed()
    }
}

// Default order list
function cardsList () {
    for (let i = 0; i < 12; i++) {
        createCountryCard(
            currentCountryList[i].name.common,
            currentCountryList[i].flags.svg,
            currentCountryList[i].region,
            currentCountryList[i].subregion,
            currentCountryList[i].population,
            currentCountryList[i].area,
        )
    }
    nameCondition = 0
    regionsCondition = 0
    subRegionsCondition = 0
    populationCondition = 0
    areaCondition = 0
}

// Reverse order list
function cardsListReversed () {
    for (let i = currentCountryList.length - 1; i > -1 ; i--) {
        createCountryCard(
            currentCountryList[i].name.common,
            currentCountryList[i].flags.svg,
            currentCountryList[i].region,
            currentCountryList[i].subregion,
            currentCountryList[i].population,
            currentCountryList[i].area,
        )
    }
    nameCondition = 0
    regionsCondition = 0
    subRegionsCondition = 0
    populationCondition = 0
    areaCondition = 0
}

// Creating card model
function createCountryCard(countryName, flagUrl, region, subRegion, population, area) {
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

function goToPage(pageNumber) {
    page = pageNumber
}

function createPagination() {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ''; // Clear all cards
    currentCountryList.sort((a,b) => a.name.common.localeCompare(b.name.common))
    cardsList ()
    const pages = amountPages()

    for (let i = 0; i < pages; i++) {
        var pagination = document.getElementById('pagination')
        const newLi = document.createElement('li');
        newLi.className = 'page-item';
        newLi.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i + 1})">${i + 1}</a>`;

        // Select the parent <ul> and the "next-page" <li> element
        const nextPage = document.getElementById('next-page');

        // Insert the new <li> before the "next-page" <li>
        pagination.insertBefore(newLi, nextPage);
    }
}

function amountPages() {
    var listLength = currentCountryList.length
    var pages = Math.floor(listLength / 12)
    if ((listLength % 12) > 0) pages += 1
    return pages
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