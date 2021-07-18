document.querySelector("#startBLE").addEventListener("click", function (event) {
  event.stopPropagation();
  event.preventDefault();

  if ("bluetooth" in navigator) {
    onStartButtonClick();
  }
});

const connectionContainer = document.querySelector("#connectionContainer");
var connectButton = document.querySelector("#connect");
var gameArea = document.querySelector("#game");

// sensor
var varSense = 0;
var myCharacteristic;
let pauseGame = -1;

function onStartButtonClick() {
  // BLE Battery Service
  let serviceUuid = "756ab0ec-a387-11eb-bcbc-0242ac130000";

  // BLE Battery Level Characteristic
  let characteristicUuid = "757ab0ec-a387-11eb-bcbc-0242ac130001";

  console.log("Requesting Bluetooth Device...");
  navigator.bluetooth
    .requestDevice({ filters: [{ services: [serviceUuid] }] })
    .then((device) => {
      console.log("Connecting to GATT Server...");
      return device.gatt.connect();
    })
    .then((server) => {
      console.log("Getting Service...");
      return server.getPrimaryService(serviceUuid);
    })
    .then((service) => {
      console.log("Getting Characteristic...");
      return service.getCharacteristic(characteristicUuid);
    })
    .then((characteristic) => {
      connectButton.classList.add("off");
      gameArea.classList.remove("off");
      pauseGame = 0;
      console.log("____off__connectionContainer_");

      myCharacteristic = characteristic;
      return myCharacteristic.startNotifications().then((_) => {
        console.log("> Notifications started");
        myCharacteristic.addEventListener(
          "characteristicvaluechanged",
          handleNotifications
        );
      });
    })
    .catch((error) => {
      console.log("Argh! " + error);
    });
}

function handleNotifications(event) {
  let value = event.target.value;
  let a = [];
  // Convert raw data bytes to hex values just for the sake of showing something.
  // In the "real" world, you'd use data.getUint8, data.getUint16 or even
  // TextDecoder to process raw data bytes.
  for (let i = 0; i < value.byteLength; i++) {
    a.push(value.getUint8(i).toString(16));
  }
  console.log("> " + a.join(" "));

  varSense = a;
}
