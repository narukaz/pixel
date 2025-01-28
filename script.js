
//initial grid creation variables
let grid_width = document.getElementById('width-slider')
let grid_height = document.getElementById('height-slider')


let display_height = document.getElementById('height')
let display_width = document.getElementById('width')

let create_button = document.getElementById("create-button")



let default_height =10;//default values
let default_width =10;//default values


grid_width.value = default_width
display_width.value = default_width

grid_height.value = default_height
display_height.value = default_height



let width_data = document.getElementById("width-data") 
let height_data = document.getElementById("height-data") 
width_data.innerText = default_width + "W"
height_data.innerText = default_height + "H"

grid_height.addEventListener("input", ()=>{
      display_height.value = grid_height.value
      height_data.innerText = grid_height.value + "H"
      
})

grid_width.addEventListener("input", ()=>{
    display_width.value = grid_width.value
    width_data.innerText = grid_width.value + "W"
})


display_height.addEventListener("input", ()=>{
    if(display_height.value > 100){
        display_height.value =100
        grid_height.value = display_height.value

    }else{
        grid_height.value =  display_height.value
    }
    
    height_data.innerText = grid_height.value + "H"
})

display_width.addEventListener("input", ()=>{
    if(display_width.value>100){
        display_width.value =  100
        grid_width.value = display_width.value
    }else{
        grid_width.value = display_width.value 
    }
    width_data.innerText = grid_width.value + "W"
})

create_button.addEventListener('click', ()=>{

        const element = document.getElementById("dialog")
        element.classList.remove("dialog")
        element.classList.add("hidden")

        const grid_data = document.getElementById("grid_detail")
        grid_data.classList.remove("hidden")
        grid_data.classList.add("grid-dialog-detail")

        const toolbar = document.getElementById("toolbar")
        toolbar.classList.remove('hidden')
        toolbar.classList.add('toolbar')

        let color_input = document.getElementById('color-picker')

        let canvas = document.getElementById("canvas")
        canvas.style.display ='grid'
        // canvas.style.width ='100%'
        // canvas.style.height="100%"
        canvas.style.gridTemplateColumns = `repeat(${grid_width.value},0fr)`
        canvas.style.gridTemplateRows=`repeat(${grid_height.value},0fr)`
        canvas.style.margin='auto auto'

for(let i=0; i<grid_height.value ; i++){
    for(let j=0; j<grid_width.value ; j++){
        let element = document.createElement('div')
        element.style.width ='50px'
        element.style.height = '50px'
        element.style.backgroundColor=`${color_input.value}`
        element.style.border='0.1px solid black'
        element.style.cursor='pointer'
        element.setAttribute("id",`ele${i,j}`)
        canvas.appendChild(element)
    
    }
}

}) 

//handling tollbar events

let brush = document.getElementById("brush")
let fill = document.getElementById("fill")
let clear = document.getElementById("clear")
let shaped = document.getElementById("shaped")
let save = document.getElementById("save")

function resetButtons() {
    
    brush.classList.remove("toolbar-icons-selected");
    fill.classList.remove("toolbar-icons-selected");
    clear.classList.remove("toolbar-icons-selected");
    shaped.classList.remove("toolbar-icons-selected");
    save.classList.remove("toolbar-icons-selected");
  
    
    brush.classList.add("toolbar-icons");
    fill.classList.add("toolbar-icons");
    clear.classList.add("toolbar-icons");
    shaped.classList.add("toolbar-icons");
    save.classList.add("toolbar-icons");
}

document.addEventListener('keyup',(event)=>{
    let key_pressed = event.key
    if(key_pressed == "b" || key_pressed == 1){
        if(brush.classList.contains('toolbar-icons-selected') ||
           fill.classList.contains('toolbar-icons-selected')||
           clear.classList.contains('toolbar-icons-selected')||
           shaped.classList.contains('toolbar-icons-selected')||
           save.classList.contains('toolbar-icons-selected')
        
        ){
            resetButtons()
            
        }
        brush.classList.add("toolbar-icons-selected");
        return
    }

    if(key_pressed == "f" || key_pressed == 2){
        if(brush.classList.contains('toolbar-icons-selected') ||
        fill.classList.contains('toolbar-icons-selected')||
        clear.classList.contains('toolbar-icons-selected')||
        shaped.classList.contains('toolbar-icons-selected')||
        save.classList.contains('toolbar-icons-selected')
    
    ){
            resetButtons()
            
        } 
        fill.classList.add("toolbar-icons-selected");
       
    }

    if(key_pressed == "e" || key_pressed == 3){
        if(brush.classList.contains('toolbar-icons-selected') ||
        fill.classList.contains('toolbar-icons-selected')||
        clear.classList.contains('toolbar-icons-selected')||
        shaped.classList.contains('toolbar-icons-selected')||
        save.classList.contains('toolbar-icons-selected')
    
    ){
            resetButtons()
           
        }
        clear.classList.add("toolbar-icons-selected");
        return
    }

    if(key_pressed == "s" || key_pressed == 4){
        if(brush.classList.contains('toolbar-icons-selected') ||
        fill.classList.contains('toolbar-icons-selected')||
        clear.classList.contains('toolbar-icons-selected')||
        shaped.classList.contains('toolbar-icons-selected')||
        save.classList.contains('toolbar-icons-selected')
    
    ){
            resetButtons()
            
        }
        shaped.classList.add("toolbar-icons-selected");
        return
    }



})

brush.addEventListener("click", () => {
    resetButtons();
    brush.classList.add("toolbar-icons-selected");
  });


  
  fill.addEventListener("click", () => {
    resetButtons();
    fill.classList.add("toolbar-icons-selected");
  });
  
  clear.addEventListener("click", () => {
    resetButtons();
    clear.classList.add("toolbar-icons-selected");
  });
  
  shaped.addEventListener("click", () => {
    resetButtons();
    shaped.classList.add("toolbar-icons-selected");
  });
  
  save.addEventListener("click", () => {
    resetButtons();
    save.classList.add("toolbar-icons-selected");
  });



  //canvas

