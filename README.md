# JoyPilot

**JoyPilot** is a lightweight JavaScript library for seamless gamepad management, allowing developers to easily handle button presses, releases, and analog stick movements. JoyPilot supports custom button and stick mappings, and provides event hooks for gamepad connection and disconnection. Ideal for web-based gaming projects and interactive applications.

## Installation

To install JoyPilot, use npm:

npm install joypilot

## Usage

You can use JoyPilot to easily manage gamepad input in your web-based projects. Here’s a basic example:

1. Import JoyPilot and create an instance:

import JoyPilot from 'joypilot';

```
const buttonMap = {
  0: 'A',
  1: 'B',
  2: 'X',
  3: 'Y',
  4: 'LB',
  5: 'RB',
  6: 'LT',
  7: 'RT',
  8: 'Back',
  9: 'Start',
  10: 'LS',
  11: 'RS',
  12: 'DPad_Up',
  13: 'DPad_Down',
  14: 'DPad_Left',
  15: 'DPad_Right'
};

const stickMap = {
  0: 'Left_Stick_X',
  1: 'Left_Stick_Y',
  2: 'Right_Stick_X',
  3: 'Right_Stick_Y'
};

const joyPilot = new JoyPilot(0.1, 16, buttonMap, stickMap);
```

2. Set up event listeners:

```
joyPilot.onPress = (buttonName, gamepadIndex, value) => {
  console.log(`${buttonName} pressed on Gamepad ${gamepadIndex} with value : ${value}`);
};

joyPilot.onRelease = (buttonName, gamepadIndex, value) => {
  console.log(`${buttonName} released on Gamepad ${gamepadIndex} with value : ${value}`);
};

joyPilot.onHold = (buttonName, gamepadIndex, value) => {
  console.log(`${buttonName} held on Gamepad ${gamepadIndex} with value : ${value}`);
};

joyPilot.onStickMove = (stickName, gamepadIndex, axesData) => {
  console.log(`Analog Stick ${stickName} moved on Gamepad ${gamepadIndex}`, axesData);
};

joyPilot.onStickRelease = (stickName, gamepadIndex, axesData) => {
  console.log(`Analog Stick ${stickName} released on Gamepad ${gamepadIndex}`, axesData);
};

3. Handle gamepad connection and disconnection:

window.addEventListener("gamepadconnected", (event) => {
  joyPilot.connectGamepad(event.gamepad);
});

window.addEventListener("gamepaddisconnected", (event) => {
  joyPilot.disconnectGamepad(event.gamepad);
});

```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.