let currentStep = 1;


const prevBtns = document.querySelectorAll(".btn-prev");
prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        currentStep--;
        showForm(currentStep);
    });
});

function closeprogress() {
    // document.getElementById('progress-section').style.display = 'none';
    document.querySelector('.progress-container').classList.add('hidden');
    document.querySelector('.nav-btn').classList.add('hidden');
    document.querySelector('.Congress-boxs').classList.remove('hidden');
}
function openprogress() {
    document.querySelector('.progress-container').classList.remove('hidden');
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const progressHeading = document.getElementById('progress-heading');
    const progressPercentage = (currentStep / 7) * 100;

    progressBar.style.width = progressPercentage + '%';
    progressText.textContent = `${currentStep}/7`;

    switch (currentStep) {
        case 1:
            progressHeading.textContent = '';
            break;
        case 2:
            progressHeading.textContent = '';
            break;
        case 3:
            progressHeading.textContent = '';
            break;
        case 4:
            progressHeading.textContent = '';
            break;
        case 5:
            progressHeading.textContent = '';
            break;
        case 6:
            progressHeading.textContent = '';
            break;
        case 7:
            progressHeading.textContent = '';
            break;
    }
}

function showForm(step) {
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`form${i}`).style.display = i === step ? 'block' : 'none';
    }
    updateProgressBar();
}

function validateForm1() {
    const showError = document.getElementById('firstNameError')  // Validate first name
    const firstName = document.getElementById('firstName').value;
    if (firstName === "") {;
        showError.style.display = "block";
        return false;
    }
    else {
        showError.style.display = "none";
    }

    // Validate first name
    const lastName = document.getElementById('lastName').value;
    const lastError = document.getElementById('lastNameError');
    if (lastName === "") {
        lastError.style.display = 'block';
        return false;
    } else {
        lastError.style.display = 'none';
    }


    // Validate mobile number
    const mobile = document.getElementById('mobile').value;
    const mobilePattern = /^[0-9]{10}$/;
    const showMobileError = document.getElementById('mobileError');
    const showMobile10digitError = document.getElementById('showMobile10digitError');
    if (mobile === "") {
        showMobileError.style.display = 'block';
        showMobile10digitError.style.display = 'none';
        return false;
    } else if (!mobilePattern.test(mobile)) {
        showMobile10digitError.style.display = 'block';
        showMobileError.style.display = 'none';
        return false;
    }
    else {
        showMobileError.style.display = 'none';
        showMobile10digitError.style.display = 'none';
    }


    return true

}



// otp section start 


function showOTPSection() {
    console.log("called...")
    if (!validateForm1()) {
        return;
    }
    currentStep++;
    showForm(currentStep);
    console.log("API Calling..............1-FORM");
    // console.log(currentStep)
    // Show the OTP section
    document.getElementById('otp-section-container').style.display = 'block';
    document.querySelector('.hero-heading').classList.add('hidden');
    document.querySelector('.nav-btn').classList.remove('hidden');
    document.querySelector('.progress-container').classList.remove('hidden');
    document.querySelector('.hero-section').classList.remove('hidden');
    document.querySelector('.form-container-form-2').classList.remove('hidden');
    document.querySelector('.hero-home-section').classList.add('hidden');


    const thirtySeconds = 30,
        display = document.querySelector('#timer');
    startTimer(thirtySeconds, display);
}

function moveToNext(current, nextFieldId) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldId).focus();
        Array.from(document.querySelectorAll('.form-otp-box input')).every(input => input.value);
    }
}

document.querySelectorAll('.form-otp-box input').forEach((input, index, inputs) => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs[index - 1].focus();
        }
    });

    // Automatically submit the form when the last OTP field is filled
    input.addEventListener('input', () => {
        if (index === inputs.length - 1 && input.value.length === input.maxLength) {
            const validOtp = '1234'; // Replace with actual OTP verification logic
            const isValidOTP = verifyOTP(validOtp);

        }
    });
});

// function verifyOTP() {
//     const otp = Array.from(document.querySelectorAll('.form-otp-box input')).map(input => input.value).join('');
//     const validOtp = '1234'; // Replace with actual OTP verification logic

//     if (otp === validOtp) {
//         // alert('OTP verified successfully!');
//         document.getElementById('form2').classList.add('form-2');
//         document.getElementById('otp-section-container').style.display = 'none';
//         document.querySelector('form').submit(); // Automatically submit the form
//     } else {
//         document.querySelector('.invalid-otp').style.display = 'block';
//     }
// }



function closeModal() {
    document.getElementById('otp-section-container').style.display = 'none';
}

function verifyOTP(curretOTP) {
    const otp = Array.from(document.querySelectorAll('.form-otp-box input')).map(input => input.value).join('');
    // const otp = document.getElementById('otp').value;

    if (otp === curretOTP) { // Example OTP for demonstration
        // alert('OTP verified successfully!');
        closeModal();
        showForm(currentStep);
    } else {
        document.querySelector('.invalid-otp').style.display = 'block';
    }
}

document.getElementById('verifyOTP').style.display = 'none';

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    const interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "00:" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            document.querySelector('.resend-timer-box').style.display = 'none';
            document.querySelector('.resend-otp').style.display = 'block';
            document.getElementById('verifyOTP').style.display = 'block';
        }
    }, 1000);
}
function resendotp() {
    const thirtySeconds = 30,
        display = document.querySelector('#timer');
    startTimer(thirtySeconds, display);
    document.querySelector('.resend-timer-box').style.display = 'block';
    document.querySelector('.resend-otp').style.display = 'none';

}

// otp section end 





function validateForm2() {
    // const email = document.getElementById('email').value;
    // const gender = document.querySelector('input[name="gender"]:checked');



    // Add click event listeners to each gender box

    const genderAllBox = Array.from(document.getElementsByClassName("gender-box"));

    // Select all box elements
    console.log(genderAllBox)
    // Add click event listeners to each box
    genderAllBox.forEach(box => {
        box.addEventListener('click', () => {
            // Remove 'color' class from all boxes
            // genderAllBox.forEach(otherBox => {
            //     if (otherBox !== box) {
            //         otherBox.classList.remove('color');
            //         otherBox.style.border = '1px solid #aeaeae'; // Reset background color
            //         otherBox.style.backgroundColor = '#fff';
            //     }
            // });
            console.log(box)
            // Toggle 'color' class on the clicked box
            // box.classList.toggle('color');
            // console.log(box.querySelector("span").textContent)

            // // Set background color based on 'color' class
            // if (box.classList.contains('color')) {
            //     box.style.border = '1px solid #235d80';
            //     box.style.backgroundColor = '#EBF9FF';
            // } else {
            //     box.style.border = '1px solid #aeaeae'; // Reset background color
            //     box.style.backgroundColor = '#fff';
            // }
        });
    });



    // Validate email
    const emailError = document.getElementById('emailError');
    const emailvalidError = document.getElementById('emailvalidError');
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        emailError.style.display = 'block';
        emailvalidError.style.display = 'none';
        // isValid = false;
        return false;
    } else if (!emailPattern.test(email)) {
        emailvalidError.style.display = 'block';
        emailError.style.display = 'none';
        // isValid = false;
        return false;
    }
    else {
        emailError.style.display = 'none';
        emailvalidError.style.display = 'none';
    }

    // Validate Gender
    const genderError = document.getElementById('genderError');
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        genderError.style.display = 'block';
        return false;
    }
    else {
        genderError.style.display = 'none';
    }

    if (email && gender) {
        currentStep++;
        showForm(currentStep);
        console.log("API Calling..............2-FORM");
    } else {
        // alert('Please fill in all fields correctly.');
    }
}

function validateForm3() {

    const maritalAllBox = Array.from(document.getElementsByClassName("marital-box"));

    maritalAllBox.forEach(box => {
        box.addEventListener('click', () => {
            maritalAllBox.forEach(otherBox => {
                if (otherBox !== box) {
                    otherBox.classList.remove('color');
                }
            });

            box.classList.toggle('color');
            if (box.classList.contains('color')) {
                box.style.border = '1px solid #235d80';
                box.style.backgroundColor = '#EBF9FF';
            } else {
                box.style.border = '1px solid #aeaeae';
                box.style.backgroundColor = '#fff';
            }
        });
    });

    // let isValid = true;
    // Validate Date of Birth
    const dobError = document.getElementById('dobError');
    const dob = document.getElementById('dob').value;
    if (dob === "") {
        dobError.style.display = 'block';
        // isValid = false;
        return false;
    }
    else {
        dobError.style.display = 'none';
    }

    const maritalError = document.getElementById('maritalError');
    const maritalStatus = document.querySelector('input[name="marital-status"]:checked');
    if (!maritalStatus) {
        maritalError.style.display = 'block';
        // isValid = false;
        return false;
    } else {
        maritalError.style.display = 'none';
    }

    if (dob && maritalStatus) {
        currentStep++;
        showForm(currentStep);
        console.log("API Calling..............3-FORM");
    }

}



function validateFor6() {



    // Add click event listeners to each education box
    const educationAllBox = Array.from(document.getElementsByClassName("education-boxs"));

    educationAllBox.forEach(box => {
        box.addEventListener('click', () => {
            // Remove 'color' class from all boxes
            educationAllBox.forEach(otherBox => {
                if (otherBox !== box) {
                    otherBox.classList.remove('color');
                    otherBox.style.border = '1px solid #aeaeae';
                    otherBox.style.backgroundColor = '#fff';
                }
            });

            // Toggle 'color' class on the clicked box
            box.classList.toggle('color');
            console.log(box.querySelector("p").textContent);

            // Set background color based on 'color' class
            if (box.classList.contains('color')) {
                box.style.border = '1px solid #235d80';
                box.style.backgroundColor = '#EBF9FF';
            } else {
                box.style.border = '1px solid #aeaeae';
                box.style.backgroundColor = '#fff';
            }
        });
    });

    const educationError = document.getElementById('educationError');
    const education = document.querySelector('input[name="education"]:checked');

    if (!education) {
        educationError.style.display = 'block';
        return false;
    }
    else {
        educationError.style.display = 'none';
    }

    currentStep++;
    showForm(currentStep);
    console.log("API Calling..............4-FORM");
}


function validateForm4() {


    // Add click event listeners to each education box
    const employmentAllBox = Array.from(document.getElementsByClassName("employment-boxs"));

    employmentAllBox.forEach(box => {
        box.addEventListener('click', () => {
            // Remove 'color' class from all boxes
            employmentAllBox.forEach(otherBox => {
                if (otherBox !== box) {
                    otherBox.classList.remove('color');
                    otherBox.style.border = '1px solid #aeaeae';
                    otherBox.style.backgroundColor = '#fff';
                }
            });

            // Toggle 'color' class on the clicked box
            box.classList.toggle('color');
            console.log(box.querySelector("h6").textContent);

            // Set background color based on 'color' class
            if (box.classList.contains('color')) {
                box.style.border = '1px solid #235d80';
                box.style.backgroundColor = '#EBF9FF';
            } else {
                box.style.border = '1px solid #aeaeae';
                box.style.backgroundColor = '#fff';
            }
        });
    });

    const employmentError = document.getElementById('employmentError');
    const employment = document.querySelector('input[name="employment"]:checked');

    if (!employment) {
        employmentError.style.display = 'block';
        return false;
    }
    else {
        employmentError.style.display = 'none';
    }
    currentStep++;
    showForm(currentStep);
    console.log("API Calling..............5-FORM");

}


function Congratulations() {
    // document.querySelectorAll('.Congress-box').classList.remove('hidden');
    document.getElementById('Congress-box').style.display = 'block';
}

function validateForm5() {
    // const maritalAllBox = Array.from(document.getElementsByClassName("marital-box"));

    // maritalAllBox.forEach(box => {
    //     box.addEventListener('click', () => {
    //         maritalAllBox.forEach(otherBox => {
    //             if (otherBox !== box) {
    //                 otherBox.classList.remove('color');
    //             }
    //         });

    //         box.classList.toggle('color');
    //         if (box.classList.contains('color')) {
    //             box.style.border = '1px solid #235d80';
    //             box.style.backgroundColor = '#EBF9FF';
    //         } else {
    //             box.style.border = '1px solid #aeaeae';
    //             box.style.backgroundColor = '#fff';
    //         }
    //     });
    // });

    // let isValid = true;

    // const maritalStatus = document.querySelector('input[name="marital-status"]:checked');
    // if (!maritalStatus) {
    //     document.getElementById('maritalError').textContent = 'Marital Status is required';
    //     isValid = false;
    // } else {
    //     document.getElementById('maritalError').textContent = '';
    // }

        const incomeSelect = document.getElementById('Income');
        const incomeError = document.getElementById('incomeError');

        if (incomeSelect.value === "") {
            incomeError.style.display = 'block';
            return false;
        } else {
            incomeError.style.display = 'none';
        }

    const pancardError = document.getElementById('panCardError');
    const panCardvalidError = document.getElementById('panCardvalidError');
    const panCard = document.getElementById('panCard').value;
    const panCardPattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    if (panCard === "") {
        pancardError.textContent = 'PAN Card is required';
        pancardError.style.display = 'block';
        panCardvalidError.style.display = 'none';
        return false;
    } else if (!panCardPattern.test(panCard)) {
        panCardvalidError.style.display = 'block';
        pancardError.style.display = 'none';
        return false;
    } else {
        pancardError.style.display = 'none';
        panCardvalidError.style.display = 'none';
    }

    if (incomeSelect && panCard) {
        showForm(7);
        closeprogress();
        Congratulations();
        console.log("API Calling..............6-FORM");
    }
}


// Initialize the form
showForm(currentStep);





// credit meter Slider

function updateInput2(value) {
    document.getElementById('rangeValue2').value = value;
    updateVisibility(value);
}

function updateSlider2(value) {
    document.querySelector('.ranges').value = value;
    updateVisibility(value);
}

// Update Visibility Based on Credit Score
function updateVisibility(value) {
    const zeroscore = document.querySelector('.zeroscore');
    const notApprove = document.querySelector('.not-approve');
    const approve = document.querySelector('.approve');
    const journeyBtn = document.querySelector('.journey-btn');
    const scoreReport = document.querySelector('.score-report');
    const zeroscoreText = document.querySelector('.zeroscore-sub-text');
    const notApproveText = document.querySelector('.not-approve-sub-text');
    const approveText = document.querySelector('.approve-sub-text');

    // Hide all elements initially
    zeroscore.classList.add('hidden');
    notApprove.classList.add('hidden');
    approve.classList.add('hidden');
    journeyBtn.classList.add('hidden');
    scoreReport.classList.add('hidden');
    zeroscoreText.classList.add('hidden');
    notApproveText.classList.add('hidden');
    approveText.classList.add('hidden');

    // Show/hide elements based on credit score
    if (value == 300) {
        zeroscore.classList.remove('hidden');
    }
    else if (value > 300 && value < 600) {
        notApprove.classList.remove('hidden');
        scoreReport.classList.remove('hidden');
        notApproveText.classList.remove('hidden');
    }
    else if (value >= 600 && value <= 850) {
        approve.classList.remove('hidden');
        journeyBtn.classList.remove('hidden');
        scoreReport.classList.remove('hidden');
        approveText.classList.remove('hidden');
    }
}

// Initialize visibility on page load
window.onload = function () {
    const initialValue = document.getElementById('rangeValue2').value;
    updateVisibility(initialValue);
};




