class JoyPilot {
    constructor(tolerance = 0.1, updateRate = 16, buttonMap, stickMap) {
        this.tolerance = tolerance;
        this.updateRate = updateRate;
        this.gamepads = [];
        this.onPress = null;
        this.onRelease = null;
        this.onHold = null;
        this.onStickMove = null;
        this.onStickRelease = null;
        this.onConnect = null;
        this.onDisconnect = null;
        this.previousAxes = {};
        this.previousButtons = {};
        this.isStickReleased = {};
        this.buttonMap = buttonMap || {};
        this.stickMap = stickMap || {};
    }

    connectGamepad(gamepad) {
        this.gamepads[gamepad.index] = gamepad;
        this.previousAxes[gamepad.index] = this._initializeAxesData();
        this.isStickReleased[gamepad.index] = false;
        if (this.onConnect) this.onConnect(gamepad.index);
        this.startLoop();
    }

    disconnectGamepad(gamepad) {
        delete this.gamepads[gamepad.index];
        if (this.onDisconnect) this.onDisconnect(gamepad.index);
        if (Object.keys(this.gamepads).length === 0) {
            this.stopLoop();
        }
    }

    startLoop() {
        this.loopId = setInterval(this.update.bind(this), this.updateRate);
    }

    stopLoop() {
        clearInterval(this.loopId);
    }

    update() {
        this.updateGamepadState();
    }

    _initializeAxesData() {
        const axesData = {};
        for (const key in this.stickMap) {
            axesData[this.stickMap[key]] = 0;
        }
        return axesData;
    }

    updateGamepadState() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        gamepads.forEach((gamepad, gamepadIndex) => {
            if (gamepad) {
                
                gamepad.buttons.forEach((button, buttonIndex) => {
                    const pressed = button.pressed;
                    const value = button.value; 
                    const buttonName = this.buttonMap[buttonIndex] || `Button ${buttonIndex}`;
                    if (pressed && !this.previousButtons[gamepadIndex]?.[buttonIndex]) {
                        if (this.onPress) this.onPress(buttonName, gamepadIndex, value);
                    } else if (!pressed && this.previousButtons[gamepadIndex]?.[buttonIndex]) {
                        if (this.onRelease) this.onRelease(buttonName, gamepadIndex, value);
                    } else if (pressed) {
                        if (this.onHold) this.onHold(buttonName, gamepadIndex, value);
                    }
                    this.previousButtons[gamepadIndex] = this.previousButtons[gamepadIndex] || [];
                    this.previousButtons[gamepadIndex][buttonIndex] = pressed;
                });

              
                const axesData = this.previousAxes[gamepadIndex];
                let isStickMoved = false;

                gamepad.axes.forEach((axisValue, axisIndex) => {
                    const stickName = this.stickMap[axisIndex] || `Stick ${axisIndex}`;
                    if (Math.abs(axisValue) > this.tolerance) {
                        axesData[stickName] = axisValue;
                        isStickMoved = true;
                        this.isStickReleased[gamepadIndex] = false;

                        // Call onStickMove with stickName
                        if (this.onStickMove) {
                            this.onStickMove(stickName, gamepadIndex, { ...axesData });
                        }
                    } else if (axesData[stickName] !== 0) {
                        axesData[stickName] = 0;
                    }
                });

                if (!isStickMoved && !this.isStickReleased[gamepadIndex]) {
                    // Call onStickRelease with stickName
                    if (this.onStickRelease) {
                        Object.keys(axesData).forEach((stickName) => {
                            this.onStickRelease(stickName, gamepadIndex, { ...axesData });
                        });
                    }
                    this.isStickReleased[gamepadIndex] = true; 
                }
            }
        });
    }
}
