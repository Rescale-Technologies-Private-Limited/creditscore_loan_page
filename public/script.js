// API Configuration (kept for structure, but not used in demo)
const API_CONFIG = {
  generateOtpUrl: 'YOUR_API_ENDPOINT_HERE/generate-otp',
  verifyOtpUrl: 'YOUR_API_ENDPOINT_HERE/verify-otp'
}

// Product Selection with ID mapping
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
  })
})

// Form Validation & Submission
const submitBtn = document.getElementById("submitBtn")
const fullNameInput = document.getElementById("fullName")
const mobileNumberInput = document.getElementById("mobileNumber")
const termsCheckbox = document.getElementById("termsCheckbox")
const otpModal = document.getElementById("otpModal")
const mobileDisplay = document.getElementById("mobileDisplay")
const errorMessage = document.getElementById("errorMessage")

// Only allow numbers in mobile input
mobileNumberInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "")
})

// DEMO: Mock OTP generation - no API call
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault()

  // Validation
  if (!selectedProduct) {
    alert("Please select a product")
    return
  }

  if (!fullNameInput.value.trim()) {
    alert("Please enter your full name")
    fullNameInput.focus()
    return
  }

  if (mobileNumberInput.value.length !== 10) {
    alert("Please enter a valid 10-digit mobile number")
    mobileNumberInput.focus()
    return
  }

  if (!termsCheckbox.checked) {
    alert("Please agree to the Terms & Conditions")
    return
  }

  // Disable button and show loading state
  submitBtn.disabled = true
  submitBtn.textContent = "SENDING OTP..."

  // Fake delay to simulate sending OTP
  setTimeout(() => {
    const maskedMobile = mobileNumberInput.value.substring(0, 2) + "XXXXXX" + mobileNumberInput.value.substring(8)
    mobileDisplay.textContent = maskedMobile
    otpModal.classList.add("active")

    // Focus first OTP input
    document.querySelector(".otp-input").focus()

    // Re-enable button
    submitBtn.disabled = false
    submitBtn.textContent = "CHECK ELIGIBILITY >>>"
  }, 1000) // 1 second fake delay
})

// OTP Input Handling
const otpInputs = document.querySelectorAll(".otp-input")

otpInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    // Only allow numbers
    e.target.value = e.target.value.replace(/[^0-9]/g, "")

    // Move to next input
    if (e.target.value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus()
    }
  })

  input.addEventListener("keydown", (e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpInputs[index - 1].focus()
    }
  })
})

// DEMO: Mock OTP Verification - only 123456 works
const verifyBtn = document.getElementById("verifyBtn")

verifyBtn.addEventListener("click", async () => {
  let enteredOtp = ""
  otpInputs.forEach((input) => {
    enteredOtp += input.value
  })

  if (enteredOtp.length !== 6) {
    errorMessage.textContent = "Please enter complete 6-digit OTP"
    return
  }

  // Disable button and show loading state
  verifyBtn.disabled = true
  verifyBtn.textContent = "Verifying..."

  // Fake verification delay
  setTimeout(() => {
    if (enteredOtp === "123456") {
      // Success - Store data and redirect
      sessionStorage.setItem("userName", fullNameInput.value.trim())
      sessionStorage.setItem("selectedProduct", selectedProduct)

      window.location.href = "thankyou.html"
    } else {
      errorMessage.textContent = "Invalid OTP. Please try again. (Demo OTP: 123456)"
      otpInputs.forEach((input) => {
        input.value = ""
      })
      otpInputs[0].focus()
    }

    // Re-enable button
    verifyBtn.disabled = false
    verifyBtn.textContent = "Verify OTP"
  }, 1000) // 1 second fake delay
})

// DEMO: Resend OTP - just clears and reminds user
document.querySelector(".resend-btn").addEventListener("click", () => {
  errorMessage.textContent = ""
  otpInputs.forEach((input) => {
    input.value = ""
  })
  otpInputs[0].focus()
  alert("OTP has been resent! (Use 123456 for demo)")
})

// Close modal on outside click
otpModal.addEventListener("click", (e) => {
  if (e.target === otpModal) {
    otpModal.classList.remove("active")
  }
})

// API Configuration
// const API_CONFIG = {
//   generateOtpUrl: 'YOUR_API_ENDPOINT_HERE/generate-otp', // Replace with your actual API endpoint
//   verifyOtpUrl: 'YOUR_API_ENDPOINT_HERE/verify-otp' // Replace with your actual API endpoint
// }

// // Product Selection with ID mapping
// const productCards = document.querySelectorAll(".product-card")
// let selectedProduct = null
// let selectedProductId = null

// // Product ID mapping
// const productIdMap = {
//   'Smartphone': 'PHONE(WEB-MOBILE)',
//   'Smart TV': 'LED',
//   'Washing Machine': 'WASHING MACHINE',
//   'Laptop': 'LAPTOP',
//   'Kitchen Appliances': 'KITCHEN APPLIANCES',
//   'Home Appliances': 'AIR PURIFIER',
//   'Smart Watch': 'SMART WATCH',
//   'Headphone': 'HEADPHONE',
//   'Refrigerator': 'REFRIGERATOR',
//   'Air Conditioner': 'AIR CONDITIONER'
// }

// productCards.forEach((card) => {
//   card.addEventListener("click", () => {
//     productCards.forEach((c) => c.classList.remove("selected"))
//     card.classList.add("selected")
//     selectedProduct = card.dataset.product
//     selectedProductId = productIdMap[selectedProduct]
//   })
// })

// // Form Validation & Submission
// const submitBtn = document.getElementById("submitBtn")
// const fullNameInput = document.getElementById("fullName")
// const mobileNumberInput = document.getElementById("mobileNumber")
// const termsCheckbox = document.getElementById("termsCheckbox")
// const otpModal = document.getElementById("otpModal")
// const mobileDisplay = document.getElementById("mobileDisplay")
// const errorMessage = document.getElementById("errorMessage")

// // Only allow numbers in mobile input
// mobileNumberInput.addEventListener("input", (e) => {
//   e.target.value = e.target.value.replace(/[^0-9]/g, "")
// })

// submitBtn.addEventListener("click", async (e) => {
//   e.preventDefault()

//   // Validation
//   if (!selectedProduct) {
//     alert("Please select a product")
//     return
//   }

//   if (!fullNameInput.value.trim()) {
//     alert("Please enter your full name")
//     fullNameInput.focus()
//     return
//   }

//   if (mobileNumberInput.value.length !== 10) {
//     alert("Please enter a valid 10-digit mobile number")
//     mobileNumberInput.focus()
//     return
//   }

//   if (!termsCheckbox.checked) {
//     alert("Please agree to the Terms & Conditions")
//     return
//   }

//   // Disable button and show loading state
//   submitBtn.disabled = true
//   submitBtn.textContent = "SENDING OTP..."

//   try {
//     // API Call to generate OTP
//     const payload = {
//       id: selectedProductId,
//       optionTitle: selectedProduct,
//       name: fullNameInput.value.trim(),
//       phoneNumber: mobileNumberInput.value
//     }

//     console.log("Payload for OTP Generation:", payload)

//     const response = await fetch(API_CONFIG.generateOtpUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(payload)
//     })

//     const data = await response.json()

//     if (response.ok && data.success) {
//       // Show OTP Modal
//       const maskedMobile = mobileNumberInput.value.substring(0, 2) + "XXXXXX" + mobileNumberInput.value.substring(8)
//       mobileDisplay.textContent = maskedMobile
//       otpModal.classList.add("active")

//       // Focus first OTP input
//       document.querySelector(".otp-input").focus()
//     } else {
//       alert(data.message || "Failed to send OTP. Please try again.")
//     }
//   } catch (error) {
//     console.error("API Error:", error)
//     alert("Network error. Please check your connection and try again.")
//   } finally {
//     // Re-enable button
//     submitBtn.disabled = false
//     submitBtn.textContent = "CHECK ELIGIBILITY >>>"
//   }
// })

// // OTP Input Handling
// const otpInputs = document.querySelectorAll(".otp-input")

// otpInputs.forEach((input, index) => {
//   input.addEventListener("input", (e) => {
//     // Only allow numbers
//     e.target.value = e.target.value.replace(/[^0-9]/g, "")

//     // Move to next input
//     if (e.target.value && index < otpInputs.length - 1) {
//       otpInputs[index + 1].focus()
//     }
//   })

//   input.addEventListener("keydown", (e) => {
//     // Move to previous input on backspace
//     if (e.key === "Backspace" && !e.target.value && index > 0) {
//       otpInputs[index - 1].focus()
//     }
//   })
// })

// // OTP Verification
// const verifyBtn = document.getElementById("verifyBtn")

// verifyBtn.addEventListener("click", async () => {
//   let enteredOtp = ""
//   otpInputs.forEach((input) => {
//     enteredOtp += input.value
//   })

//   if (enteredOtp.length !== 6) {
//     errorMessage.textContent = "Please enter complete 6-digit OTP"
//     return
//   }

//   // Disable button and show loading state
//   verifyBtn.disabled = true
//   verifyBtn.textContent = "Verifying..."

//   try {
//     // API Call to verify OTP
//     const payload = {
//       phoneNumber: mobileNumberInput.value,
//       otp: enteredOtp,
//       productId: selectedProductId,
//       optionTitle: selectedProduct,
//       name: fullNameInput.value.trim()
//     }

//     const response = await fetch(API_CONFIG.verifyOtpUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(payload)
//     })

//     const data = await response.json()

//     if (response.ok && data.success) {
//       // Store data in sessionStorage
//       sessionStorage.setItem("userName", fullNameInput.value)
//       sessionStorage.setItem("selectedProduct", selectedProduct)

//       // Redirect to thank you page
//       window.location.href = "thankyou.html"
//     } else {
//       errorMessage.textContent = data.message || "Invalid OTP. Please try again."
//       otpInputs.forEach((input) => {
//         input.value = ""
//       })
//       otpInputs[0].focus()
//     }
//   } catch (error) {
//     console.error("API Error:", error)
//     errorMessage.textContent = "Network error. Please try again."
//   } finally {
//     // Re-enable button
//     verifyBtn.disabled = false
//     verifyBtn.textContent = "Verify OTP"
//   }
// })

// // Resend OTP
// document.querySelector(".resend-btn").addEventListener("click", async () => {
//   errorMessage.textContent = ""
//   otpInputs.forEach((input) => {
//     input.value = ""
//   })
//   otpInputs[0].focus()

//   try {
//     // API Call to resend OTP
//     const payload = {
//       productId: selectedProductId,
//       optionTitle: selectedProduct,
//       name: fullNameInput.value.trim(),
//       phoneNumber: mobileNumberInput.value
//     }

//     const response = await fetch(API_CONFIG.generateOtpUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(payload)
//     })

//     const data = await response.json()

//     if (response.ok && data.success) {
//       alert("OTP has been resent successfully!")
//     } else {
//       alert(data.message || "Failed to resend OTP. Please try again.")
//     }
//   } catch (error) {
//     console.error("API Error:", error)
//     alert("Network error. Please try again.")
//   }
// })

// // Close modal on outside click
// otpModal.addEventListener("click", (e) => {
//   if (e.target === otpModal) {
//     otpModal.classList.remove("active")
//   }
// })