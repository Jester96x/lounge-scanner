console.log("Script loaded!"); // Check if this appears in console

// Button click handlers
document.getElementById("checkin").addEventListener("click", () => {
  console.log("Check-In clicked"); // Verify in console
  startScanner("CHECK-IN");
});

document.getElementById("checkout").addEventListener("click", () => {
  console.log("Check-Out clicked"); // Verify in console
  startScanner("CHECK-OUT");
});

function startScanner(mode) {
  console.log(`Starting scanner in ${mode} mode`);
  
  if (scanner) {
    scanner.stop();
    console.log("Stopped previous scanner");
  }

  Instascan.Camera.getCameras()
    .then(cameras => {
      if (cameras.length > 0) {
        scanner = new Instascan.Scanner({ 
          video: document.getElementById("preview") 
        });
        
        scanner.addListener("scan", content => {
          const time = new Date().toLocaleString();
          console.log(`Scanned: ${content} at ${time}`);
          alert(`${mode}: ${content}`);
        });
        
        scanner.start(cameras[0]);
        console.log("Scanner started with camera:", cameras[0].name);
      } else {
        alert("Error: No cameras found");
        console.error("No cameras detected");
      }
    })
    .catch(error => {
      console.error("Camera error:", error);
      alert("Camera error: " + error.message);
    });
}
