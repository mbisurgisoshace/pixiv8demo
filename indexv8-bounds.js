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

  document.body.appendChild(app.canvas);
  app.stage.addChild(wrapper);

  const parent = new Container();
  const parentRectangle = new Graphics();
  parentRectangle.uid = "parent";
  parentRectangle.rect(200, 200, 200, 450);
  parentRectangle.stroke({ width: 2, color: "0xff3300" });

  const childRectange = new Graphics();
  childRectange.uid = "child";
  childRectange.rect(205, 205, 100, 150);
  childRectange.fill(0x66ccff);
  childRectange.stroke({ width: 1, color: "0xff3300" });
  childRectange.eventMode = "static";
  childRectange.cursor = "pointer";
  childRectange.on("pointerdown", onDragStart, childRectange);

  wrapper.addChild(parentRectangle);
  wrapper.addChild(childRectange);

  let startPos, lastPos, delta, isKeyDown, dragTarget;

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  app.stage.on("pointerup", onDragEnd);
  app.stage.on("pointerupoutside", onDragEnd);

  function onDragStart(e) {
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on("pointermove", onDragMove);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.stage.off("pointermove", onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
    }
  }

  function onDragMove(e) {
    if (dragTarget) {
      // const parent = wrapper.children.find(
      //   (graphic) => graphic.uid === "parent"
      // );
      dragTarget.parent.toLocal(e.global, null, dragTarget.position);
    }
  }
})();
