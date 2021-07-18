# MoonMakers-Pinball   -> [Launch experiment](https://diego-luna.github.io/MoonMakers-Pinball/)

## Overview

MoonMakers-Pinball in a game that works in the browser, where we use our Arduino Nano 33 BLE Sense, as a command to control the imposition of our ball thanks to AI.

It is a project developed for the TensorFlow Microcontroller Challenge, to create them we used standard web technologies (HTML, CSS and Javascript), matter.js, p5.js, Arduino Sense 33 BLE, TensorFlow Lite for microcontrollers,

## Experiment description and Notes

The project is divided into three stages:

1. Learning model:
    * Take accelerometer data.
    * Design the learning model.
2. Arduino:
    * Export the model as a library and add it to the arduino IDE.
    * Enable the BLE connection, to send information from our pairing model to the computer.
3. Web:
    * Let the browser detect our arduino and establish a connection. _nota: takes a few seconds to connect_
    * We give gravity to our ball, we detect collisions, to give us points and take our lives.


## Tools

- Linux, MacOS or Windows computer with Chrome installed.
- Arduino Nano BLE Sense 33.
- Micro USB cable.
- [Joy-con template.](https://drive.google.com/file/d/1U0f-BcuhmumUXzJR7sOlLnRSVBBUTaZ6/view?usp=sharing)
- [Optional] Battery.

## Install and Run

1. WEB.

- You can go to the link, and play from your browser.
- If you want to download the code, you will need to use a local server, you can use:

  * Using the Live Server extension for VS Code we can easily run a development web server for any local folder.
  * Node http-server:
     In the terminal type:

  ```
  npm install -g http-server
  ```

  From then on just cd to the folder that has the files you want to serve and type.

  ```
   browser-sync start --server -f -w
  ```

  * Node browser-sync:

  In the terminal type:

  ```
   npm install -g browser-sync
  ```

  From then on just cd to the folder that has the files you want to serve and type.

  ```
  http-server
  ```

2. Arduino
    1. Install the [Arduino IDE](https://www.arduino.cc/).

    2. Setup Arduino board:
        * Install the board by navigating to Tools > Board > Boards Manager and search for Arduino Mbed OS Nano Boards.

        * After the board is installed, select it under to Tools > Board > Arduino Mbed OS Nano Boards > Arduino Nano 33 BLE.

        * Select the port by navigating to Tools -> Port -> dev/cu... (Arduino Nano 33 BLE).
    3. Install Arduino libraries.
        * Navigate to Tools > Manage Libraries.
        * Search for and install:
            * Arduino_LSM9DS1.
            * ArduinoBLE.
            * Arduino_TensorFlowLite.

    4. Open the sketch and flash.
        * Download the MoonMakers-Pinball.ino
        * Click the Right arrow in the top left corner to build and upload the sketch.
        * Warning: This process may take a few minutes. Also, warnings may populate but the upload should still succeed in spite of them.



## librerias:

- WEB:

  - [matter.js](https://github.com/liabru/matter-js)
  - [p5.js](https://github.com/processing/p5.js)

- Arduino:
  - Arduino_LSM9DS1
  - ArduinoBLE
  - Arduino_TensorFlowLite

## More information about Web Bluetooth API:
  - [Communicating with Bluetooth devices over JavaScript](https://web.dev/bluetooth/).
  - [Web Bluetooth / Notifications Sample](https://googlechrome.github.io/samples/web-bluetooth/notifications.html?service=0x180F&characteristic=0x2A19).
  - [Web Bluetooth / Device Info Sample](https://googlechrome.github.io/samples/web-bluetooth/device-info.html?allDevices=true&service=BatteryMonitor&name=BatteryMonitor&namePrefix=BatteryMonitor).
