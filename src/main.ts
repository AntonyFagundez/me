import "./animation.css";
import ButtonManager from "./Button/ButtonManager";
import { DrawCanvas } from "./Canvas/DrawCanvas";
import "./Dialog/dialog";
import "./Input/InputManager";
import "./style.css";

function main() {
  DrawCanvas();
  new ButtonManager();
}

main();
