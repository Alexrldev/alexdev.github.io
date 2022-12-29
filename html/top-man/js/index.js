fetch("https://api.jikan.moe/v4/top/manga").then(res=>res.json())
.then(datos=>
    {
        console.log(datos);
        datos.data.forEach(element => 
            {
                const mangas=document.querySelector("main");
                mangas.insertAdjacentHTML("beforeend","<article><img src="+element.images.jpg.image_url+" alt='"+element.titles[0].title+
                "'/><h2>"+element.titles[0].title+"</h2><p>"+element.synopsis+"</p></article>");
            });
    })
.catch(error=>
    {
        alert("Error");
        console.error("Error",error)
    })
.finally(()=>
{
    document.getElementById("spinner").style.display="none";
});
