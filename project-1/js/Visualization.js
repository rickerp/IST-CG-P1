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

		window.addEventListener("keydown", this.onKeyDown.bind(this));
		window.addEventListener("resize", this.onResize.bind(this));
	
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
		this.camera = new THREE.OrthographicCamera(
			window.innerWidth / -18,
			window.innerWidth / 18,
			window.innerHeight / 18,
			window.innerHeight / -18,
			-200,
			500);
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 50;
		this.camera.lookAt(this.scene.position);
	}

	onResize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.camera.left = - window.innerWidth / 18
		this.camera.right = window.innerWidth / 18
		this.camera.top = window.innerHeight / 18
		this.camera.bottom = - window.innerHeight / 18
		this.camera.updateProjectionMatrix();
	}

	onKeyDown(e) {
		switch (e.keyCode) {
			case 81: // q
				this.robot.rotateUpperArm(Math.PI / 16)
				break
			case 87: // w
				this.robot.rotateUpperArm(-Math.PI / 16)
				break
			case 65: // a
				this.robot.rotateArm(Math.PI / 16)
				break
			case 83: // s
				this.robot.rotateArm(-Math.PI / 16)
				break
			case 49: // 1 upper_camer
				this.setCameraPosition(0, 50, 0)
				break
			case 50: // 2 side_camera
				this.setCameraPosition(0, 0 ,50)
				break
			case 51: // 3 front_camera	
				this.setCameraPosition(50, 0, 0)
				break
			case 52: // 4 wireframe on/off
				this.toggleWireframe()
				break
		}
	}
	
	setCameraPosition(x, y, z){	
		this.camera.position.x = x
		this.camera.position.y = y
		this.camera.position.z = z
		this.camera.lookAt(this.scene.position)
	}

	toggleWireframe(){
		this.robot.material.wireframe = !this.robot.material.wireframe
		this.target.material.wireframe = !this.target.material.wireframe
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