//---------------------------------------------------------------------------- GLOBALS

let canvas = document.getElementById("c");
let ctx = canvas.getContext("2d");
let triangles = [];
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
	for (let i=0; i<triangles.length; i++) {
		let t = triangles[i];
		t.x += t.speed;
		t.y += t.speed;
	}
}

function CheckAndKill() {
	for (let i=0; i<triangles.length; i++) {

		// Remove dead triangles from array
		if (triangles[i].x > canvas.width+100) {
			triangles.splice(i, 1); 
		} else if (triangles[i].y > canvas.height+100) {
			triangles.splice(i, 1);
		}
		
	}
}

function Spawn() {
	let size = (Math.ceil(Math.random() * 2) * 100)
	let speedRan = (Math.ceil(Math.random() * 2) * moveSpeed)
	let xPos = RN((-canvas.width+300), canvas.width);
	let yPos = RN((-canvas.height+300), -300);
	triangles.push({x: xPos, y: yPos, w: size, h: size, speed: speedRan});
}

function Draw() {
	for (let i=0; i<triangles.length; i++) {
		if (triangles[i].x > -300 || triangles[i].y > -300) {
			ctx.drawImage(image, triangles[i].x, triangles[i].y, triangles[i].w, triangles[i].h);
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
	if (triangles.length < amount) {
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
		if (triangles.length < amount) {
			Spawn();
		}
		Draw();
	}
	
	requestAnimationFrame(loop);

}

main();
