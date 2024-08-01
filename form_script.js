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
    document.querySelector('.Congress-box').classList.remove('hidden');
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
            progressHeading.textContent = 'Basic Details';
            break;
        case 2:
            progressHeading.textContent = 'Email and Gender';
            break;
        case 3:
            progressHeading.textContent = 'Date of Birth';
            break;
        case 4:
            progressHeading.textContent = 'Education Qualification';
            break;
        case 5:
            progressHeading.textContent = 'Type of Employment';
            break;
        case 6:
            progressHeading.textContent = 'Pan Card';
            break;
        case 7:
            progressHeading.textContent = 'Credit Score';
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

    // Validate first name
    const firstName = document.getElementById('firstName').value;
    if (firstName === "") {
        document.getElementById('firstNameError').textContent = 'First Name is required';
        isValid = false;
    }

    // Validate first name
    const lastName = document.getElementById('lastName').value;
    if (lastName === "") {
        document.getElementById('lastNameError').textContent = 'Last Name is required';
        isValid = false;
    }


    // Validate mobile number
    const mobile = document.getElementById('mobile').value;
    const mobilePattern = /^[0-9]{10}$/;
    if (mobile === "") {
        document.getElementById('mobileError').textContent = 'Mobile Number is required';
        isValid = false;
    } else if (!mobilePattern.test(mobile)) {
        document.getElementById('mobileError').textContent = 'Enter a valid 10 digit mobile number';
        isValid = false;
    }


    if (firstName && lastName && mobile.match(/^\d{10}$/)) {
        currentStep++;
        showForm(currentStep);
    } else {
    }
}



// otp section start 


function showOTPSection() {
    // Show the OTP section
    document.getElementById('otp-section-container').style.display = 'block';
    document.querySelector('.hero-heading').classList.add('hidden');
    document.querySelector('.nav-btn').classList.remove('hidden');
    document.querySelector('.progress-container').classList.remove('hidden');
    // Validate first name
    const firstName = document.getElementById('firstName').value;
    if (firstName === "") {
        document.getElementById('firstNameError').textContent = 'First Name is required';
        isValid = false;
    }

    // Validate first name
    const lastName = document.getElementById('lastName').value;
    if (lastName === "") {
        document.getElementById('lastNameError').textContent = 'Last Name is required';
        isValid = false;
    }


    // Validate mobile number
    const mobile = document.getElementById('mobile').value;
    const mobilePattern = /^[0-9]{10}$/;
    if (mobile === "") {
        document.getElementById('mobileError').textContent = 'Mobile Number is required';
        isValid = false;
    } else if (!mobilePattern.test(mobile)) {
        document.getElementById('mobileError').textContent = 'Enter a valid 10 digit mobile number';
        isValid = false;
    }


    if (firstName && lastName && mobile.match(/^\d{10}$/)) {
        currentStep++;
        showForm(currentStep);
    } else {
    }
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
            verifyOTP();
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

function verifyOTP() {
    const otp = Array.from(document.querySelectorAll('.form-otp-box input')).map(input => input.value).join('');
    // const otp = document.getElementById('otp').value;
    const validOtp = '1234'; // Replace with actual OTP verification logic

    if (otp === validOtp) { // Example OTP for demonstration
        // alert('OTP verified successfully!');
        closeModal();
        currentStep++;
        showForm(currentStep);
    } else {
        document.querySelector('.invalid-otp').style.display = 'block';
    }
}


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
        }
    }, 1000);
}

window.onload = function () {
    const thirtySeconds = 30,
        display = document.querySelector('#timer');
    startTimer(thirtySeconds, display);
};
// otp section end 





function validateForm2() {
    // const email = document.getElementById('email').value;
    // const gender = document.querySelector('input[name="gender"]:checked');



    // Add click event listeners to each gender box

    const genderAllBox = Array.from(document.getElementsByClassName("gender-box"));

    // Select all box elements

    // Add click event listeners to each box
    genderAllBox.forEach(box => {
        box.addEventListener('click', () => {
            // Remove 'color' class from all boxes
            genderAllBox.forEach(otherBox => {
                if (otherBox !== box) {
                    otherBox.classList.remove('color');
                    otherBox.style.border = '1px solid #aeaeae'; // Reset background color
                    otherBox.style.backgroundColor = '#fff';
                }
            });

            // Toggle 'color' class on the clicked box
            box.classList.toggle('color');
            console.log(box.querySelector("span").textContent)

            // Set background color based on 'color' class
            if (box.classList.contains('color')) {
                box.style.border = '1px solid #235d80';
                box.style.backgroundColor = '#EBF9FF';
            } else {
                box.style.border = '1px solid #aeaeae'; // Reset background color
                box.style.backgroundColor = '#fff';
            }
        });
    });


    // Validate Date of Birth
    const dob = document.getElementById('dob').value;
    if (dob === "") {
        document.getElementById('dobError').textContent = 'Date of Birth is required';
        isValid = false;
    }
    else {
        document.getElementById('dobError').textContent = '';
    }

    // Validate Gender
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        document.getElementById('genderError').textContent = 'Gender is required';
        isValid = false;
    }
    // Validate email
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Enter a valid email';
        isValid = false;
    }
    else {
        document.getElementById('emailError').textContent = '';
    }
    if (email && gender) {
        currentStep++;
        showForm(currentStep);
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

    let isValid = true;

    const maritalStatus = document.querySelector('input[name="marital-status"]:checked');
    if (!maritalStatus) {
        document.getElementById('maritalError').textContent = 'Marital Status is required';
        isValid = false;
    } else {
        document.getElementById('maritalError').textContent = '';
    }
    // Validate Date of Birth
    const dob = document.getElementById('dob').value;
    if (dob === "") {
        document.getElementById('dobError').textContent = 'Date of Birth is required';
        isValid = false;
    }
    else {
        document.getElementById('dobError').textContent = '';
    }

    if (dob && maritalStatus) {
        currentStep++;
        showForm(currentStep);
    }

}



function validateForm4() {



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

    const education = document.querySelector('input[name="education"]:checked');

    if (education) {
        currentStep++;
        showForm(currentStep);
    } else {
        document.getElementById('educationError').textContent = 'Please fill education type';
    }
}


function validateForm5() {


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

    const employment = document.querySelector('input[name="employment"]:checked');

    if (employment) {
        currentStep++;
        showForm(currentStep);
    } else {
        document.getElementById('employmentError').textContent = 'Please fill employment type';
    }
}


function Congratulations() {
    // document.querySelectorAll('.Congress-box').classList.remove('hidden');
    document.getElementById('congress-box').style.display = 'block';
}

function validateForm6() {
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

    const panCard = document.getElementById('panCard').value;
    const panCardPattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    if (panCard === "") {
        document.getElementById('panCardError').textContent = 'PAN Card is required';
        isValid = false;
    } else if (!panCardPattern.test(panCard)) {
        document.getElementById('panCardError').textContent = 'Enter a valid PAN Card number';
        isValid = false;
    } else {
        document.getElementById('panCardError').textContent = '';
    }

    if (panCard) {
        showForm(7);
        closeprogress();
        Congratulations();
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




