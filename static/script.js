fetch("https://restcountries.com/v3.1/all", {
    headers:{
       'Accept': 'application/json'
    }
})
.then(res => res.json())
.then(res => {
    fetch(
        "/api/post_country_list",{
        method: "POST",
        headers: {
            Accept : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(res)
    })
    res.forEach(country => addToList(country.name.common))
    }
)

function addToList(name) {
    var countriesList = document.getElementById("countries-list");
    var addItemList = document.createElement("li");
    var addAttachment = document.createElement("a");
    addAttachment.appendChild(document.createTextNode(name));
    addAttachment.href = `/country/${name}`;
    addItemList.appendChild(addAttachment);
    countriesList.appendChild(addItemList);
}