import "./style.css";
import alphabet from "./alphabet";
import { DARKEST_COLOR, PALLETE_MATRIX } from "./colors";

const canvas = document.getElementById("matrix") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

// canvas responsive
const { width, height } = getComputedStyle(canvas);  

canvas.width = parseInt(width);
canvas.height = parseInt(height);
const fontSize = 16;

const columns = canvas.width / fontSize;

const rainDrops = new Array(Math.floor(columns)).fill(1);

// Flag to render first darker color
let isFirst = true;

const draw = () => {

  context.fillStyle = "rgba(0, 0, 0, 0.075)";
  context.fillRect(0, 0, canvas.width, canvas.height);


  const randomColor = PALLETE_MATRIX[Math.floor(Math.random() * PALLETE_MATRIX.length)];


  context.fillStyle = isFirst ? DARKEST_COLOR : randomColor;
  context.font = `${fontSize}px monospace`;

  for(let i = 0; i < rainDrops.length; i++){
    const randomCharacter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    const positionX =  i * fontSize;
    const positionY =  rainDrops[i] * fontSize;


    const random = Math.random() > 0.95;

    context.fillText(randomCharacter, positionX, positionY);

    if(positionY > canvas.height && random){
      rainDrops[i] = 0;
      isFirst = false;
    }
    rainDrops[i]++;
  }
};


setInterval(draw, 50);



