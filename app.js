const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const brushSize = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const dash = document.getElementById("jsDash");
const erase = document.getElementById("jsErase");
const clear = document.getElementById("jsClear");
const ctx= canvas.getContext("2d");

const INITIAL_COLOR = "#FFFFFF";
/* pixel modifier */
canvas.width= 300;
canvas.height = 400;
/*canvas.backgroundColor = INITIAL_COLOR;*/

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let painting = false;
let filling = false;
let dashValue = 1;

function onMouseMove(event){
    /*console.log(event);*/
    const x= event.offsetX;
    const y= event.offsetY;
    /*console.log(x,y);*/
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function onMouseDown(event){
    painting =true;
}
function stopPainting(event){
    painting =false;
}
function startPainting(event){
    painting = true;
}
function handleColorClick(event){
    /*cosole.log(event.target.style)*/
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}
function handleBrushSize(event){
    /*console.log(event.target.value);*/
    const size = event.target.value;
    ctx.lineWidth = size;

}
function handleModeClick(){
    if(filling){
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
     }
}
function handleCanvasClick(event){ 
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
function handleCM(event){
    event.preventDefault();
    /* 마우스 우클릭 금지 */
}
function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    /*console.log(link); */
    link.href = image;
    link.download ="mypaint.jpeg";
    link.click();
}
function handleDashClick(){
    if(dashValue == 1 ){
        dashValue =2;
        dash.style.backgroundImage = "url(image/d2.png)";
        ctx.setLineDash([2,2]);
    }
    else if(dashValue ==2){
        dashValue =3;
        dash.style.backgroundImage = "url(image/d3.png)";
        ctx.setLineDash([20, 3, 3, 3, 3, 3, 3, 3]);
    }
    else{
        dashValue =1;
        dash.style.backgroundImage = "url(image/d1.png)";
        ctx.setLineDash([]);
    }
}

function handleEraseClick(){
    filling= false;
    ctx.strokeStyle = "#FFFFFF"
    ctx.setLineDash([]);
}
function handleClearClick(){
    filling = true;
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

if(canvas){
    /*events */
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

/* array 안의 for each 각각 아이템명칭 아무거나 해도됌 color,potato ... */
Array.from(colors).forEach(color=>
    color.addEventListener("click",handleColorClick) );


if(brushSize){
    brushSize.addEventListener("input",handleBrushSize);
}    

if(mode){
    mode.addEventListener("click",handleModeClick);
}
if(save){
    save.addEventListener("click",handleSaveClick);
}
if(dash){
    dash.addEventListener("click", handleDashClick);
}

if(clear){
    clear.addEventListener("click",handleClearClick);
}
if(erase){
    erase.addEventListener("click",handleEraseClick);
}