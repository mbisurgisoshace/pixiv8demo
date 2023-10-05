import * as PIXI from "pixi.js";

let type = "WebGL";

if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

//PIXI.utils.sayHello(type);

const app = new PIXI.Application({
  backgroundAlpha: 1,
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  antialias: true,
  resolution: window.devicePixelRatio || 1,
  resizeTo: window,
  autoDensity: true,
});

app.stage.eventMode = "static";

document.body.appendChild(app.view);

const rectangle = new PIXI.Graphics();
rectangle.lineStyle({ width: 4, color: 0xff3300, alpha: 1 });
rectangle.beginFill(0x66ccff);
rectangle.drawRect(0, 0, 64, 64);
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
app.stage.addChild(rectangle);

for (let i = 0; i < 1000; i++) {
  const rectangle = new PIXI.Graphics();
  rectangle.lineStyle({ width: 4, color: 0xff3300, alpha: 1 });
  rectangle.beginFill(0x66ccff);
  rectangle.drawRect(0, 0, 64, 64);
  rectangle.endFill();
  rectangle.x = app.screen.width * Math.random();
  rectangle.y = app.screen.height * Math.random();
  app.stage.addChild(rectangle);
}
const smoothZoom = 60;
let startPos, lastPos, delta, isKeyDown;
addEventListener("pointerdown", onDown);
addEventListener("pointermove", onMove);
addEventListener("pointerup", onUP);
addEventListener("wheel", onWheel);

app.stage.on("pointerup", onDragEnd);
app.stage.on("pointerupoutside", onDragEnd);

function onDown(e) {
  isKeyDown = true;
  startPos = { x: e.x, y: e.y };
  lastPos = null;
}
function onMove(e) {
  if (!isKeyDown) return;
  if (!lastPos) delta = { x: startPos.x - e.x, y: startPos.y - e.y };
  else delta = { x: e.x - lastPos.x, y: e.y - lastPos.y };
  lastPos = { x: e.x, y: e.y };
  app.stage.x += delta.x;
  app.stage.y += delta.y;
}
function onUP(e) {
  isKeyDown = false;
}

function onWheel(e) {
  const v = e.deltaY < 0 ? 1 : -1;
  const s = (v * smoothZoom) / 1000;
  app.stage.scale.x += s;
  app.stage.scale.y += s;
}
