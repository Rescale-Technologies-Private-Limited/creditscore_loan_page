let currentStep = 1;
let deviceId = null; // Store deviceId for the session
let txId = null;
let formData = {};
const submitButton1 = document.getElementById("submitotpbtn1");
const submitButton2 = document.getElementById("submitotpbtn2");
const submitButton3 = document.getElementById("submitotpbtn3");
const submitButton4 = document.getElementById("submitotpbtn4");
const submitButton5 = document.getElementById("submitotpbtn5");
const submitButton6 = document.getElementById("submitotpbtn6");
const submitButton7 = document.getElementById("submitotpbtn7");
const submitButton8 = document.getElementById("submitotpbtn8");

const verifyOTPSubmitButton = document.getElementById("verifyOTP");
const resendOtpButton = document.getElementById("resendOtp");
const prevBtns = document.querySelectorAll(".btn-prev");

function generateDeviceId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const random2 = Math.random().toString(36).substring(2, 15);
  // Format: device-{timestamp}-{random} (length: ~40-50 chars)
  return `device-${timestamp}-${random}${random2}`;
}

// Initialize deviceId - persist across page refreshes using sessionStorage
function initializeDeviceId() {
  // Try to get existing deviceId from sessionStorage
  let storedDeviceId = sessionStorage.getItem('deviceId');
  
  if (!storedDeviceId) {
    // Generate new deviceId if not exists
    storedDeviceId = generateDeviceId();
    sessionStorage.setItem('deviceId', storedDeviceId);
    console.log('✅ New Device ID Generated:', storedDeviceId);
  } else {
    console.log('✅ Existing Device ID Retrieved:', storedDeviceId);
  }
  
  return storedDeviceId;
}

// Initialize deviceId and txId from sessionStorage
deviceId = initializeDeviceId();

// Try to restore txId if page was refreshed after generateOTP
const storedTxId = sessionStorage.getItem('txId');
if (storedTxId) {
  txId = storedTxId;
  console.log('✅ Transaction ID Restored:', txId);
}
prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep >= 2) {
      currentStep--;
    }
    showForm(currentStep == 1 ? currentStep + 1 : currentStep);
    console.log(currentStep);
  });
});
const productCards = document.querySelectorAll(".product-card")
let selectedProduct = null
let selectedProductId = null

// Product ID mapping
const productIdMap = {
  'Smartphone': 'PHONE(WEB-MOBILE)',
  'Smart TV': 'LED',
  'Washing Machine': 'WASHING MACHINE',
  'Laptop': 'LAPTOP',
  'Kitchen Appliances': 'KITCHEN APPLIANCES',
  'Home Appliances': 'AIR PURIFIER',
  'Smart Watch': 'SMART WATCH',
  'Headphone': 'HEADPHONE',
  'Refrigerator': 'REFRIGERATOR',
  'Air Conditioner': 'AIR CONDITIONER'
}

productCards.forEach((card) => {
  card.addEventListener("click", () => {
    productCards.forEach((c) => c.classList.remove("selected"))
    card.classList.add("selected")
    selectedProduct = card.dataset.product
    selectedProductId = productIdMap[selectedProduct]
    console.log(`Selected Product: ${selectedProduct}, Product ID: ${selectedProductId}`)
  })
})

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
  const progressPercentage = (currentStep / 8) * 100;

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
    case 7:
      progressHeading.textContent = "";
      break;
    case 8:
      progressHeading.textContent = "";
      break;
  }
}

function loadForm2() {
  const nameInput = document.getElementById("confirmName");
  const nameError = document.getElementById("nameError");

  if (formData.name) {
    nameInput.value = formData.name;
    nameError.style.display = "none"; // ✅ hide error
  } else {
    nameError.style.display = "none"; // keep hidden initially
  }
}
document.getElementById("confirmName").addEventListener("input", function () {
  if (this.value.trim()) {
    document.getElementById("nameError").style.display = "none";
  }
});

function showForm(step) {
  for (let i = 1; i <= 9; i++) {
    document.getElementById(`form${i}`).style.display =
      i === step ? "block" : "none";
  }
   if (step === 2) {
    loadForm2();
  }
  updateProgressBar();
}

submitButton1.addEventListener("click", async () => {
  const showProductError = document.getElementById("productError");
   if (!selectedProduct) {
     showProductError.style.display = "block";
     // Scroll to the product grid so the user sees the error
     document.getElementById("productGrid").scrollIntoView({ behavior: 'smooth' });
     return false;
   } else {
     showProductError.style.display = "none";
   }
 
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
  const otpInputs = document.querySelectorAll(".form-otp-box input");
  // const dummyOTP = "1234";
  // otpInputs.forEach((input, index) => {
  //   input.value = dummyOTP[index];
  // });
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


  async function callPostVerificationAPIs(mobileNumber) {
  console.log('=== Calling Post-Verification APIs ===');
  
  try {
    // 1. Call readConsent API with mobileNumber and deviceId
    console.log('Calling readConsent API...');
    const consentResponse = await fetch('https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/readConsent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber: mobileNumber,
        deviceId: deviceId
      })
    });

    const consentData = await consentResponse.json();
    console.log('readConsent Response:', consentData);

    if (consentData.success) {
      console.log('✅ Consent Read Successfully');
      
    } else {
      console.warn('⚠️ readConsent failed:', consentData.message);
    }

    const readCartResponse = await fetch('https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/readFromMyCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber: mobileNumber,
      })
    });

    const readFromMyCartData = await readCartResponse.json();
    console.log('readConsent Response:', readFromMyCartData);

    if (readFromMyCartData.success) {
      console.log('✅ Consent Read Successfully');
    } else {
      console.warn('⚠️ readConsent failed:',readFromMyCartData.message);
    }

    // 3. Call cdLoanRead API with mobileNumber
    console.log('Calling cdLoanRead API...');
    const loanResponse = await fetch('https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/cdLoanInsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber: mobileNumber,
        eventCode: "PDP_DETAILS",
        assetCategory: formData.optionTitle,
        sfdcCategory: formData.productId
      })
    });

    const loanData = await loanResponse.json();
    console.log('cdLoanRead Response:', loanData);

    if (loanData.success) {
      console.log('✅ CD Loan Data Read Successfully');
      
      // 4. Stores response in formData.loanData
      formData.loanData = loanData.data;
    } else {
      console.warn('⚠️ cdLoanRead failed:', loanData.message);
    }

    const loanReadResponse = await fetch('https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/cdLoanRead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber: mobileNumber,
      })
    });

    const loanReadData = await loanReadResponse.json();
    console.log('readConsent Response:', loanReadData);

    if (loanReadData.success) {
      console.log('✅ Consent Read Successfully');
    } else {
      console.warn('⚠️ readConsent failed:', loanReadData.message);
    }

  } catch (error) {
    console.error('❌ Error calling post-verification APIs:', error);
    // Don't block the flow even if these APIs fail
  }
}
verifyOTPSubmitButton.addEventListener("click", async () => {
  const mobile = document.getElementById("mobile").value;
  const otp = Array.from(document.querySelectorAll(".form-otp-box input"))
    .map((input) => input.value)
    .join("");
  
  if (otp.length === 6) {
    // Disable verify button during API call
    verifyOTPSubmitButton.disabled = true;
    
    // Check URL parameter for m=1 mode
    const urlParams = new URLSearchParams(window.location.search);
    const isModeM1 = urlParams.get('m') === '1';

    // Call validate OTP API
    const isValid = await verifyOTP(mobile, otp);
    
    if (isValid) {
       const loadingIndicator = document.getElementById("loadingIndicator");
       loadingIndicator.style.display = "block";
       await callPostVerificationAPIs(mobile);
       loadingIndicator.style.display = "none";
      if (isModeM1) {
        // Mode M1: Redirect to thank you page
        setTimeout(() => {
          sessionStorage.setItem("userName", formData.name);
          sessionStorage.setItem("selectedProduct", selectedProduct);
          window.location.href = "thankyou.html";
        }, 500);
      } else {
        // Normal Flow: Close modal and show next step
        closeModal();
        showForm(currentStep);
      }
    } else {
      // Show error for invalid OTP
      const errorMsg = document.querySelector(".invalid-otp");
      errorMsg.style.display = "block";
      errorMsg.textContent = "Invalid OTP! Please try again.";
    }
    
    verifyOTPSubmitButton.disabled = false;
  }
});
function closeModal() {
  document.getElementById("otp-section-container").style.display = "none";
}
async function verifyOTP(mobileNumber, otp) {
  console.log('=== Calling Validate OTP API ===');
  console.log('Mobile Number:', mobileNumber);
  console.log('Device ID:', deviceId);
  console.log('Transaction ID:', txId);
  console.log('OTP:', otp);

  try {
    const response = await fetch('https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/validateOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        txId: txId,
        mobileNumber: mobileNumber,
        otp: otp
      })
    });

    const data = await response.json();
    console.log('Validate OTP Response:', data);

    if (data.success && data.data.statusCode === "7001") {
      console.log('✅ OTP Validated Successfully');
      
      // Store additional data from response
      // formData.secretId = data.data.bflId || "APP_" + Date.now();
      // formData.access_token = data.data.access_token;
      
      // Clarity tracking
      // if (typeof clarity !== 'undefined') {
      //   clarity('set', 'mobile', formData.mobile);
      //   clarity('set', 'application_id', formData.secretId);
      //   clarity('set', 'name', formData.name);
      // }

      // console.log(`Analytics: mobile: ${formData.mobile}, name: ${formData.name}, applicationId: ${formData.secretId}`);
      return true;
    } else {
      console.error('❌ OTP Validation Failed:', data.data?.description);
      return false;
    }
  } catch (error) {
    console.error('❌ Error calling validateOTP API:', error);
    return false;
  }
}


// async function verifyOTP(mobile, curretOTP) {
//   const DUMMY_OTP = "123456";
  
//   // Get URL parameters
//   const urlParams = new URLSearchParams(window.location.search);
//   const isModeM1 = urlParams.get('m') === '1';

//   if (curretOTP === DUMMY_OTP) {
//     console.log("OTP verified successfully");
    
//     formData.secretId = "DUMMY_" + Date.now();
    
//     // Clarity tracking
//     if (typeof clarity !== 'undefined') {
//       clarity('set', 'mobile', formData.mobile);
//       clarity('set', 'application_id', formData.secretId);
//       clarity('set', 'name', formData.name);
//     }

//     // Logic for URL parameter m=1
//     if (isModeM1) {
//       // Use setTimeout as requested
//       setTimeout(() => {
//         // Store data in sessionStorage
//         sessionStorage.setItem("userName", formData.name);
//         sessionStorage.setItem("selectedProduct", selectedProduct);
        
//         // Redirect to thank you page
//         window.location.href = "thankyou.html";
//       }, 500); // 500ms delay
//     } else {
//       // Normal Flow: Close modal and show next step
//       closeModal();
//       showForm(currentStep);
//     }
    
//     console.log(`Analytics: mobile: ${formData.mobile}, name: ${formData.name}, applicationId: ${formData.secretId}`);
//   } else {
//     // Show error for wrong OTP
//     const errorMsg = document.querySelector(".invalid-otp");
//     errorMsg.style.display = "block";
//     errorMsg.textContent = "Invalid OTP! Use 1234 for testing";
//   }
// }

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
  console.log('Device ID:', deviceId);
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
  formData.productId = selectedProductId; // From your product selection logic
  formData.optionTitle = selectedProduct;
  formData.step = "step1";
  console.log(formData);

  try {
    const response = await fetch(
      "https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/generateOTP",
      // https://asia-south1-ads-ai-101.cloudfunctions.net/card_api/getotp
      // "http://localhost//api/generateOTP",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber: formData.mobile,deviceId: deviceId }),
      }
    );

    // Check if the response is OK (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();
    if (data.success && data.data.txId) {
          // Store txId for later use in validateOTP
          txId = data.data.txId;
          console.log('✅ OTP Generated Successfully');
          console.log('Transaction ID:', txId);
          return true;
    } else {
      console.error('❌ Failed to generate OTP:', data.message);
      alert('Failed to generate OTP. Please try again.');
      return false;
    }
  } catch (error) {
    console.error("Error in sending OTP:", error);
    // Handle the error as needed
  }
}

function splitFullName(fullName) {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    return {
      firstName: parts[0],
      surName: "NA"
    };
  }

  return {
    firstName: parts[0],
    surName: parts[parts.length - 1]
  };
}


async function validateForm2() {
  const nameError = document.getElementById("nameError");
  const fullName = document.getElementById("confirmName").value.trim();

  // ❌ Validation
  if (!fullName) {
    nameError.style.display = "block";
    return false;
  } else {
    nameError.style.display = "none";
  }

  // Save data
  formData.fullName = fullName;
  formData.step = "step2";

  // Split name
  const { firstName, surName } = splitFullName(fullName);

  console.log("Split Name:", { firstName, surName });

  try {
    // 🔹 STEP 1: CD Loan Insert
    const cdResponse = await fetch("https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/cdLoanInsert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobileNumber: formData.mobile,
        eventCode: "CD_PD_01",
        fullName
      })
    });

    const cdResult = await cdResponse.json();
    console.log("CD Loan Insert Response:", cdResult);

    if (!cdResponse.ok || cdResult.success === false) {
      alert(cdResult.message || "CD Loan Insert failed");
      return false;
    }

    // 🔹 STEP 2: Softpull API
    const softpullResponse = await fetch("https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/softpull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobileNumber: formData.mobile,
        firstName,
        surName
      })
    });

    const softpullResult = await softpullResponse.json();
    console.log("Softpull Response:", softpullResult);

    // ⚠️ Softpull failure should NOT block journey
    if (!softpullResponse.ok || softpullResult.success === false) {
      console.warn("⚠️ Softpull failed, continuing journey");
    }

    // ✅ Move to next step
    currentStep++;
    showForm(currentStep);

  } catch (error) {
    console.error("API Error:", error);
    alert("Server error. Please try again.");
  }
}


async function validateForm3() {
  const genderError = document.getElementById("genderError");
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    genderError.style.display = "block";
    return false;
  } else {
    genderError.style.display = "none";
  }
  formData.gender = gender.value;
  formData.step = "step3";

  // ✅ Payload for API
  const payload = {
    mobileNumber: formData.mobile, // already stored from step-1
    eventCode: "CD_PD_02",
    gender: formData.gender
  };

  console.log("Calling API with payload:", payload);

  try {
    const response = await fetch("https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/cdLoanInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("API Response:", result);

    if (!response.ok || result.success === false) {
      alert(result.message || "Something went wrong");
      return false;
    }

    // ✅ API success → go next
    currentStep++;
    showForm(currentStep);

  } catch (error) {
    console.error("API Error:", error);
    alert("Server error. Please try again.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const dobInput = document.getElementById("dob");
  const today = new Date();

  // Calculate the date 23 years ago
  const maxDate = new Date(
    today.getFullYear() - 23,
    today.getMonth(),
    today.getDate()
  );

  const maxDateStr = maxDate.toISOString().split("T")[0];
  dobInput.setAttribute("max", maxDateStr);

  document.getElementById("dobError").style.display = "none";
});


async function validateForm4() {
  const dobError = document.getElementById("dobError");
  const dob = document.getElementById("dob").value;
  if (dob === "") {
    dobError.textContent = "Date of Birth is required";
    dobError.style.display = "block";
    // isValid = false;
    return false;
  } else {
    dobError.style.display = "none";
  }
  const birthDate = new Date(dob);
  const today = new Date();  // January 02, 2026

  // Calculate exact age
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age <= 23) {
    dobError.textContent = "You must be above 23 years old to apply.";
    dobError.style.display = "block";
    return false;
  }
  formData.dob = dob;
  formData.step = "step4";

  // ✅ Payload for API
  const payload = {
    mobileNumber: formData.mobile, // already stored from step-1
    eventCode: "CD_PD_03",
    date_of_birth: formData.dob
  };

  console.log("Calling API with payload:", payload);

  try {
    const response = await fetch("https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/cdLoanInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("API Response:", result);

    if (!response.ok || result.success === false) {
      alert(result.message || "Something went wrong");
      return false;
    }

    // ✅ API success → go next
    currentStep++;
    showForm(currentStep);

  } catch (error) {
    console.error("API Error:", error);
    alert("Server error. Please try again.");
  }
}

async function validateForm5() {
  const pancardError = document.getElementById("panCardError");
  const panCardvalidError = document.getElementById("panCardvalidError");
  const panCard = document.getElementById("panCard").value;
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
  formData.pan = panCard;
  formData.step = "step5";

  // ✅ Payload for API
  const payload = {
    mobileNumber: formData.mobile, // already stored from step-1
    eventCode: "CD_PD_04",
    pan: formData.pan
  };

  console.log("Calling API with payload:", payload);

  try {
    const response = await fetch("https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/cdLoanInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("API Response:", result);

    if (!response.ok || result.success === false) {
      alert(result.message || "Something went wrong");
      return false;
    }

    // ✅ API success → go next
    currentStep++;
    showForm(currentStep);

  } catch (error) {
    console.error("API Error:", error);
    alert("Server error. Please try again.");
  }
}


async function validateForm6() {
   const employmentError = document.getElementById("employmentError");
  const employment = document.querySelector('input[name="employment"]:checked');

  if (!employment) {
    employmentError.style.display = "block";
    return false;
  } else {
    employmentError.style.display = "none";
  }
  formData.employment = employment.value;
  formData.step = "step6";

  // ✅ Payload for API
  const payload = {
    mobileNumber: formData.mobile, // already stored from step-1
    eventCode: "CD_PD_05",
    employmentType: formData.employment
  };

  console.log("Calling API with payload:", payload);

  try {
    const response = await fetch("https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/cdLoanInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("API Response:", result);

    if (!response.ok || result.success === false) {
      alert(result.message || "Something went wrong");
      return false;
    }

    // ✅ API success → go next
    currentStep++;
    showForm(currentStep);

  } catch (error) {
    console.error("API Error:", error);
    alert("Server error. Please try again.");
  }
}
const PINCODE_API_URL = "https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/getProductByPincode";
document.getElementById("pincode").addEventListener("input", async function () {
  const pincode = this.value.trim();

  // Reset city on change
  document.getElementById("city").value = "";

  // Validate pincode length
  if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
    return;
  }

  try {
    const response = await fetch(PINCODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mobileNumber: formData.mobile,
        pincode: pincode
      })
    });

    const result = await response.json();
    console.log("API Response:", result);

    if (result.success && result.data?.pinCodeMasterList) {
      const b2bCity =
        result.data.pinCodeMasterList.B2B?.[0]?.city || "";
      const wheelsCity =
        result.data.pinCodeMasterList.WHEELS?.[0]?.City || "";

      const city = b2bCity || wheelsCity;

      if (city) {
        document.getElementById("city").value = city;
      }
    }
  } catch (error) {
    console.error("Error fetching city:", error);
  }
});

async function validateForm7() {
  const currentpincode = document.getElementById("pincode");
  const currentpincodeError = document.getElementById("pincodeError");
  if (currentpincode.value === "") {
    currentpincodeError.style.display = "block";
    return false;
  } else {
    currentpincodeError.style.display = "none";
  }
  formData.pincode = currentpincode.value;
  formData.step = "step7";

  // ✅ Payload for API
  const payload = {
    mobileNumber: formData.mobile, // already stored from step-1
    eventCode: "CD_PD_06",
    pincode: formData.pincode
  };

  console.log("Calling API with payload:", payload);

  try {
    const response = await fetch("https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/cdLoanInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("API Response:", result);

    if (!response.ok || result.success === false) {
      alert(result.message || "Something went wrong");
      return false;
    }

    // ✅ API success → go next
    currentStep++;
    showForm(currentStep);

  } catch (error) {
    console.error("API Error:", error);
    alert("Server error. Please try again.");
  }
}

async function validateForm8() {
  const consent1 = document.getElementById('consent1').checked;
  const consent2 = document.getElementById('consent2').checked;
  // consent3 is optional

  if (!consent1 || !consent2) {
    alert('Please accept the required terms and conditions.');
    return false;
  }

  submitButton8.disabled = true;
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "block";

  

  try {
    // Helper to make POST requests
    const apiPost = async (endpoint, data) => {
      const response = await fetch(`https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${response.status}`);
      }

      return await response.json();
    };

    console.log('Step 1: Reading current consent status...');

    try {
      const readConsentRes = await apiPost('/readConsent', { mobileNumber: formData.mobile });
      if (readConsentRes.success) {
        console.log('✅ Consent read successfully');
      } else {
        console.warn('⚠️ readConsent failed, continuing with other APIs...');
      }
    } catch (error) {
      console.warn('⚠️ readConsent error:', error.message, '- continuing with other APIs...');
    }


    console.log('Step 2: Inserting CD_CONSENT event...');
    const consentInsertRes = await apiPost('/cdLoanInsert', {
      mobileNumber: formData.mobile,
      eventCode: "CD_CONSENT"
    });

    if (!consentInsertRes.success) {
      throw new Error(consentInsertRes.message || 'Consent insertion failed');
    }

    console.log('Step 3: Inserting CD_KYC event...');
    const kycInsertRes = await apiPost('/cdLoanInsert', {
     mobileNumber: formData.mobile,
      eventCode: "CD_KYC"
    });

    if (!kycInsertRes.success) {
      throw new Error(kycInsertRes.message || 'KYC insertion failed');
    }

    console.log('Step 4: Reading final loan data...');
    const loanReadRes = await apiPost('/cdLoanRead', {mobileNumber: formData.mobile });

    if (!loanReadRes.success) {
      throw new Error(loanReadRes.message || 'Failed to read loan data');
    }

    // Extract the fields you want from the decrypted response
    const loanData = loanReadRes.data.cDLoanData || {};

    const aproveStatus = loanData.aproveStatus || loanData.approvalStatus || null;
    const approvedAmountStr = loanData.approvedLoanAmt || loanData.eligibleLoanAmt || "0";
    const approvedAmount = parseInt(approvedAmountStr.replace(/,/g, '')) || 0;

    const assetCategory = loanData.assetCategory || 'N/A'; // "Washing Machine"

    console.log('=== Loan Offer Details ===');
    console.log('Approved Status :', aproveStatus);
    console.log('Approved Amount :', approvedAmount);
    console.log('Asset Category  :', assetCategory);

   
    // Populate the beautiful approval card
    const approvalCard = document.querySelector(".loan-offer-card");
    const notEligible = document.querySelector(".not-eligible");
    
    if (aproveStatus === "Approved" && approvedAmount && approvedAmount !== "N/A") {
      approvalCard.style.display = "block";
      notEligible.style.display = "none";
    
      document.getElementById("approvedAmountDisplay").textContent = 
        `₹${parseInt(approvedAmount).toLocaleString('en-IN')}`;
    
      document.getElementById("categoryDisplay").textContent = 
        `Category: ${assetCategory || 'Consumer Durable'}`;
    
    } else {
      approvalCard.style.display = "none";
      notEligible.style.display = "block";
    }

     loadingIndicator.style.display = "none";
     submitButton8.disabled = false;
     currentStep++;
     showForm(currentStep);
     closeprogress();

  } catch (error) {

    console.error('Error during consent flow:', error);
    alert('Something went wrong: ' + error.message);
    loadingIndicator.style.display = "none";
  } finally {
    // Re-enable button
    submitButton8.disabled = false;
    submitButton8.value = "Apply Now";
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
    zeroscoreText.classList.remove("hidden");
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
