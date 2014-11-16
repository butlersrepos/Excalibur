﻿/// <reference path="../../../../dist/Excalibur.d.ts"/>

var game = new ex.Engine(500, 500, "game");
var box = new ex.Actor(50, 50, 100, 100, ex.Color.Red);

// Enable Gamepad support
game.input.gamepads.enabled = true;

// Move box with Up, Down, Left, Right keyboard keys
// Move box with Gamepad axes and D-pad
box.on("update", (ue: ex.UpdateEvent) => {

   var pad1 = game.input.gamepads.at(0);
   var axesLeftX = pad1.getAxes(ex.Input.Axes.LeftStickX);
   var axesLeftY = pad1.getAxes(ex.Input.Axes.LeftStickY);

   // Right/Left
   if (game.input.keyboard.isKeyPressed(ex.Input.Keys.Right) ||
       pad1.isButtonPressed(ex.Input.Buttons.DpadRight)) {
      box.dx = 20;
   } else if (game.input.keyboard.isKeyPressed(ex.Input.Keys.Left) ||
      pad1.isButtonPressed(ex.Input.Buttons.DpadLeft)) {
      box.dx = -20;
   } else if (!axesLeftX && !axesLeftY) {
      box.dx = 0;
   }

   // Up/Down
   if (game.input.keyboard.isKeyPressed(ex.Input.Keys.Up) ||
       pad1.isButtonPressed(ex.Input.Buttons.DpadUp)) {
      box.dy = -20;
   } else if (game.input.keyboard.isKeyPressed(ex.Input.Keys.Down) ||
      pad1.isButtonPressed(ex.Input.Buttons.DpadDown)) {
      box.dy = 20;
   } else if (!axesLeftY && !axesLeftX) {
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

game.on("update", (ue: ex.UpdateEvent) => {

   var keys = game.input.keyboard.getKeys().map((k) => {
      return (ex.Input.Keys[k] || "Unknown") + "(" + k.toString() + ")";
   }).join(", ");

   document.getElementById("key-presses").innerHTML = keys;
   document.getElementById("gamepad-num").innerHTML = game.input.gamepads.count().toString();

   var axesLeftX = game.input.gamepads.at(0).getAxes(ex.Input.Axes.LeftStickX);
   var axesLeftY = game.input.gamepads.at(0).getAxes(ex.Input.Axes.LeftStickY);

   document.getElementById("gamepad-left-stick").innerHTML = "(" + axesLeftX.toString() + "," + axesLeftY.toString() + ")";
   
});

game.add(box);
game.add(cursor);

game.start();