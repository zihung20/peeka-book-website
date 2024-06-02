const params = new URLSearchParams(window.location.search);
const cardBox = document.querySelector(".card");

function generateHTML(data) {
    return `<div id="map">
                <img src="../assets/${data.facility_image}">
            </div>
            <div id="facilityInformations"> 
                <pre id="address">${data.address}</pre>
                <p>rating: ${data.rating}</p>
                <p>capacity: ${data.capacity} people</p>
                <p>${data.type}</p>
            </div>`
}

async function initialize() {
    const facilityId = params.get('facilityId');
    const data = await fetch(`https://orbital-2024-peeka-book.onrender.com/facility/${facilityId}`)
                        .then(data => data.json())
                        .catch(err => console.log(err))
    
    cardBox.innerHTML = generateHTML(data);
}

initialize();