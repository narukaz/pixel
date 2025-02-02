//initial grid creation variables
let grid_width = document.getElementById("width-slider");
let grid_height = document.getElementById("height-slider");

let display_height = document.getElementById("height");
let display_width = document.getElementById("width");
let clr_elem = document.getElementById("color-picker-main");
let create_button = document.getElementById("create-button");

let default_height = 5; //default values
let default_width = 5; //default values

grid_width.value = default_width;
display_width.value = default_width;

grid_height.value = default_height;
display_height.value = default_height;

let width_data = document.getElementById("width-data");
let height_data = document.getElementById("height-data");
width_data.innerText = default_width + "W";
height_data.innerText = default_height + "H";

grid_height.addEventListener("input", () => {
  display_height.value = grid_height.value;
  height_data.innerText = grid_height.value + "H";
});

grid_width.addEventListener("input", () => {
  display_width.value = grid_width.value;
  width_data.innerText = grid_width.value + "W";
});

display_height.addEventListener("input", () => {
  if (display_height.value > 100) {
    display_height.value = 100;
    grid_height.value = display_height.value;
  } else {
    grid_height.value = display_height.value;
  }

  height_data.innerText = grid_height.value + "H";
});

display_width.addEventListener("input", () => {
  if (display_width.value > 100) {
    display_width.value = 100;
    grid_width.value = display_width.value;
  } else {
    grid_width.value = display_width.value;
  }
  width_data.innerText = grid_width.value + "W";
});

create_button.addEventListener("click", () => {
  const element = document.getElementById("dialog");
  element.classList.remove("dialog");
  element.classList.add("hidden");

  const grid_data = document.getElementById("grid_detail");
  grid_data.classList.remove("hidden");
  grid_data.classList.add("grid-dialog-detail");

  const toolbar = document.getElementById("toolbar");
  toolbar.classList.remove("hidden");
  toolbar.classList.add("toolbar");

  let color_input = document.getElementById("color-picker");

  let canvas = document.getElementById("canvas");
  canvas.style.display = "grid";
  // canvas.style.width ='100%'
  // canvas.style.height="100%"
  canvas.style.gridTemplateColumns = `repeat(${grid_width.value},0fr)`;
  canvas.style.gridTemplateRows = `repeat(${grid_height.value},0fr)`;
  canvas.style.margin = "auto auto";

  for (let i = 0; i < grid_height.value; i++) {
    //canvas Creation
    for (let j = 0; j < grid_width.value; j++) {
      let element = document.createElement("div");
      element.style.width = "50px";
      element.style.height = "50px";
      element.style.backgroundColor = `${color_input.value}`;
      element.style.border = "0.1px solid black";
      element.style.cursor = "pointer";
      element.setAttribute("id", `${i},${j}`);
      canvas.appendChild(element);
    }
  }
});
let paintTool = false;
let fillTool = false;
let eraseTool = false;
let shapeTool = false;
let saveTool = false;

function resetTool() {
  paintTool = false;
  fillTool = false;
  eraseTool = false;
  shapeTool = false;
  saveTool = false;
  return 1;
}

//paint tool
let brush = document.getElementById("brush");
let fill = document.getElementById("fill");
let erase = document.getElementById("erase");
let shaped = document.getElementById("shaped");
let save = document.getElementById("save");
let shapeTool_shapes = document.getElementById("shapetool_shapes")

let canvas = document.getElementById("canvas");


function findCircle(center,pointer){
    for(let i=center[0]-pointer[0]; i<center[0]+pointer; i++){
        console.log(i)
    }
    return
}

canvas.addEventListener("mouseover",(e)=>{
   
    if(!shapeTool)return

    if(shapeTool){
    let [y,x] = document.elementFromPoint(e.clientX,e.clientY).id.split(',').map(Number);
    let [middleY,MiddleX] = [Math.floor(grid_height.value/2), Math.floor(grid_width.value/2)]
        console.log(middleY,MiddleX)

        let mySquare =new Array(Math.abs(middleY-y))
        for(let k = 0;k<=middleY-y;k++){
                mySquare.push([])
        }
        console.log(mySquare)
        for(let i=middleY-y ; i<=middleY+middleY-y;i++){
            for(let j=MiddleX-2; i<=MiddleX+2;j++){
                if(i>=middleY+2 || i<=middleY-2 || j<=MiddleX-2 || j>= MiddleX+2){
                    mySquare[i][j] = 1
                }else{
                    mySquare[i][j]=0
                }
            } 
        }
        console.log(mySquare)
        

    // if(Math.abs(MiddleX-x)>2){
    //     findCircle([middleY,MiddleX],[y,x])
    // }
        
    
    }
    

})


canvas.addEventListener("click", (e) => {
  let target = document.elementFromPoint(e.clientX, e.clientY);
  let selectedColor = clr_elem.value;


  if (paintTool && !eraseTool) {
    target.style.backgroundColor = selectedColor;
  } else if (eraseTool && !paintTool) {
    target.style.backgroundColor = "white";
  } else if (fillTool) {
    let child = document.getElementById("canvas").children;
    let colorStructure = new Array();
    count = 0;

    for (let i = 0; i < grid_height.value; i++) {
      colorStructure.push([]);
      for (let j = 0; j < grid_width.value; j++) {
        colorStructure[i][j] = child[count].style.backgroundColor;
        count++;
      }
    }
    console.log(colorStructure);
    let csh = Number(grid_height.value);
    let csw = Number(grid_width.value);
    let baseColor = target.style.backgroundColor;
    let [y,x] = target.id.split(",")
    console.log(baseColor, selectedColor);
    function recursiveFiller(y, x, colorStructure, newColor, originalColor) {
    
      if (
        y < 0 ||
        y >= colorStructure.length ||
        x < 0 ||
        x >= colorStructure[0].length ||
        colorStructure[y][x] !== originalColor
      ) {
        return; // Stop if out of bounds or wrong color
      }

      // 2. Fill the current cell (NOW that we know it's valid)
      colorStructure[y][x] = newColor;
      recursiveFiller(y - 1, x, colorStructure, newColor, originalColor); // Up
      recursiveFiller(y + 1, x, colorStructure, newColor, originalColor); // Down
      recursiveFiller(y, x - 1, colorStructure, newColor, originalColor); // Left
      recursiveFiller(y, x + 1, colorStructure, newColor, originalColor); // Right

      return;
    }
    console.log(target.id)
    recursiveFiller(
      Number(y),
      Number(x),
      colorStructure,
      selectedColor,
      baseColor
    );

    for (let i = 0; i < csh; i++) {
      for (j = 0; j < csw; j++) {
        let fillElement = document.getElementById(`${i},${j}`);
        fillElement.style.backgroundColor = colorStructure[i][j];
      }
    }
  }
  }
);

//fill tool

console.log(paintTool, fillTool, eraseTool, saveTool, shapeTool);

//handling tollbar events



function resetButtons() {
  brush.classList.remove("toolbar-icons-selected");
  fill.classList.remove("toolbar-icons-selected");
  erase.classList.remove("toolbar-icons-selected");
  shaped.classList.remove("toolbar-icons-selected");
  save.classList.remove("toolbar-icons-selected");
  shapeTool_shapes.classList.remove("shape-active")
  shapeTool_shapes.classList.add("shape-deactive")
  brush.classList.add("toolbar-icons");
  fill.classList.add("toolbar-icons");
  erase.classList.add("toolbar-icons");
  shaped.classList.add("toolbar-icons");
  save.classList.add("toolbar-icons");
}

document.addEventListener("keyup", (event) => {
  let key_pressed = event.key;
  if (key_pressed == "b") {
    resetButtons();
    resetTool();
    paintTool = true;
    brush.classList.add("toolbar-icons-selected");
    return;
  }

  if (key_pressed == "f") {
    resetButtons();
    resetTool();
    fillTool = true;
    fill.classList.add("toolbar-icons-selected");
    return;
  }

  if (key_pressed == "e") {
    resetButtons();
    resetTool();
    eraseTool = true;
    erase.classList.add("toolbar-icons-selected");
    return;
  }

  if (key_pressed == "s") {
    resetButtons();
    resetTool();
    shapeTool = true;
    shaped.classList.add("toolbar-icons-selected");
    return;
  }
});

brush.addEventListener("click", () => {
  resetButtons();
  resetTool();
  brush.classList.add("toolbar-icons-selected");
  paintTool = true;
});

fill.addEventListener("click", () => {
  resetButtons();
  fill.classList.add("toolbar-icons-selected");
  resetTool();
  fillTool = true;
});

erase.addEventListener("click", () => {
  resetButtons();
  erase.classList.add("toolbar-icons-selected");
  resetTool();
  eraseTool = true;
});

shaped.addEventListener("click", () => {
  resetButtons();
  shapeTool_shapes.classList.add("shape-active")
  shaped.classList.add("toolbar-icons-selected");
  resetTool();
  shapeTool = true;
});

let shape_circle = document.getElementById("shape_circle")
let shape_square = document.getElementById("shape_square")
let selected_shape = ""

shape_circle.addEventListener('click',(e)=>{
    if(selected_shape ="square" || !selected_shape){
        resetButtons();
        shaped.classList.add("toolbar-icons-selected");
        shape_circle.classList.add("fa-circle-selected")
        shape_square.classList.remove('fa-square-selected')

        shapeTool_shapes.classList.remove("shape-active")
        shapeTool_shapes.classList.add("shape-deactive")
        selected_shape = 'circle'
    }
        
})

shape_square.addEventListener('click',(e)=>{
    resetButtons();
    shaped.classList.add("toolbar-icons-selected");
    shape_square.classList.add("fa-square-selected")
    shape_circle.classList.remove('fa-circle-selected')

    shapeTool_shapes.classList.remove("shape-active")
    shapeTool_shapes.classList.add("shape-deactive")
    selected_shape = 'square'
})



//shape event handler





save.addEventListener("click", () => {
  resetButtons();
  save.classList.add("toolbar-icons-selected");
  resetTool();
  saveTool = true;
});

//canvas
