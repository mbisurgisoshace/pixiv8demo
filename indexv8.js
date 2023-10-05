import { Application, autoDetectRenderer, Graphics, Container } from "pixi.js";

const app = new Application();
const wrapper = new Container();
(async () => {
  await app.init({
    backgroundAlpha: 1,
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    resizeTo: window,
    autoDensity: true,
    hello: true,
  });

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  document.body.appendChild(app.canvas);
  app.stage.addChild(wrapper);

  for (let i = 0; i < 1000; i++) {
    const rectangle = new Graphics();
    rectangle.rect(0, 0, 64, 64);
    rectangle.fill(0x66ccff);
    // rectangle.eventMode = "static";
    // rectangle.on("pointerdown", onDragStart, rectangle);
    rectangle.stroke({ width: 1, color: "0xff3300" });
    rectangle.x = app.screen.width * Math.random();
    rectangle.y = app.screen.height * Math.random();
    wrapper.addChild(rectangle);
  }

  // or
  //const renderer = await autoDetectRenderer({}); // WebGL or WebGPU

  let startPos, lastPos, delta, isKeyDown, dragTarget;
  app.stage.on("pointerdown", onDown);
  app.stage.on("pointermove", onMove);
  app.stage.on("pointerup", onUP);
  app.stage.on("wheel", onWheel);
  //app.stage.on("pointerup", onDragEnd);
  //app.stage.on("pointerupoutside", onDragEnd);

  //   function onDragMove(event) {
  //     if (dragTarget) {
  //       dragTarget.parent.toLocal(event.global, null, dragTarget.position);
  //     }
  //   }

  //   function onDragStart() {
  //     this.alpha = 0.5;
  //     dragTarget = this;
  //     app.stage.on("pointermove", onDragMove);
  //   }

  //   function onDragEnd() {
  //     if (dragTarget) {
  //       app.stage.off("pointermove", onDragMove);
  //       dragTarget.alpha = 1;
  //       dragTarget = null;
  //     }
  //   }

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
    wrapper.x += delta.x;
    wrapper.y += delta.y;
  }
  function onUP(e) {
    isKeyDown = false;
  }

  const smoothZoom = 60;
  function onWheel(e) {
    const v = e.deltaY < 0 ? 1 : -1;
    const s = (v * smoothZoom) / 1000;
    wrapper.scale.x += s;
    wrapper.scale.y += s;
  }
})();
