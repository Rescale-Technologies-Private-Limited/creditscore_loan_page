let currentStep = 1;
let deviceId = null; // Store deviceId for the session
let txId = null;
let formData = {};
const submitButton1 = document.getElementById("submitotpbtn1");
const submitButton2 = document.getElementById("submitotpbtn2");
const submitButton3 = document.getElementById("submitotpbtn3");
const submitButton4 = document.getElementById("submitotpbtn4");
const submitButton5 = document.getElementById("submitotpbtn5");
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
    const response = await fetch('ttps://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/validateOTP', {
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
//   const DUMMY_OTP = "1234";
  
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
      "ttps://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/bajaj/generateOTP",
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

// async function validateForm5() {
//   const incomeSelect = document.getElementById("Income");
//   const incomeError = document.getElementById("incomeError");

//   if (incomeSelect.value === "") {
//     incomeError.style.display = "block";
//     return false;
//   } else {
//     incomeError.style.display = "none";
//   }

//   const pancardError = document.getElementById("panCardError");
//   const panCardvalidError = document.getElementById("panCardvalidError");
//   const panCard = document.getElementById("panCard").value;
//   // const pincode= document.getElementById("current-pincode").value;
//   // const pincodeError= document.getElementById("currentpincodeError");
//   const panCardPattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
//   if (panCard === "") {
//     pancardError.textContent = "PAN Card is required";
//     pancardError.style.display = "block";
//     panCardvalidError.style.display = "none";
//     return false;
//   } else if (!panCardPattern.test(panCard)) {
//     panCardvalidError.style.display = "block";
//     pancardError.style.display = "none";
//     return false;
//   } else {
//     pancardError.style.display = "none";
//     panCardvalidError.style.display = "none";
//   }

//   const currentpincode = document.getElementById("current-pincode");
//   const currentpincodeError = document.getElementById("currentpincodeError");
//   if (currentpincode.value === "") {
//     currentpincodeError.style.display = "block";
//     return false;
//   } else {
//     currentpincodeError.style.display = "none";
//   }

//   if (incomeSelect && panCard && currentpincode) {
//     formData.salary = incomeSelect.value;
//     formData.pan = panCard;
//     // Disable the button
//     submitButton5.disabled = true;
//     // Show the loading indicator
//     const loadingIndicator = document.getElementById("loadingIndicator");
//     loadingIndicator.style.display = "block";
//     formData.pincode = currentpincode.value;
//     formData.step = "step5";
//     console.log("API Calling..............5FORM", currentStep);

//     try {
//       console.log(formData);
//       const response = await fetch(
//         "https://asia-south1-ads-ai-101.cloudfunctions.net/loan_api_1/creditscore_submitForm",
//         // "http://localhost/creditscore_submitForm",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       // Check if the response is OK (status code in the range 200-299)
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // Parse the JSON data from the response
//       const data = await response.json();
//       //   {
//       //     "credit_score": 724,
//       //     "fetch_date": "2024-08-23T08:30:48.358408Z"
//       // }
//       // Storing the object in localStorage as a JSON string

//       // Log the data or use it as needed
//       submitButton5.disabled = false;
//       loadingIndicator.style.display = "none";
//       console.log(data);
//       showForm(++currentStep);
//       closeprogress();
//       Congratulations();
//       // if (data?.score === 0 || data?.score == null || data === null) {
//       document.getElementById("nocredit_remove").style.display = "none";
//       // }
//       updateVisibility(data?.score ?? 300);
//       updateSlider2(data?.score ?? 300);
//       updateInput2(data?.score ?? 300);
//       formData.credit_score = data?.score || null;
//       localStorage.setItem("loan", JSON.stringify(formData));
//       console.log(formData);
//     } catch (error) {
//       showForm(++currentStep);
//       closeprogress();
//       updateVisibility(300);
//       updateSlider2(300);
//       updateInput2(300);
//       document.getElementById("Congress-box").style.display = "none";
//       console.error("Error in Submitting the Form:", error);
//     }
//   }
// }

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
    formData.pincode = currentpincode.value;
    formData.step = "step5";

    // UI Updates
    submitButton5.disabled = true;
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "block";

    console.log("Simulating API Call with Dummy Data...");

    try {
      // 1. Simulate Network Latency (1.5 seconds)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 2. Define Dummy Response Data
      const dummyData = {
        score: 750, // You can change this value to test different UI states (300, 500, etc.)
        fetch_date: new Date().toISOString()
      };

      // 3. Handle the Dummy Data (Replacing original logic)
      const data = dummyData; 
      
      submitButton5.disabled = false;
      loadingIndicator.style.display = "none";
      
      console.log("Dummy Response Received:", data);

      // Existing UI logic continues here
      showForm(++currentStep);
      closeprogress();
      Congratulations();
      
      document.getElementById("nocredit_remove").style.display = "none";
      
      updateVisibility(data?.score ?? 300);
      updateSlider2(data?.score ?? 300);
      updateInput2(data?.score ?? 300);
      
      formData.credit_score = data?.score || null;
      localStorage.setItem("loan", JSON.stringify(formData));
      console.log("Final Form Data Saved:", formData);

    } catch (error) {
      // This catch block will only trigger if there is a JS error in your logic
      showForm(++currentStep);
      closeprogress();
      updateVisibility(300);
      updateSlider2(300);
      updateInput2(300);
      document.getElementById("Congress-box").style.display = "none";
      console.error("Error in Logic:", error);
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
