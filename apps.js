// Debug version - confirms basic functionality
console.log("APP.JS IS LOADED!"); // Check browser console (F12)

// Basic button test
document.getElementById("checkin").onclick = function() {
  console.log("CHECK-IN CLICKED!");
  alert("Check-In button works!");
};

document.getElementById("checkout").onclick = function() {
  console.log("CHECK-OUT CLICKED!");
  alert("Check-Out button works!");
};
