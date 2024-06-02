const image = document.getElementById("imageInput");
const output = document.getElementById("imageOutput");
const latitude = document.querySelector("#latitudeText");
const longitude = document.querySelector("#longitudeText");
const addButton = document.querySelector("#add");
const form = document.querySelector("#facility-form");

//show the image when upload to the form
image.addEventListener("change", (event) => {
    const [file] = image.files;
    output.src = URL.createObjectURL(file);
    output.style.display = "block";
})

let map;
let geocoder;

function initMap() {
    let marker = null;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 1.3521, lng: 103.8198}, // Default center to Singapore
        zoom: 12
    });
    google.maps.event.addListener(map, 'click', function (event) {
        
        const coordinate = event.latLng;
        latitude.innerHTML = "Latitude: " + coordinate.lat();
        document.getElementById("latitude").value = coordinate.lat();
        longitude.innerHTML = "Longitude: " + coordinate.lng();
        document.getElementById("longitude").value = coordinate.lng();
        //remove last marker
        if (marker == null) {
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
            });
        } else {
            marker.setMap(null);
            marker = null;
        }
    });
    geocoder = new google.maps.Geocoder();
}

addButton.addEventListener("click", () => {
    submitForm();
})

function submitForm() {
    var object = {};
    const formData = new FormData(form);
    formData.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);
    fetch("https://orbital-2024-peeka-book.onrender.com/createFacilityProfile",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: json})
    .then(res => res.json())
    .then(data => {
        if(data.message != "some error occur") {
            window.location.href ="./main_page.html"
        } else {
            console.log("error")
        }
    })
   
}
// function codeAddress() {
//     const unitAndStreet = document.getElementById('unitAndStreet').value;
//     const postcode = document.getElementById('postcode').value;
//     const region = document.getElementById('region').value;
//     const address = `${unitAndStreet}, ${postcode}, ${region}`;
    
//     geocoder.geocode({'address': address}, function(results, status) {
//         if (status === 'OK') {
//             map.setCenter(results[0].geometry.location);
//             const marker = new google.maps.Marker({
//                 map: map,
//                 position: results[0].geometry.location
//             });
//             document.getElementById('coordinates').textContent = `N: ${results[0].geometry.location.lat().toFixed(4)} E: ${results[0].geometry.location.lng().toFixed(4)}`;
//         } else {
//             alert('Geocode was not successful for the following reason: ' + status);
//         }
//     });
// }

window.onload = initMap;