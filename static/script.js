"use strict";
var apiData = {}
var results = []

fetch("https://restcountries.com/v3.1/all", {
    headers:{
       'Accept': 'application/json'
    }
})
.then(res => res.json())
.then(data => {
    apiData = data
    apiData.sort((a,b) => a.name.common.localeCompare(b.name.common))
    for (let i = 0; i < apiData.length; i++) {
        if (apiData[i].subregion === undefined) apiData[i].subregion = "—"
        if (apiData[i].population === 0) apiData[i].population = "—"
    }

    cardsList()
    nameCondition = 1
})

function navigationBySearch (event) {
    event.preventDefault()
    results = []
    var input, filter, container, cardTitle, txtValue
    input = document.getElementById("input-search")
    filter = input.value.toUpperCase()
    container = document.getElementById("card-container")

    cardTitle = document.getElementsByClassName("card-title")[0].innerHTML

    console.log(cardTitle)

    for (let i = 0; i < apiData.length - 1; i++) {
            txtValue = document.getElementsByClassName("card-title")[i].innerHTML
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            results.push(apiData[i])
        } else {
            console.log("No similarity!")
        }
    }
    searchResultList()
}

function searchResultList () {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ''; // Clear all cards

    for (let i = 0; i < results.length ; i++) {
        createCountryCard(
            results[i].name.common,
            results[i].flags.svg,
            results[i].region,
            results[i].subregion,
            results[i].population,
        )
    }

    nameCondition = 0
    regionsCondition = 0
    subRegionsCondition = 0
    populationCondition = 0
}

//////////////////////////////////////////////////////

let nameCondition = 0
let regionsCondition = 0
let subRegionsCondition = 0
let populationCondition = 0

function sortNames() {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ''; // Clear all cards


    apiData.sort((a,b) => a.name.common.localeCompare(b.name.common))

    if (nameCondition === 0) {
        cardsList()
        nameCondition = 1
    } else {
        cardsListReversed()
    }

}
function sortRegions() {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ''; // Clear all cards

    apiData.sort((a,b) => a.region.localeCompare(b.region))

    if (regionsCondition === 0) {
        cardsList()
        regionsCondition = 1
    } else {
        cardsListReversed()
    }
}
function sortSubRegions() {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ''; // Clear all cards
//    var undefinedList = []

    apiData.sort((a,b) => {
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
function sortPopulation() {
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ''; // Clear all cards

    apiData.sort((a,b) => {
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

function cardsList () {
    for (let i = 0; i < apiData.length; i++) {
        createCountryCard(
            apiData[i].name.common,
            apiData[i].flags.svg,
            apiData[i].region,
            apiData[i].subregion,
            apiData[i].population,
        )
    }
    nameCondition = 0
    regionsCondition = 0
    subRegionsCondition = 0
    populationCondition = 0
}

function cardsListReversed () {
    for (let i = apiData.length - 1; i > 0 ; i--) {
        createCountryCard(
            apiData[i].name.common,
            apiData[i].flags.svg,
            apiData[i].region,
            apiData[i].subregion,
            apiData[i].population,
        )
    }
    nameCondition = 0
    regionsCondition = 0
    subRegionsCondition = 0
    populationCondition = 0
}

function createCountryCard(countryName, flagUrl, region, subRegion, population) {
        var cardContainer = document.getElementById("card-container")

        var cardDiv = document.createElement("div") // class "card"
        var flagImg = document.createElement("img")
        var cardBody = document.createElement("div") // class "card-body"
        var cardTitle = document.createElement("h5")
        var regionParagraph = document.createElement("p")
        var subRegionParagraph = document.createElement("p")
        var populationParagraph = document.createElement("p")

        cardDiv.className = "card"
        cardBody.className = "card-body"
        cardTitle.className = "card-title"

        flagImg.src = flagUrl
        cardTitle.appendChild(document.createTextNode(countryName))
        regionParagraph.appendChild(document.createTextNode("Region: " + region))
        subRegionParagraph.appendChild(document.createTextNode("Sub Region: " + subRegion))
        populationParagraph.appendChild(document.createTextNode("Population: " + population))

        cardBody.appendChild(cardTitle)
        cardBody.appendChild(regionParagraph)
        cardBody.appendChild(subRegionParagraph)
        cardBody.appendChild(populationParagraph)
        cardDiv.appendChild(flagImg)
        cardDiv.appendChild(cardBody)
        cardContainer.appendChild(cardDiv)
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