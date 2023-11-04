const hourInput = document.getElementById("hour");
const secondInput = document.getElementById("second");
const minuteInput = document.getElementById("minute");
const am_pmInput = document.getElementById("am-pm");
const setButton = document.getElementById("set-button");
const alarmList = document.getElementById("alarm-list");
const clockH1 = document.getElementById("clock");
const li = document.getElementsByClassName('li-item');

var list = [];


//Initializing the main funtions necessary.
initialize();

//Making dropdowns for the Inputs from the user
function showOptions(targetIdName) {
    if (targetIdName === "hour") {
        dropdown(1, 12, hourInput);
    }
    else if (targetIdName === "minute") {
        dropdown(0, 59, minuteInput);
    }
    else if (targetIdName === "second") {
        dropdown(0, 59, secondInput);
    }
}
// This function creates dropdown for input elements
function dropdown(start, end, elementName) {
    for (let i = start; i <= end; i++) {
        var newOptionElement = document.createElement("option");
        if (i < 10) {
            newOptionElement.innerHTML = `0${i}`;
        }
        else { newOptionElement.innerHTML = i; }

        elementName.appendChild(newOptionElement);
    }
};
//This function constantly checks if alarm should go off
function checkAlarm() {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    // if (li.innerText === showTime().toLocaleTimeString("en-US", options)) {
    //     ringAlarm();
    // }

    Array.from(li).forEach((item)=>{
        if(item.innerText === showTime().toLocaleTimeString("en-US", options)){
            ringAlarm();
            deleteItem(item.id);
        }
    })

}

//Ring Alarm Function
function ringAlarm() {
    alert("Ring Ring Ring!!!!!!");
};

//Time Function return current Time
function showTime() {
    const currentTime = new Date();
    return currentTime;
};

//This function handles the inputs from the user and creates an alarm object
function getInput(e) {
    let selectedDefault = false;

    e.preventDefault();
    var alarmObject = {
        id: new Date().getTime(),
        // hourValue,
        // minuteValue,
        // secondValue,
        // ampmValue
    };
    const hourValue = hourInput.value;
    if (hourValue === "default") {
        selectedDefault = true;
    } else {
        alarmObject.hourValue = hourValue;
    }
    const minuteValue = minuteInput.value;
    if (minuteValue === "default") {
        selectedDefault = true;
    } else {
        alarmObject.minuteValue = minuteValue;
    }
    const secondValue = secondInput.value;
    if (secondValue === "default") {
        selectedDefault = true;
    } else {
        alarmObject.secondValue = secondValue;
    }
    const ampmValue = am_pmInput.value;
    if (ampmValue === "default") {
        selectedDefault = true;
    } else {
        alarmObject.ampmValue = ampmValue;
    }

    if (!selectedDefault) {
        list.push(alarmObject);
        resetInputs();
        renderList(list);
    } else {
        alert("Please enter correct time to set alarm.")
    }
}

//This function resets the input fields after the user set an alarm.
function resetInputs() {
    hourInput.selectedIndex = 0;
    minuteInput.selectedIndex = 0;
    secondInput.selectedIndex = 0;
    am_pmInput.selectedIndex = 0;
}

//This funtion creates and renders li elements for each object in the list
function renderList(list) {
    alarmList.innerHTML = "";



    list.map((item) => {
        const li = document.createElement("li");
        li.id = item.id;
        li.className = "li-item";
        li.innerHTML = `${item.hourValue}:${item.minuteValue}:${item.secondValue} ${item.ampmValue}<img src="static/icons8_delete.svg" class="deleteBtn" data-targetId="${li.id}">`;

        alarmList.appendChild(li);
        handleDelete();
    })
}

//This function handles the deleting process when the user clicks on delete button in the list
function handleDelete() {
    const deleteBtns = document.getElementsByTagName("img");
    Array.from(deleteBtns).forEach((btn) => {
        btn.addEventListener("click", (e) => {
            deleteItem(e.target.dataset.targetid);
            alert("Deleted alarm.")
        })
    })
}

//This function makes sure that the correct list item gets deleted
function deleteItem(targetId) {
    const objToDel = targetId;
    const newList = list.filter((item) => item.id != objToDel);
    list = newList;
    renderList(list);
}

// This function initializes all the necessary functions and event listeners.
function initialize() {
    document.addEventListener("DOMContentLoaded", (e) => {
        showOptions("hour");
        showOptions("minute");
        showOptions("second")
    })

    //Setting new Alarm
    setButton.addEventListener("click", getInput)

    setInterval(() => {
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        clockH1.innerHTML = showTime().toLocaleTimeString('en-US', options);
        checkAlarm();
    }, 1000);
};

