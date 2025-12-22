// Retrieve data from sessionStorage
document.addEventListener("DOMContentLoaded", () => {
  const userName = sessionStorage.getItem("userName")
  const selectedProduct = sessionStorage.getItem("selectedProduct")

  // Display user name
  if (userName) {
    document.getElementById("userName").textContent = userName
  } else {
    document.getElementById("userName").textContent = "Valued Customer"
  }

  // Display selected product
  if (selectedProduct) {
    document.getElementById("selectedProduct").textContent = selectedProduct
  } else {
    document.getElementById("selectedProduct").textContent = "Electronics"
  }
})
