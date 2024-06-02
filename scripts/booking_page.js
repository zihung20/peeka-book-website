//import { deleteBookingApplication } from "../backend/api/getBookingList";

const bookingButton = document.querySelector(".booking");
const facilityButton = document.querySelector(".facility");
const analysisButton = document.querySelector(".data-analysis");
const settingButton = document.querySelector(".setting");

function select(text) {
    const buttonElement = document.querySelector(`${text}`);
    document.querySelector('.booking').style.backgroundColor = 'white';
    document.querySelector('.facility').style.backgroundColor = 'white';
    document.querySelector('.data-analysis').style.backgroundColor = 'white';
    document.querySelector('.setting').style.backgroundColor = 'white';
    buttonElement.style.backgroundColor = 'gray';
}

    
const ary1 = [{location: "Kent Ridge", date: '16 Nov', time: '1600 - 1800'},
              {location: "Uptown Volley Ball Court", date: '16 Nov', time: '1600 - 1800'}, 
              {location: "Sport Center", date: '16 Nov', time: '1600 - 1800'}]

function renderToTableBooking(dataSource) {
    let html = '';
    let index = 1;
    dataSource.forEach(dataObj => {
        let row = '';
        let { booking_id, facility_name, start_date, start_time, end_time } = dataObj;
        row = `<td>${index}</td>
                <td>${facility_name}</td>
                <td>${start_date}</td>
                <td>${start_time} - ${end_time}</td>`;
        html += `<tr>${row}
                <td>
                    <button class="task-button detail-button">detail</button>
                    <button class="task-button swap-button">swap</button>
                    <a href="https://orbital-2024-peeka-book.onrender.com/deleteBooking/${booking_id}">
                        <button class="task-button cancel-button">cancel</button>
                    </a>
                    
                </td></tr>`;
        index++;
    });
    document.querySelector('.booking-list').innerHTML = html;
}

function renderToTableHistory(dataSource) {
    let html = '';
    let index = 1;
    dataSource.forEach(dataObj => {
        let row = '';
        let {location, date, time} = dataObj;
        row = `<td>${index}</td>
               <td>${location}</td>
               <td>${date}</td>
               <td>${time}</td>`;
        html += `<tr>${row}
                <td>
                    <button class="task-button rate-button">rate</button>
                    <button class="task-button cancel-button">cancel</button>
                </td></tr>`; 
        index++;
    });
    document.querySelector('.history-list').innerHTML = html;
}

export const ary2 = [{location: '23-A Kent Ridge Road 81340 Singapore', rating: '4.3'},
        {location: '23-A Kent Ridge Road 81340 Singapore', rating: '3,0'},
        {location: '23-A Kent Ridge Road 81340 Singapore', rating: '5.0'},
        {location: '23-A Kent Ridge Road 81340 Singapore', rating: '2.0'}];
function renderToTableFacility(dataSource) {
    let html = '';
    let index = 1;
    dataSource.forEach(dataObj => {
        let {location} = dataObj;
        let {rating} = dataObj;

        html += `<div class="facility-list">
                    <div>${index}.</div>
                    <div><img src='../assets/BasketballCourt.jpg' alt="illustrator" width="400" height="60"></div>
                    <div>${location}</div>
                    <div>${rating}</div>
                    <div><button>Edit Details</button></div>
                    <div><button>...</button></div>
                </div>`;
        index++;
    });
    document.querySelector('#facility').innerHTML = html;
}

bookingButton.addEventListener('click', async () => {
    select('.booking'); 
    loadContent('booking');
    // this function take a username
    const a = await loadBookingListArray("userxz");
    renderToTableBooking(a);
    renderToTableHistory(ary1);
});

facilityButton.addEventListener('click', () => {
    select('.facility'); 
    loadContent('facility');
    renderToTableFacility(ary2);
})

analysisButton.addEventListener('click', () => {
    select('.data-analysis');
    loadContent('data-analysis');
});

settingButton.addEventListener('click', () => {
    select('.setting');
    loadContent('setting');
});

// my database only got username "userxz"
function loadBookingListArray(username) {
    return fetch(`https://orbital-2024-peeka-book.onrender.com/bookingList/${username}`)
           .then(data => data.json());
}

function loadContent(content) {
    if (content === 'booking') {
        document.querySelector('.content').innerHTML =
    `<div>
        <p>Future Booking</p>
        <table class="table-content">
            <colgroup>
                <col style="width: 5%;">
                <col style="width: 30%;">
                <col style="width: 20%;">
                <col style="width: 10%;">
                <col style="width: 35%;">
            </colgroup>
            <thead>
                <th style="width: 5%;">No</th>
                <th style="width: 30%;">Venue/Facility</th>
                <th style="width: 20%;">Date</th>
                <th style="width: 10%;">Time</th>
            </thead>
            <tbody class="booking-list">
                
            </tbody>
        </table>
    </div>

    <div>
        <p>History</p>
        <table class="table-content">
            <colgroup>
                <col style="width: 5%;">
                <col style="width: 30%;">
                <col style="width: 20%;">
                <col style="width: 10%;">
                <col style="width: 35%;">
            </colgroup>
            <thead>
                <th style="width: 5%;">No</th>
                <th style="width: 30%;">Venue/Facility</th>
                <th style="width: 20%;">Date</th>
                <th style="width: 10%;">Time</th>
            </thead>
            <tbody class="history-list"></tbody>
        </table>
    </div>`;
    } else if (content === 'facility') {
        document.querySelector('.content').innerHTML = 
    `<p></p>
    <div class="facility-list">
        <div></div>
        <div></div>
        <div style="font-weight: bold">Address</div>
        <div style="font-weight: bold">Rating</div>
        <div></div>
        <div></div>
    </div>
    <div id="facility"></div>`;
    } else if (content === 'data-analysis') {
        document.querySelector('.content').innerHTML = '';
    } else {
        document.querySelector('.content').innerHTML = '';
    }
}