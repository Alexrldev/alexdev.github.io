let ventana=window.innerWidth;
const menu=document.getElementById("menu-lista");
const cuadro1=document.querySelector(".cuadro-1");
const cuadro2=document.querySelector(".cuadro-2");
const cuadro3=document.querySelector(".cuadro-3");
const cuadro4=document.querySelector(".cuadro-4");
const listaResponsive=[...document.getElementsByClassName("element-menu")];
const contenedor=document.querySelector(".pdatos-lengua");
const eleSlider=document.querySelectorAll(".pdatos-lengua--desc");
const contenederLogos=document.querySelector(".logos");
const btnleft=document.querySelector(".left");
const btnright=document.querySelector(".right");
var click=0, clickAnt=0;
var ba=0;
    document.addEventListener("keydown", ev =>
    {
        if(ev.code==="KeyF"&&ba===0)
        {
            ba=1;
            console.log(ev.code);
        }
        else if(ev.code==="KeyA"&&ba===1)
        {
            ba=2;
            console.log(ev.code);
        }
        else if(ev.code==="KeyN"&&ba===2)
        {
            ba=3;
            console.log(ev.code);
        }
        else if(ev.code==="KeyY"&&ba===3)
        {
            ba=4;
            console.log(ev.code);
        }
        else if(ev.code==="Slash"&&ba===4)
        {
            ba=5;
            console.log(ev.code);
        }
        else if(ev.code==="KeyC"&&ba===5)
        {
            ba=6;
            console.log(ev.code);
        }
        else if(ev.code==="KeyH"&&ba===6)
        {
            ba=7;
            console.log(ev.code);
        }
        else if(ev.code==="KeyA"&&ba===7)
        {
            ba=8;
            console.log(ev.code);
        }
        else if(ev.code==="KeyN"&&ba===8)
        {
            ba=9;
            console.log(ev.code);
        }
        else
        {
            console.log(ev.code, ba);
            ba=0;
        }
        if(ba==9)
            alert("Gracias por ver mi página, Fany-chan! :)")
        /*else
            ba=0;*/
    });
    
    cuadro1.addEventListener("click", () =>
    {
        location.href="html/copy-coin/index.html";
    });    

    cuadro2.addEventListener("click",()=>
    {
        location.href="html/formulario/index.html"
    });
    cuadro3.addEventListener("click",()=>
    {
        location.href="html/culebrin/index.html"
    });
    cuadro4.addEventListener("click",()=>
    {
        location.href="html/top-man/index.html"
    });
slider();
window.addEventListener("resize",()=>
{
    slider();
    moverElem(moveSlider(click));   
});
function clickOnLeft()
{
    console.log("dsds");
    let aux=0;
    switch(click)
    {
        case 0:
            aux=moveSlider(4);
            console.log(click);
            break;
        case 4:
            aux=moveSlider(3);
            console.log(click);
            break;
        case 3:
            aux=moveSlider(2);
            console.log(click);
            break;
        case 2:
            aux=moveSlider(1);
            console.log(click);
            break;
        case 1:
            aux=moveSlider(0);
            console.log(click);
            break;
    }
    moverElem(aux);
}

function clickOnRight()
{
    let aux=0;
    switch(click)
    {
        case 0:
            aux=moveSlider(1);
            console.log(click);
            break;
        case 1:
            aux=moveSlider(2);
            console.log(click);
            break;
        case 2:
            aux=moveSlider(3);
            console.log(click);
            break;
        case 3:
            aux=moveSlider(4);
            console.log(click);
            break;
        case 4:
            aux=moveSlider(0);
            console.log(click);
            break;
    }
    moverElem(aux);
}

function desplegarMenu()
{
    menu.style.right="0vw";
    menu.style.transition="all 1s ease";
}

function cerrar()
{
    menu.style.right="100vw";
}

listaResponsive.forEach(element => 
{
    element.addEventListener("click",() => cerrar());    
});

function slider()
{
    let aux=0;
    for(let i=0;i<2;i++)
    {
        aux=aux+eleSlider[i].clientWidth;
    }
    let auxStr=aux.toString()+'px';
    contenedor.style.left=auxStr;
    menu.style.transition="none";
}

function moveSlider(numEle)
{
    let aux=0;
    for(let i=0;i<numEle;i++)
        aux=aux+eleSlider[i].clientWidth;
    click=numEle;
    return aux;
}

function moverElem(aux)
{
    let move=aux.toString()+'px';
    console.log(move);
    contenederLogos.style.right=move;
}
