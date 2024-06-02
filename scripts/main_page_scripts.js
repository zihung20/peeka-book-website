import {database} from "../sample/fakeDatabase.js";

const content = document.querySelector(".content");
const searchBox = document.querySelector("#searchBox");
const searchButton = document.querySelector("#searchButton")

searchButton.addEventListener("click", () => {
    search(searchBox.value);
})

searchBox.addEventListener("keypress", (event) => {
    if(event.keyCode == 13) {
        search(searchBox.value);
    }
})

function search(keyword) {
    fetch(`https://orbital-2024-peeka-book.onrender.com/search/${keyword}`)
    .then(data => data.json())
    .then(arrayOfData => display(arrayOfData));
}

function display(database) {
    content.innerHTML = "";
    database.forEach(info => content.innerHTML += generateHTML(info));
}

function generateHTML(data) {
    return `<div class="card" id=${data.facility_id} >
    <div id="map">
        <img src="../assets/${data.facility_image}">
    </div>
    <div> 
        <strong>${data.name}</strong>
        <p id="address">${data.address}</p>
        <p>rating: ${data.rating}</p>
        <p>capacity: ${data.capacity} people</p>
    </div>
    <div class="buttonContainer">
        <button id="bookButton" facilityId = ${data.facility_id}>book</button>
        <button id="contactButton">contact</button>
    </div>
    </div>`
}

async function initialize() {
    const arrayOfFacilities = await fetch("https://orbital-2024-peeka-book.onrender.com/facilities").then(data => data.json())
    display(arrayOfFacilities);

    const cardList = document.querySelectorAll(".card")
    /*
        when the card click the special id will be send
        to server and navigate the window to the specific
        facility
    */
    cardList.forEach(card => {
        card.addEventListener("click", (event) => {
            const facilityId = card.id;
            if (event.target.id === "bookButton"){
                window.location.href =`./booking_application_page.html?facilityId=${facilityId}`
            } else if (event.target.id === "contactButton") {
                //window.location.href =
                console.log("contact page")
            } else {
                //change current webpage
                window.location.href = `./facility_user_page.html?facilityId=${facilityId}`
            }
        })
    })
}

initialize();