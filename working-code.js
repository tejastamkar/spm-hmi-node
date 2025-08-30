// read burner js 
const ModbusRTU = require("modbus-serial");

const client = new ModbusRTU();



async function connectAndRead() {

    try {

        console.log("Connecting to serial port COM3...");

        await client.connectRTUBuffered("COM3", {

            baudRate: 9600,

            dataBits: 8,

            stopBits: 1,

            parity: "even",

        });



        client.setID(1);

        client.setTimeout(1000); // 1 second timeout



        const registerAddress = 4496;



        console.log(`Reading Holding Register at address ${ registerAddress }...`);

        const response = await client.readHoldingRegisters(registerAddress, 2);



        console.log(`Value at register ${ registerAddress }: ${ response.data[0]}`);



        await client.close();

        console.log("Serial port closed.");

    } catch (err) {

        console.error(`Error: ${ err.message }`);

        await client.close();

    }

}



// writeRegister.js

async function connectAndWrite() {

  try {

    console.log("Connecting to serial port COM3...");

    await client.connectRTUBuffered("COM3", {

      baudRate: 9600,

      dataBits: 8,

      stopBits: 1,

      parity: "even",

    });



    client.setID(1);

    client.setTimeout(1000); // 1 second timeout



    const registerAddress = 4505; // adjust this to your write address

    const valueToWrite = 7; // change to any value you want to write



    console.log(`Writing value ${valueToWrite} to register ${registerAddress}...`);

    await client.writeRegister(registerAddress, valueToWrite);



    console.log(`Successfully wrote value ${valueToWrite} to register ${registerAddress}`);



    await client.close();

    console.log("Serial port closed.");

  } catch (err) {

    console.error(`Error: ${err.message}`);

    await client.close();

  }

}


