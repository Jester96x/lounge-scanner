let scanner = null;
const logs = [];

document.getElementById("checkin").addEventListener("click", () => {
  startScanner("CHECK-IN");
});

document.getElementById("checkout").addEventListener("click", () => {
  startScanner("CHECK-OUT");
});

function startScanner(mode) {
  // Stop previous scanner
  if (scanner) scanner.stop();

  // Start new scanner
  Instascan.Camera.getCameras()
    .then(function (cameras) {
      if (cameras.length > 0) {
        scanner = new Instascan.Scanner({
          video: document.getElementById("preview"),
        });
        scanner.addListener("scan", function (content) {
          // Log the scan with timestamp
          const timestamp = new Date().toLocaleString();
          logs.push({ mode, barcode: content, time: timestamp });
          updateLogs();
          alert(`${mode}: ${content}`);
        });
        scanner.start(cameras[0]);
      } else {
        alert("No cameras found. Try on a mobile device or enable camera access.");
      }
    })
    .catch(function (error) {
      console.error("Camera error:", error);
      alert("Camera error: " + error);
    });
}

function updateLogs() {
  const logsDiv = document.getElementById("logs");
  logsDiv.innerHTML = logs
    .map(
      (log) => `
      <p>
        <strong>${log.mode}</strong>: 
        ${log.barcode} (${log.time})
      </p>`
    )
    .join("");
}