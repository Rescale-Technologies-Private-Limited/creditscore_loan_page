let currentStep = 1;
let formData = {};
const submitButton1 = document.getElementById("submitotpbtn1");
const submitButton2 = document.getElementById("submitotpbtn2");
const submitButton3 = document.getElementById("submitotpbtn3");
const submitButton4 = document.getElementById("submitotpbtn4");
const submitButton5 = document.getElementById("submitotpbtn5");
const verifyOTPSubmitButton = document.getElementById("verifyOTP");
const resendOtpButton = document.getElementById("resendOtp");
const prevBtns = document.querySelectorAll(".btn-prev");
prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep >= 2) {
      currentStep--;
    }
    showForm(currentStep == 1 ? currentStep + 1 : currentStep);
    console.log(currentStep);
  });
});

function closeprogress() {
  // document.getElementById('progress-section').style.display = 'none';
  document.querySelector(".progress-container").classList.add("hidden");
  document.querySelector(".nav-btn").classList.add("hidden");
  document.querySelector(".Congress-boxs").classList.remove("hidden");
}
function openprogress() {
  document.querySelector(".progress-container").classList.remove("hidden");
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  // const progressText = document.getElementById("progress-text");
  const progressHeading = document.getElementById("progress-heading");
  const progressPercentage = (currentStep / 6) * 100;

  progressBar.style.width = progressPercentage + "%";
  // progressText.textContent = `${currentStep}/7`;

  switch (currentStep) {
    case 1:
      progressHeading.textContent = "";
      break;
    case 2:
      progressHeading.textContent = "";
      break;
    case 3:
      progressHeading.textContent = "";
      break;
    case 4:
      progressHeading.textContent = "";
      break;
    case 5:
      progressHeading.textContent = "";
      break;
    case 6:
      progressHeading.textContent = "";
      break;
  }
}

function showForm(step) {
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`form${i}`).style.display =
      i === step ? "block" : "none";
  }
  updateProgressBar();
}

submitButton1.addEventListener("click", async () => {
  const showError = document.getElementById("NameError"); // Validate first name
  const fullname = document.getElementById("name").value;
  if (fullname === "") {
    showError.style.display = "block";
    return false;
  } else {
    showError.style.display = "none";
  }

  // Validate mobile number
  const mobile = document.getElementById("mobile").value;
  const mobilePattern = /^[0-9]{10}$/;
  const showMobileError = document.getElementById("mobileError");
  const showMobile10digitError = document.getElementById(
    "showMobile10digitError"
  );
  if (mobile === "") {
    showMobileError.style.display = "block";
    showMobile10digitError.style.display = "none";
    return false;
  } else if (!mobilePattern.test(mobile)) {
    showMobile10digitError.style.display = "block";
    showMobileError.style.display = "none";
    return false;
  } else {
    showMobileError.style.display = "none";
    showMobile10digitError.style.display = "none";
  }

  currentStep++;
  showForm(currentStep);

  // console.log(response);
  document.getElementById("phone-number").textContent = `+91-${mobile}`;
  // console.log("Genereate OTP");
  // console.log(currentStep)
  // Show the OTP section
  document.getElementById("otp-section-container").style.display = "block";
  document.querySelector(".hero-heading").classList.add("hidden");
  document.querySelector(".nav-btn").classList.remove("hidden");
  document.querySelector(".progress-container").classList.remove("hidden");
  document.querySelector(".hero-section").classList.remove("hidden");
  document.querySelector(".form-container-form-2").classList.remove("hidden");
  document.querySelector(".hero-home-section").classList.add("hidden");

  const thirtySeconds = 30,
    display = document.querySelector("#timer");
  startTimer(thirtySeconds, display);
  const button = document.getElementById("submitotpbtn1");
  button.disabled = true;
  await validateForm1();
  button.disabled = false;
});
// otp section start

function moveToNext(current, nextFieldId) {
  if (current.value.length >= current.maxLength) {
    document.getElementById(nextFieldId).focus();
    Array.from(document.querySelectorAll(".form-otp-box input")).every(
      (input) => input.value
    );
  }
}

document
  .querySelectorAll(".form-otp-box input")
  .forEach((input, index, inputs) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

verifyOTPSubmitButton.addEventListener("click", async () => {
  const otp = Array.from(document.querySelectorAll(".form-otp-box input"))
    .map((input) => input.value)
    .join("");
  if (otp.length === 4) await verifyOTP(otp);
});
function closeModal() {
  document.getElementById("otp-section-container").style.display = "none";
}

async function verifyOTP(curretOTP) {
  // const otp = document.getElementById('otp').value;

  // Example OTP for demonstration
  // alert('OTP verified successfully!');
  try {
    const response = await fetch(
      "https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api/creditscore_verifyotp",
      // "http://localhost/creditscore_verifyotp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: curretOTP }),
      }
    );

    // Check if the response is OK (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();

    // Log the data or use it as needed
    console.log(data);
    formData.secretId = data.secretId;
    closeModal();
    showForm(currentStep);
  } catch (error) {
    console.error("Error in verifying OTP:", error);
    document.querySelector(".invalid-otp").style.display = "block";
    // Handle the error as needed
  }
}

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  const interval = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = "00:" + seconds;

    if (--timer < 0) {
      clearInterval(interval);
      document.querySelector(".resend-timer-box").style.display = "none";
      document.querySelector(".resend-otp").style.display = "block";
      document.getElementById("verifyOTP").style.display = "block";
    }
  }, 1000);
}

resendOtpButton.addEventListener("click", () => {
  resendotp();
});
async function resendotp() {
  await validateForm1();
  const thirtySeconds = 30,
    display = document.querySelector("#timer");
  startTimer(thirtySeconds, display);
  document.querySelector(".resend-timer-box").style.display = "block";
  document.querySelector(".resend-otp").style.display = "none";
}

// Function to update the styles based on the selected input group
function updateStyles(groupSelector, inputSelector) {
  const boxes = document.querySelectorAll(groupSelector);

  boxes.forEach((box) => {
    const input = box.querySelector(inputSelector);

    if (input.checked) {
      box.classList.add("selected");
      box.classList.remove("unselected");
    } else {
      box.classList.remove("selected");
      box.classList.add("unselected");
    }
  });
}

// Add event listeners to the radio buttons to trigger the style update
const genderInputs = document.querySelectorAll('input[name="gender"]');
const maritalInputs = document.querySelectorAll('input[name="marital-status"]');
const educationInputs = document.querySelectorAll('input[name="education"]');
const employmentInputs = document.querySelectorAll('input[name="employment"]');
// Add more input groups as needed
// console.log(employmentInputs)
// Add event listeners to all input groups
genderInputs.forEach((input) => {
  input.addEventListener("change", () =>
    updateStyles(".gender-box", ".gender-input")
  );
});
maritalInputs.forEach((input) => {
  input.addEventListener("change", () =>
    updateStyles(".marital-box", ".marital-input")
  );
});

educationInputs.forEach((input) => {
  input.addEventListener("change", () =>
    updateStyles(".education-box", ".education-input")
  );
});

employmentInputs.forEach((input) => {
  input.addEventListener("change", () => {
    updateStyles(".employment-box", ".employment-input");
    // console.log(input);
  });
});
async function validateForm1() {
  const showError = document.getElementById("NameError"); // Validate first name
  const fullname = document.getElementById("name").value;
  if (fullname === "") {
    showError.style.display = "block";
    return false;
  } else {
    showError.style.display = "none";
  }

  // Validate mobile number
  const mobile = document.getElementById("mobile").value;
  const mobilePattern = /^[0-9]{10}$/;
  const showMobileError = document.getElementById("mobileError");
  const showMobile10digitError = document.getElementById(
    "showMobile10digitError"
  );
  if (mobile === "") {
    showMobileError.style.display = "block";
    showMobile10digitError.style.display = "none";
    return false;
  } else if (!mobilePattern.test(mobile)) {
    showMobile10digitError.style.display = "block";
    showMobileError.style.display = "none";
    return false;
  } else {
    showMobileError.style.display = "none";
    showMobile10digitError.style.display = "none";
  }

  formData.name = fullname;
  formData.mobile = mobile;
  formData.step = "step1";
  console.log(formData);

  try {
    const response = await fetch(
      "https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api/creditscore_getotp",
      // https://asia-south1-ads-ai-101.cloudfunctions.net/card_api/getotp
      // "http://localhost/creditscore_getotp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: formData.mobile, name: fullname }),
      }
    );

    // Check if the response is OK (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();

    // Log the data or use it as needed
    console.log(data);

    // Do something with the data
    // For example, update the state or display it in the UI
  } catch (error) {
    console.error("Error in sending OTP:", error);
    // Handle the error as needed
  }
}

function validateForm2() {
  // Validate email
  const emailError = document.getElementById("emailError");
  const emailvalidError = document.getElementById("emailvalidError");
  const email = document.getElementById("email").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    emailError.style.display = "block";
    emailvalidError.style.display = "none";
    // isValid = false;
    return false;
  } else if (!emailPattern.test(email)) {
    emailvalidError.style.display = "block";
    emailError.style.display = "none";
    // isValid = false;
    return false;
  } else {
    emailError.style.display = "none";
    emailvalidError.style.display = "none";
  }

  // Validate Gender
  const genderError = document.getElementById("genderError");
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    genderError.style.display = "block";
    return false;
  } else {
    genderError.style.display = "none";
  }

  if (email && gender) {
    console.log("API Calling..............2FORM", currentStep);
    currentStep++;
    showForm(currentStep);
    console.log(email, gender.value);
    formData.email = email;
    formData.gender = gender.value;
    formData.step = "step2";
    console.log(formData);
  } else {
    // alert('Please fill in all fields correctly.');
  }
}

function validateForm3() {
  // let isValid = true;
  // Validate Date of Birth
  const dobError = document.getElementById("dobError");
  const dob = document.getElementById("dob").value;
  if (dob === "") {
    dobError.style.display = "block";
    // isValid = false;
    return false;
  } else {
    dobError.style.display = "none";
  }

  const maritalError = document.getElementById("maritalError");
  const maritalStatus = document.querySelector(
    'input[name="marital-status"]:checked'
  );
  if (!maritalStatus) {
    maritalError.style.display = "block";
    // isValid = false;
    return false;
  } else {
    maritalError.style.display = "none";
  }

  if (dob && maritalStatus) {
    // currentStep++;
    console.log("API Calling..............3FORM", currentStep);
    showForm(++currentStep);
    formData.maritalStatus = maritalStatus.value;
    formData.dob = dob;
    formData.step = "step3";
    console.log(formData);
  }
}

function validateForm4() {
  const employmentError = document.getElementById("employmentError");
  const employment = document.querySelector('input[name="employment"]:checked');

  if (!employment) {
    employmentError.style.display = "block";
    return false;
  } else {
    employmentError.style.display = "none";
  }
  console.log("API Calling..............4FORM", currentStep);
  showForm(++currentStep);
  formData.employment = employment.value;
  formData.step = "step4";
  console.log(formData);
}

async function validateForm5() {
  const incomeSelect = document.getElementById("Income");
  const incomeError = document.getElementById("incomeError");

  if (incomeSelect.value === "") {
    incomeError.style.display = "block";
    return false;
  } else {
    incomeError.style.display = "none";
  }

  const pancardError = document.getElementById("panCardError");
  const panCardvalidError = document.getElementById("panCardvalidError");
  const panCard = document.getElementById("panCard").value;
  // const pincode= document.getElementById("current-pincode").value;
  // const pincodeError= document.getElementById("currentpincodeError");
  const panCardPattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
  if (panCard === "") {
    pancardError.textContent = "PAN Card is required";
    pancardError.style.display = "block";
    panCardvalidError.style.display = "none";
    return false;
  } else if (!panCardPattern.test(panCard)) {
    panCardvalidError.style.display = "block";
    pancardError.style.display = "none";
    return false;
  } else {
    pancardError.style.display = "none";
    panCardvalidError.style.display = "none";
  }

  const currentpincode = document.getElementById("current-pincode");
  const currentpincodeError = document.getElementById("currentpincodeError");
  if (currentpincode.value === "") {
    currentpincodeError.style.display = "block";
    return false;
  } else {
    currentpincodeError.style.display = "none";
  }

  if (incomeSelect && panCard && currentpincode) {
    formData.salary = incomeSelect.value;
    formData.pan = panCard;
    // Disable the button
    submitButton5.disabled = true;
    // Show the loading indicator
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "block";
    formData.pincode = currentpincode.value;
    formData.step = "step5";
    console.log("API Calling..............5FORM", currentStep);

    try {
      console.log(formData);
      const response = await fetch(
        "https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api/creditscore_submitForm",
        // "http://localhost/creditscore_submitForm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Check if the response is OK (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON data from the response
      const data = await response.json();
      //   {
      //     "credit_score": 724,
      //     "fetch_date": "2024-08-23T08:30:48.358408Z"
      // }
      // Storing the object in localStorage as a JSON string

      // Log the data or use it as needed
      submitButton5.disabled = false;
      loadingIndicator.style.display = "none";
      console.log(data);
      showForm(++currentStep);
      closeprogress();
      Congratulations();
      // if (data?.score === 0 || data?.score == null || data === null) {
      document.getElementById("nocredit_remove").style.display = "none";
      // }
      updateVisibility(data?.score ?? 300);
      updateSlider2(data?.score ?? 300);
      updateInput2(data?.score ?? 300);
      formData.credit_score = data?.score || null;
      localStorage.setItem("loan", JSON.stringify(formData));
      console.log(formData);
    } catch (error) {
      showForm(++currentStep);
      closeprogress();
      updateVisibility(300);
      updateSlider2(300);
      updateInput2(300);
      document.getElementById("Congress-box").style.display = "none";
      console.error("Error in Submitting the Form:", error);
    }
  }
}

function Congratulations() {
  // document.querySelectorAll('.Congress-box').classList.remove('hidden');
  document.getElementById("Congress-box").style.display = "block";
}

// Initialize the form
showForm(currentStep);

// credit meter Slider

function updateInput2(value) {
  document.getElementById("rangeValue2").value = value;

  updateVisibility(value);
}

function updateSlider2(value) {
  document.querySelector(".ranges").value = value;
  updateVisibility(value);
}

// Update Visibility Based on Credit Score
function updateVisibility(value) {
  const zeroscore = document.querySelector(".zeroscore");
  const notApprove = document.querySelector(".not-approve");
  const approve = document.querySelector(".approve");
  const journeyBtn = document.querySelector(".journey-btn");
  const scoreReport = document.querySelector(".score-report");
  const zeroscoreText = document.querySelector(".zeroscore-sub-text");
  const notApproveText = document.querySelector(".not-approve-sub-text");
  const approveText = document.querySelector(".approve-sub-text");

  // Hide all elements initially
  zeroscore.classList.add("hidden");
  notApprove.classList.add("hidden");
  approve.classList.add("hidden");
  journeyBtn.classList.add("hidden");
  scoreReport.classList.add("hidden");
  zeroscoreText.classList.add("hidden");
  notApproveText.classList.add("hidden");
  approveText.classList.add("hidden");

  // Show/hide elements based on credit score
  if (value == 300) {
    zeroscore.classList.remove("hidden");
  } else if (value > 300 && value < 600) {
    notApprove.classList.remove("hidden");
    scoreReport.classList.remove("hidden");
    notApproveText.classList.remove("hidden");
  } else if (value >= 600 && value <= 850) {
    approve.classList.remove("hidden");
    journeyBtn.classList.remove("hidden");
    scoreReport.classList.remove("hidden");
    approveText.classList.remove("hidden");
  }
}

// Initialize visibility on page load
window.onload = function () {
  const initialValue = document.getElementById("rangeValue2").value;
  updateVisibility(initialValue);
};
