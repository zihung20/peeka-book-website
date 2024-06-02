const facilityBox = document.querySelector(".card")
const params = new URLSearchParams(window.location.search)

function generateHTML(data) {
    return `<div class="picAndInfo" id="facilityPicture">
        <img src="../assets/${data.facility_image}">
    </div>
    <div class="picAndInfo" id="Info"> 
        <div id="facilityInformations">
            <strong>${data.name}</strong>
            <p id="address">
                ${data.address}
            </p>
            <p>rating: ${data.rating}</p>
            <p>capacity: ${data.capacity} people</p>
            <p id="type">${data.type}</p>
        </div>
        <div id="userCard">
            <p>
                Owner:
            </p>
            <div id="user">
                <div>
                    <p id="name">${data.owner}</p>
                </div>
                <img src="../assets/${data.owner_image}">
            </div>
        </div>
    </div>`
}
function addButtonEvent(facilityId) {
    const buttons = document.querySelectorAll("button")
    buttons.forEach(button => button.addEventListener("click", (event) => {
        const type = event.target.className;
        if(type === "button book-button") {
            window.location.href = `./booking_application_page.html?facilityId=${facilityId}`
        } else {
            console.log("contact page")
        }
    }))
}
async function initialize() {
    const facilityId = params.get('facilityId')
    const data = await fetch(`https://orbital-2024-peeka-book.onrender.com/facility/${facilityId}`)
                        .then(data => data.json())
                        .catch(err => console.lot(err))
    facilityBox.innerHTML = generateHTML(data);
    addButtonEvent(facilityId);
}

initialize();

const ratingBox = document.querySelector(".rating");
function ratingHTML() {
    return `<div class="comment">
        <div class="comment-header">
            <img src="../assets/BasketballCourt2.jpeg" alt="User Image" class="user-image">
            <span class="user-name">John Doe</span>
            <span class="rating">★★★★☆</span>
        </div>
        <div class="comment-text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est quisquam officiis delectus explicabo, odio perferendis unde dicta illo omnis eveniet rem placeat adipisci, quidem vel possimus eos pariatur repellendus alias.
        </div>
    </div>
</div>`
}

function test() {
    for(let i =0; i<4; i++) {
        ratingBox.innerHTML += ratingHTML();
    }
}
