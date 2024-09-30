const url = window.location.href // Get the full URL
const countryUrlName = url.split('/country/')[1].replaceAll('%20', ' ')

fetch("https://restcountries.com/v3.1/name/" + countryUrlName, {
    headers:{
        'Accept': 'application/json'
    }
})
.then(res => res.json())
.then(data => data.forEach (
        country => {
            countryName = country.name.common
            countryCode = country.cca3
            officialCountryName = country.name.official
            capital = country.capital
            countryFlagUrl = country.flags.png
            if (countryUrlName == countryName)
                document.getElementById("country-flag").src = countryFlagUrl;
                console.log(capital)
                document.createElement("h2")
                document.getElementById("capital").innerHTML = capital;
        }
    )
)


function showCountryDetails(pngLink) {
};
