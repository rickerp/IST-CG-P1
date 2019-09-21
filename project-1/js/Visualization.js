import Robot from "./Robot.js"
import Target from "./Target.js"

export default class {

	renderer = null
	robot = null
	target = null
	scene = null

	constructor() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: false
		})
		
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
	
		
		this.createScene()
		this.createCamera()
		this.createRobot()
		this.createTarget()

		window.addEventListener("keydown", this.onKeyDown);
		window.addEventListener("resize", this.onResize);
	
		this.animate()
	}

	createRobot() {
		this.robot = new Robot()
		this.scene.add(this.robot.object)
	}

	createTarget() {
		this.target = new Target()
		this.scene.add(this.target.object)
	}

	createCamera() {
		this.camera = new THREE.PerspectiveCamera(70,
			window.innerWidth / window.innerHeight,
			1,
			1000);
		this.camera.position.x = 0;
		this.camera.position.y = 20;
		this.camera.position.z = 50;
		this.camera.lookAt(this.scene.position);
	}

	onResize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}

	onKeyDown(e) { //FIX this.scene -> undefined 
		switch (e.keyCode) {
			case 49: //1 upper_camera
				this.scene.traverse(function (node) {
					if (node instanceof THREE.PerspectiveCamera) {
						this.camera.position.x = 0;
						this.camera.position.y = 50;
						this.camera.position.z = 0;
					}
				});
				break;
			case 50: //2 side_camera
				this.scene.traverse(function (node) {
					if (node instanceof THREE.PerspectiveCamera) {
						this.camera.position.x = 0;
						this.camera.position.y = 50;
						this.camera.position.z = 20;
					}
				});
				break;
			case 51: //3 front_camera
				this.scene.traverse(function (node) {
					if (node instanceof THREE.PerspectiveCamera) {
						this.camera.position.x = 50;
						this.camera.position.y = 0;
						this.camera.position.z = 20;
					}
				});
				break;

			case 52: //4 wireframe on/off
        		this.scene.traverse(function (node) {
            		if (node instanceof THREE.Mesh) {
                		node.material.wireframe = !node.material.wireframe;
            		}
        		});
				break;
		}
	}
	

	createScene() {
		this.scene = new THREE.Scene()
		this.scene.add(
			new THREE.AxisHelper(10)
		)
	}

	render() {
		this.renderer.render(this.scene, this.camera)
	}

	animate() {
		this.render()
		requestAnimationFrame(() => this.animate())
	}
}