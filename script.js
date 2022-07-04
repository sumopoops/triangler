//---------------------------------------------------------------------------- GLOBALS

let canvas = document.getElementById("c");
let ctx = canvas.getContext("2d");
let things = [];
let amount = 130;
let image = new Image();
let moveSpeed = 1.2;
image.src = "angle.svg";
let firstRun = true;



//---------------------------------------------------------------------------- FUNCTIONS

function ClearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function Move() {
	for (let i=0; i<things.length; i++) {
		let t = things[i];
		t.x += t.speed;
		t.y += t.speed;
	}
}

function CheckAndKill() {
	for (let i=0; i<things.length; i++) {

		// Remove dead triangles from array
		if (things[i].x > canvas.width+100) {
			things.splice(i, 1); 
		} else if (things[i].y > canvas.height+100) {
			things.splice(i, 1);
		}
		
	}
}

function Spawn() {
	let size = (Math.ceil(Math.random() * 2) * 100)
	let speedRan = (Math.ceil(Math.random() * 2) * moveSpeed)
	let xPos = RN((-canvas.width+300), canvas.width);
	let yPos = RN((-canvas.height+300), -300);
	things.push({x: xPos, y: yPos, w: size, h: size, speed: speedRan});
}

function Draw() {
	for (let i=0; i<things.length; i++) {
		if (things[i].x > -300 || things[i].y > -300) {
			ctx.drawImage(image, things[i].x, things[i].y, things[i].w, things[i].h);
		}
	}
}

function RN(min, max) {
	return (Math.floor(Math.random() * (max-min)) + min);
}



//---------------------------------------------------------------------------- MAIN / LOOP

function loop() {

	ClearCanvas();
	Move();
	CheckAndKill();
	if (things.length < amount) {
		Spawn();
	}
	Draw();

	requestAnimationFrame(loop);
}

function main() {

	// Scale canvas to screen size
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Populate
	for (i=0; i<1000; i++) {
		Move();
		CheckAndKill();
		if (things.length < amount) {
			Spawn();
		}
		Draw();
	}
	
	requestAnimationFrame(loop);

}

main();
