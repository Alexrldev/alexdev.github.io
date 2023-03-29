var canvas = null, ctx = null;
//var x=0, y=50;
var player = null, food = null;
var lastPress= null;
const KEY_LEFT = 'ArrowLeft', KEY_UP = 'ArrowUp', KEY_RIGHT = 'ArrowRight', KEY_DOWN = 'ArrowDown', KEY_ENTER='Enter'; 
var dir=1;
var score=0;
var pause=false;
const RANCHO=10, RALTO=10, VEL=10;
var numObstaculos=8;
var obstaculos = new Array();
var gameover=false;
var max=0;

var vCuerpo= new Image();

var vCabeza= new Image();
var vCabezau=new Image();
var vCabezar=new Image();
var vCabezal=new Image();
var vCabezad=new Image();

var vColau= new Image();
var vColar= new Image();
var vColal= new Image();
var vColad= new Image();

var fruta= new Image();

var cuerpo=new Array();


document.addEventListener('keydown', function (evt) {
	lastPress=evt.code;
},false);

//compatibilidad con navegadores
window.requestAnimationFrame = (function () { 
	return window.requestAnimationFrame || 
	window.mozRequestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	function (callback) { 
		window.setTimeout(callback, 17); 
	}; 
}()); 

function random(max,min)
{
	min = (min) ? min: 0;
	return Math.floor(Math.random()*(max-min)+min);
}
function repaint()
{
	window.requestAnimationFrame(repaint);
	paint(ctx);
}
function paint(ctx) 
{

	ctx.fillStyle = "#000";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	//rellenamos con el color verde(#0f0)
	// y todo lo que se vaya a dibujar se rellena con ese color, a menos que le cambiemos
	ctx.fillStyle = '#0f0';
	//dibujamos un rectangulo que empieza en el punto 0,0 con 100 de ancho y 60 de alto
	
	//player.fill(ctx);
	for (var i = 0; i < cuerpo.length; i++) 
	{
		if(cuerpo.length==1)
		{
			switch (dir) {
				case 0:
					vCabeza.src='assets/cab.png';
					break;
				case 1:
					vCabeza.src= 'assets/cabder.png';
				break;
				case 2:
					vCabeza.src= 'assets/cabdown.png';
					break;
				case 3:
					vCabeza.src= 'assets/cabeza2.png';
					break;
			}
			ctx.drawImage(vCabeza, cuerpo[i].x, cuerpo[i].y);
		}
		else
		{
			if(i==0)
			{
				switch (dir) {
				case 0:
					ctx.drawImage(vCabezau, cuerpo[i].x, cuerpo[i].y);
					break;
				case 1:
					ctx.drawImage(vCabezar, cuerpo[i].x, cuerpo[i].y);			
				break;
				case 2:
					ctx.drawImage(vCabezad, cuerpo[i].x, cuerpo[i].y);
					break;
				case 3:
					ctx.drawImage(vCabezal, cuerpo[i].x, cuerpo[i].y);
					break;
				}
				
			}
			if (i>0&&i<cuerpo.length-1) 
			{
				ctx.drawImage(vCuerpo, cuerpo[i].x, cuerpo[i].y);
			}

			if(i==cuerpo.length-1)
			{
				if(cuerpo[i].dir!=cuerpo[i-1].dir)
					cuerpo[i].dir=cuerpo[i-1].dir;
				
				switch (cuerpo[i].dir) {
				case 0:
					ctx.drawImage(vColau, cuerpo[i].x, cuerpo[i].y);
					break;
				case 1:
					ctx.drawImage(vColar, cuerpo[i].x, cuerpo[i].y);
				break;
				case 2:
					ctx.drawImage(vColad, cuerpo[i].x, cuerpo[i].y);
					break;
				case 3:
					ctx.drawImage(vColal, cuerpo[i].x, cuerpo[i].y);
					break;	
				}
			}
			
			//ctx.drawImage(vCuerpo, cuerpo[i].x, cuerpo[i].y);
		}			
		
	}
	//dibujamos la comida
	ctx.fillStyle= "#f00";
	ctx.drawImage(fruta, food.x,food.y);
	//dibujamos los obstaculos
	ctx.fillStyle= "#999";
	for(var i = 0; i< obstaculos.length;i++)
	{
		obstaculos[i].fill(ctx);
	}
	ctx.textAlign = 'left'; 
	ctx.fillStyle = "#0f0"
	ctx.fillText('Puntillos: ' + score, 0, 20);
	let centerWidth=canvas.clientWidth/2;
	let centerHeight=canvas.clientHeight/2;
	// pause o gameover 
	if (pause) 
	{ 
		ctx.textAlign = 'center';
		ctx.fillStyle ="#fff"
		if (gameover) 
		{
			ctx.fillText("GAME OVER",centerWidth,centerHeight);
			if(score>max)
			{
				max=score;
			}
			ctx.fillText("PUNTUACIÓN: "+score,centerWidth,centerHeight+30);
			ctx.fillText("PUNTUACIÓN MAXIMA: "+max,centerWidth,centerHeight+45);
		}
		else
			ctx.fillText('PAUSA', centerWidth, centerHeight); 
		//por default el textAlign está en left	
	} 
}

function verChocar(objeto1,objeto2)
{
	var entro=false;
	while(objeto1.intersects(objeto2))
	{
		objeto1.x=random(canvas.width/RANCHO)*10;
		objeto1.y=random(canvas.height/RALTO,1)*10;
		entro=true;
	}
	return entro;
}

function init() 
{ 
	//obtener contexto pal' canvas, en este caso 2d
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.font="16px bold sans-serif";
	//con el ctx, dibujamos y coloreamos todo lo que vaya a ir en el canvas; nuestro pincel, dijeran 

	//crear cuadros 
	cuerpo.push( new Rectangle (0,0,RANCHO,RALTO,dir));
	food = new Rectangle (random(canvas.width/RANCHO)*10,random(canvas.height/RALTO)*10,RANCHO,RALTO);

	//crear obstaculos
	for (var i = 0; i<numObstaculos; i++)
	{
		obstaculos.push(new Rectangle(random(canvas.width/RANCHO)*10, random(canvas.height/RALTO,1)*10, RANCHO,RALTO));
		//verificamos que no esten en la misma posicion
		for (var j = 0; j < i; j++) 
		{	
			if(verChocar(obstaculos[i],obstaculos[j]))
			{
				j=0;
			}
		}
		while(food.intersects(obstaculos[i])) 
		{
			food.x=random(canvas.width/10)*10;
			food.y=random(canvas.height/10)*10;
		}
	}
	vCuerpo.src='assets/cuerpo.png';
	vCabezau.src='assets/cab2.png';
	vCabezar.src= 'assets/cabder2.png';
	vCabezad.src= 'assets/cabdown2.png';
	vCabezal.src= 'assets/cabeza22.png';

	vColau.src='assets/cola.png';
	vColar.src= 'assets/colader.png';
	vColad.src= 'assets/coladown.png';
	vColal.src= 'assets/colaleft.png';

	fruta.src='assets/manzana.png';

	//iniciar
	run();
	repaint();
} 

function run()
{
	setTimeout(run,50);
	act();
}

function reset()
{
	score=0;
	dir=1;
	cuerpo.length=0;
	cuerpo.push(new Rectangle(0,0,RANCHO, RALTO,dir));
	for(var i=0; i<obstaculos.length;i++)
	{
		obstaculos[i].x=random(canvas.width/RANCHO)*10;
		obstaculos[i].y=random(canvas.height/RALTO,1)*10;
		for(var j = 0; j < i; j++)
		{
			if(verChocar(obstaculos[i],obstaculos[j]))
			{
				j=0;
			}
		}
		do
		{
			food.x=random(canvas.width/RANCHO)*10;
			food.y=random(canvas.height/RALTO)*10;
		}while(food.intersects(obstaculos[i]));
	}
	gameover=false;
}

function act()
{
	if (!pause) 
	{
		if(gameover)
		{
			reset();
		} 
		for (var i = cuerpo.length-1; i > 0; i--) 
		{
			cuerpo[i].x=cuerpo[i-1].x;
			cuerpo[i].y=cuerpo[i-1].y;
			cuerpo[i].dir=cuerpo[i-1].dir;
		}
	// Change Direction 
		if (lastPress == KEY_UP && (dir!=2 || cuerpo.length==1)) 
		{ 
			dir = 0; 
		} 
		if (lastPress == KEY_RIGHT && (dir!=3 || cuerpo.length==1)) 
		{ 
			dir = 1; 
		} 
		if (lastPress == KEY_DOWN && (dir!=0 || cuerpo.length==1)) 
		{ 
			dir = 2; 
		} 
		if (lastPress == KEY_LEFT && (dir!=1 || cuerpo.length==1)) 
		{ 
			dir = 3; 
		} 
		// Move Rect 
		if (dir == 0) 
		{ 
			cuerpo[0].y -= VEL; 
		} 
		if (dir == 1) 
		{ 
			cuerpo[0].x += VEL; 
		} 
		if (dir == 2) 
		{ 
			cuerpo[0].y +=VEL; 
		} 
		if (dir == 3) 
		{ 
			cuerpo[0].x -= VEL; 
		} 
		cuerpo[0].dir=dir;
		// Out Screen 
		if (cuerpo[0].x > canvas.width-RANCHO)
		{	
			cuerpo[0].x = 0; 
		} 
		if (cuerpo[0].y > canvas.height-RALTO)
		{ 
			cuerpo[0].y = 0; 
		} 
		if (cuerpo[0].x < 0) 
		{ 
			cuerpo[0].x = canvas.width-RANCHO;
		} 
		if (cuerpo[0].y < 0) 
		{ 
			cuerpo[0].y = canvas.height-RALTO;
		} 
		for (var i = 1; i < cuerpo.length; i++) 
		{
			if (cuerpo[0].intersects(cuerpo[i])) 
			{
				gameover=true;
				pause=true;
			}
		}
		if (cuerpo[0].intersects(food)) 
		{ 
			score += 1; 
			cuerpo.push(new Rectangle(food.x,food.y,RANCHO,RALTO,dir));
			food.x = random(canvas.width/RANCHO)*10;	
			food.y = random(canvas.height/RALTO)*10; 
			var k=0;
			for(var i=0; i<cuerpo.length;i++)
			{
				while(k < obstaculos.length)
				{
					while(food.intersects(obstaculos[k]))
					{
						food.x = random(canvas.width/RANCHO)*10;	
						food.y = random(canvas.height/RALTO)*10; 
						k=-1;
					}
					k++;
				} 	
				while(food.intersects(cuerpo[i]))
				{
					food.x = random(canvas.width/RANCHO)*10;	
					food.y = random(canvas.height/RALTO)*10;
					i=-1;
					k=0;
					console.log(i); 
				}
			}		
			console.log(food.x+ ","+food.y);
		}
		obstaculos.forEach( function(element) {
			
			if(cuerpo[0].intersects(element))
			{
				gameover=true;
				pause=true;
			}
		});		
	} 

	// Pause/Unpause 
	if (lastPress == KEY_ENTER) 
	{ 
		pause = !pause; 
		lastPress = null; 
	} 
}

function Rectangle(x, y, width, height,dir)
{ 
	this.dir=dir;
	this.x = (x == null) ? 0 : x; 
	this.y = (y == null) ? 0 : y; 
	this.width = (width == null) ? 0 : width; 
	this.height = (height == null) ? this.width : height; 
	this.intersects = function (rect) { 
		if (rect == null) 
		{ 
			window.console.warn('Missing parameters on function intersects'); 
		} 
		else
		{ 
			return (this.x < rect.x + rect.width && this.x + this.width > rect.x && this.y < rect.y + rect.height && this.y + this.height > rect.y); 
		} 		
	}; //cuando le asignas a una variable una función, debe de terminar en punto y coma (;)
	this.fill = function (ctx) { 
		if (ctx == null) 
		{ 
			window.console.warn('Missing parameters on function fill'); 
		} 
		else 
		{ 
			ctx.fillRect(this.x, this.y, this.width, this.height); 
		} 
	};  //cuando le asignas a una variable una función, debe de terminar en punto y coma (;)
} 
window.addEventListener('load', init, false);

