let eleDom=[];
let inputs=[];
inputs.push(...document.getElementsByTagName("input"));
eleDom.push(...document.getElementsByClassName("main"));
eleDom.push(...document.getElementsByTagName("h1"));
eleDom.push(...document.getElementsByTagName("h2"));
eleDom.push(...document.getElementsByTagName("h3"));
eleDom.push(document.getElementById("separacion"));
eleDom.push(document.getElementById("terminos"));
eleDom.push(...document.getElementsByTagName("label"));
eleDom.push(...inputs);

function agregarClasesL()
{
    eleDom.forEach(elmento=>elmento.classList.add("light"));
    inputs.forEach(elemento=>elemento.classList.add("input_light"));
    document.getElementById("btn-moon").classList.add("bi-moon-fill-d");
}

function eliminarClasesL()
{
    eleDom.forEach(elmento=>elmento.classList.remove("light"));
    inputs.forEach(elemento=>elemento.classList.remove("input_light"));
    document.getElementById("btn-moon").classList.remove("bi-moon-fill-d");
}


//document.getElementById("boton").className

const boton=document.getElementById("ld");

boton.addEventListener("click",()=>
{
    if(boton.classList.contains("active"))
        agregarClasesL();        
    else
        eliminarClasesL();
    boton.classList.toggle("active");
});