const cuadros=document.querySelectorAll(".proy-cuadros--cuadro");
cuadros.forEach((cuadro) => 
{
    cuadro.addEventListener("click", () =>
    {
        location.href="https://google.com";
    });    
});
