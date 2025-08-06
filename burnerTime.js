// readBurnerTime.js
const { client } = require("./modbusClient");


const address = 44495;
async function readBurnerTimeMinute() {
  try {

    // 📥 Read D400 (Modbus Address: 44496 → 0-based index: 44495)
    const res = await client.readHoldingRegisters(address, 1);
    console.log(`🔥 Reading Burner Time from address ${address}... ${res}`);
    const data = res.data;
    console.log(`🔥 Burner Time Display (Minutes): ${data[0]} min`);
  } catch (error) {
    console.error("❌ Error reading Burner Time:", error.message);
  } finally {
    client.close();
  }
}

async function setBurnerTime(seconds) {
  try {
    // Connect to serial port (Update port as needed: "COM3" for Windows or "/dev/ttyUSB0" for Linux)
    await client.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 9600 });
    client.setID(1); // Replace with your PLC's Modbus Slave ID

    const modbusAddress = 44503; // D408 → 44504 (1-based) → 44503 (0-based)

    // Write time (in seconds or minutes) to D408
    await client.writeRegister(modbusAddress, seconds);

    console.log(`✅ Burner Set Time updated to ${seconds} units`);
  } catch (error) {
    console.error("❌ Error setting Burner Time:", error.message);
  } finally {
    client.close();
  }
}


module.exports = {
  readBurnerTimeMinute,
  setBurnerTime
}