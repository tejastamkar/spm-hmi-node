// doorController.js
const { client } = require("./modbusClient");

const DOOR_ADDRESS = 1027; // 1027 - 1 for zero-based index

async function readDoorState() {
    try {
        const res = await client.readDiscreteInputs(DOOR_ADDRESS, 1);
        console.log("door state", res);
        const isOpen = res.data[0];
        console.log(`🚪 Door is ${isOpen ? "Open" : "Closed"}`);
        return isOpen;
    } catch (err) {
        console.error("❌ Error reading door state:", err.message);
        throw err;
    }
}

async function setDoorState(open = true) {
    try {
        await client.writeCoil(DOOR_ADDRESS, open);
        console.log(`✅ Door set to ${open ? "Open" : "Closed"}`);
    } catch (err) {
        console.error("❌ Error writing door state:", err.message);
        throw err;
    }
}

module.exports = {
    readDoorState,
    setDoorState,
};
