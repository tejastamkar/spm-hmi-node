// index.js
const { connectSerial } = require("./modbusClient");
const { readDoorState, setDoorState } = require("./doorController");
const { readBurnerTimeMinute } = require("./burnerTime");

async function main() {
    await connectSerial("/dev/ttyUSB0", 9600, 1); // Adjust port & slave ID as needed


    // Read Door State
    await readDoorState();

    // Read Burner Time
    // await  readBurnerTimeMinute();

    // Set Burner Time (example: set to 120 seconds)
    // await setBurnerTime(120);

    // Toggle state: Open if closed, Close if open
    // await setDoorState(!currentState);
}

main().catch(err => {
    console.error("❌ Fatal error:", err);
});
