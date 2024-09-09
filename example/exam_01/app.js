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

const joyPilot = new JoyPilot(0.1, 16,buttonMap, stickMap);

joyPilot.onPress = (buttonName, gamepadIndex, value) => {
    console.log(`${buttonName} pressed on Gamepad ${gamepadIndex} with value : ${value}`);
    const buttonElement = document.getElementById(`button-${buttonName}`);
    if (buttonElement) {
        buttonElement.classList.add('active');
        buttonElement.innerText = `${buttonName} (${value.toFixed(2)})`;
    }
};

joyPilot.onHold = (buttonName, gamepadIndex, value) => {
    console.log(`${buttonName} held on Gamepad ${gamepadIndex} with value : ${value}`);
    const buttonElement = document.getElementById(`button-${buttonName}`);
    if (buttonElement) {
        buttonElement.classList.add('active');
        buttonElement.innerText = `${buttonName} (${value.toFixed(2)})`;
    }
};

joyPilot.onRelease = (buttonName, gamepadIndex, value) => {
    console.log(`${buttonName} released on Gamepad ${gamepadIndex} with value : ${value}`);
    const buttonElement = document.getElementById(`button-${buttonName}`);
    if (buttonElement) {
        buttonElement.classList.remove('active');
        buttonElement.innerText = `${buttonName} (${value.toFixed(2)})`;
        setTimeout(() => {
            buttonElement.innerText = buttonName; 
        }, 500);
    }
};




joyPilot.onStickMove = (stickName, gamepadIndex, axesData) => {
    // console.log(`Analog Stick ${stickName} moved on Gamepad ${gamepadIndex}`, axesData);
    updateEle(axesData)
};

joyPilot.onStickRelease = (stickName, gamepadIndex, axesData) => {
    //console.log(`Analog Stick ${stickName} released on Gamepad ${gamepadIndex}`, axesData);
    updateEle(axesData)
};


// شروع تست با اتصال گیم‌پد
window.addEventListener("gamepadconnected", (event) => {
    joyPilot.connectGamepad(event.gamepad);
});

window.addEventListener("gamepaddisconnected", (event) => {
    joyPilot.disconnectGamepad(event.gamepad);
});




joyPilot.onConnect = (gamepadIndex) => {
    console.log(`Gamepad ${gamepadIndex} connected`);
};

joyPilot.onDisconnect = (gamepadIndex) => {
    console.log(`Gamepad ${gamepadIndex} disconnected`);
};

function updateEle(axesData) {
    // Update displayed axis values
    document.querySelector('#AXIS_0 span').innerHTML = axesData["Left_Stick_X"];
    document.querySelector('#AXIS_1 span').innerHTML = axesData["Left_Stick_Y"];
    document.querySelector('#AXIS_2 span').innerHTML = axesData["Right_Stick_X"];
    document.querySelector('#AXIS_3 span').innerHTML = axesData["Right_Stick_Y"];

    // Handle stick movement for both circles
    updateStickPosition('.circle-right', axesData["Right_Stick_X"], axesData["Right_Stick_Y"]);
    updateStickPosition('.circle-left', axesData["Left_Stick_X"], axesData["Left_Stick_Y"]);
}

function updateStickPosition(circleSelector, axisX, axisY) {
    const circle = document.querySelector(circleSelector);
    const point = circle.querySelector('.circle-point');

    const circleRadius = circle.clientWidth / 2; // Circle radius
    const pointRadius = point.clientWidth / 2;   // Point radius

    // Calculate final position of the point
    const finalX = circleRadius + (axisX * circleRadius) - pointRadius;
    const finalY = circleRadius + (axisY * circleRadius) - pointRadius;

    // Set the position of the point
    point.style.left = `${finalX}px`;
    point.style.top = `${finalY}px`;
}
