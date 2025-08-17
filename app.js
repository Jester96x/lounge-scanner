console.log("Scanner script loaded!");

let scanner = null;

document.getElementById("checkin").addEventListener("click", () => {
  startScanner("CHECK-IN");
});

document.getElementById("checkout").addEventListener("click", () => {
  startScanner("CHECK-OUT");
});

function startScanner(mode) {
  if (scanner) scanner.stop();
  
  Instascan.Camera.getCameras()
    .then(cameras => {
      if (cameras.length > 0) {
        scanner = new Instascan.Scanner({
          video: document.getElementById("preview"),
          mirror: false
        });
        
        scanner.addListener('scan', content => {
          alert(`${mode}: ${content}`);
        });
        
        scanner.start(cameras[0]);
      } else {
        alert("No cameras found!");
      }
    })
    .catch(error => {
      console.error("Camera error:", error);
      alert("Camera error: " + error);
    });
}
