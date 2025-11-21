const formElement = document.querySelector(".formSection form");
const error = document.querySelector(".error-msg");
const popUp = document.querySelector(".popUp");
const cancleBtn = document.querySelector(".cancleBtn");
const confirmBtn = document.querySelector(".confirmBtn");
const tableContainer = document.querySelector(".table-container");

let userData = [];

//check data

formElement.addEventListener("submit", (e) => {
  let userName = e.target.userName.value.trim();
  let userEmail = e.target.userEmail.value.trim();
  let userPhone = e.target.userNumber.value.trim();

  //check user data if empty
  if (userName == "" || userEmail == "" || userPhone == "") {
    showPupUp("Please fill in all fields !", "error");
    e.preventDefault();
    return;
  }
  //check phone number must be 10 digit
  if (!/^[0-9]{10}$/.test(userPhone)) {
    showPupUp("Please enter a valid 10-digit number !", "error");
    e.preventDefault();
    return;
  }

  // regex pattern for valid email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(userEmail)) {
    showPupUp("Please enter a valid email address !", "error");
    e.preventDefault();
    return;
  }

  //user data save or show

  let userObject = {
    userName,
    userEmail,
    userPhone,
  };

  //email id checked
  let checkedMyEmail = userData.find((item) => item.userEmail == userEmail);

  if (checkedMyEmail) {
    showPupUp("Email already Exist !", "warning");
    e.preventDefault();
    return;
  } else {
    userData.push(userObject);
    storeDataInTable();

    e.target.reset(); //empty input after save data

    e.preventDefault(); //page refresh stop
    showPupUp("✅ Data added !", "success");
  }
});

//show popup message function for error

function showPupUp(message, type = "success") {
  error.className = `error-msg ${type}`;
  error.textContent = message;
  error.style.display = "block";

  setTimeout(() => {
    error.style.display = "none";
  }, 3000);
}

//push data in table

const tableBody = document.querySelector("#tableBody");

const storeDataInTable = () => {
  let tableRow = "";
  userData.forEach((items, index) => {
    for (let i = 0; i < userData.length; i++) {}
    tableRow += `<tr>
                        <td>${index + 1}${`.`}</td>
                        <td>${items.userName}</td>
                        <td>${items.userEmail}</td>
                        <td>${items.userPhone}</td>
                        <td class="td-delete-btn">
                            <button data-id='${index}' class="delete-btn">Delete</button>
                        </td>
                </tr>`;
  });

  tableBody.innerHTML = tableRow;
};

//delete items

let deleteIndex = null;

// DELETE BUTTON CLICK (show popup)
tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    deleteIndex = e.target.getAttribute("data-id");
    openPopup(); // popup seee
  }
});

// POPUP BUTTONS
confirmBtn.addEventListener("click", function () {
  if (deleteIndex !== null) {
    userData.splice(deleteIndex, 1); // delete actual data
    storeDataInTable(); // update table
    deleteIndex = null; // reset
    closePopup();
    showPupUp("Data deleted successfully!", "success");
  }
});

cancleBtn.addEventListener("click", function () {
  deleteIndex = null; // nothing to delete
  closePopup();
});

function openPopup() {
  // popUp.style.display = "flex";
  popUp.style.opacity = "1";
  popUp.style.pointerEvents = "auto";
}

function closePopup() {
  // popUp.style.display = "none";
  popUp.style.opacity = "0";
  popUp.style.pointerEvents = "none";
}
