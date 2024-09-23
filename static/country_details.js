const url = window.location.href // Get the full URL
const countryName = url.split('/country/')[1].replaceAll('%20', ' ')

fetch("https://restcountries.com/v3.1/name/" + countryName, {
    headers:{
        'Accept': 'application/json'
    }
})
.then(res => res.json())
.then(data => data.forEach (
        country => {
        countryFlagUrl = country.flags.png
        countryCommon = country.name.common
        if (countryName == countryCommon) showCountryDetails(countryFlagUrl)
        }
    )
)

function showCountryDetails(pngLink) {
    document.getElementById("country-flag").src = pngLink;
};
