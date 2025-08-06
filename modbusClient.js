// modbusClient.js
const ModbusRTU = require("modbus-serial");

const client = new ModbusRTU();

async function connectSerial(port = "/dev/ttyUSB0", baudRate = 9600, slaveId = 1) {
    try {
        await client.connectRTUBuffered(port, { baudRate });
        client.setID(slaveId);
        console.log("✅ Connected to Modbus serial device");
    } catch (err) {
        console.error("❌ Failed to connect to Modbus:", err.message);
        throw err;
    }
}

module.exports = {
    client,
    connectSerial,
};
