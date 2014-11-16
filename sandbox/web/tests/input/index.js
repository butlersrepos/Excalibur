/// <reference path="../../../../dist/Excalibur.d.ts"/>
var game = new ex.Engine(500, 500, "game");
var box = new ex.Actor(50, 50, 100, 100, ex.Color.Red);
// Enable Gamepad support
game.input.gamepads.enabled = true;
// Move box with Up, Down, Left, Right keyboard keys
// Move box with Gamepad axes and D-pad
box.on("update", function (ue) {
    var pad1 = game.input.gamepads.at(0);
    var axesLeftX = pad1.getAxes(0 /* LeftStickX */);
    var axesLeftY = pad1.getAxes(1 /* LeftStickY */);
    // Right/Left
    if (game.input.keyboard.isKeyPressed(39 /* Right */) || pad1.isButtonPressed(15 /* DpadRight */)) {
        box.dx = 20;
    }
    else if (game.input.keyboard.isKeyPressed(37 /* Left */) || pad1.isButtonPressed(14 /* DpadLeft */)) {
        box.dx = -20;
    }
    else if (!axesLeftX && !axesLeftY) {
        box.dx = 0;
    }
    // Up/Down
    if (game.input.keyboard.isKeyPressed(38 /* Up */) || pad1.isButtonPressed(12 /* DpadUp */)) {
        box.dy = -20;
    }
    else if (game.input.keyboard.isKeyPressed(40 /* Down */) || pad1.isButtonPressed(13 /* DpadDown */)) {
        box.dy = 20;
    }
    else if (!axesLeftY && !axesLeftX) {
        box.dy = 0;
    }
    // Axes movement
    if (Math.abs(axesLeftX) > 0) {
        box.dx = axesLeftX * 20;
    }
    if (Math.abs(axesLeftY) > 0) {
        box.dy = axesLeftY * 20;
    }
});
game.on("update", function (ue) {
    var keys = game.input.keyboard.getKeys().map(function (k) {
        return (ex.Input.Keys[k] || "Unknown") + "(" + k.toString() + ")";
    }).join(", ");
    document.getElementById("key-presses").innerHTML = keys;
    document.getElementById("gamepad-num").innerHTML = game.input.gamepads.count().toString();
    var axesLeftX = game.input.gamepads.at(0).getAxes(0 /* LeftStickX */);
    var axesLeftY = game.input.gamepads.at(0).getAxes(1 /* LeftStickY */);
    document.getElementById("gamepad-left-stick").innerHTML = "(" + axesLeftX.toString() + "," + axesLeftY.toString() + ")";
});
game.add(box);
game.add(cursor);
game.start();
//# sourceMappingURL=index.js.map