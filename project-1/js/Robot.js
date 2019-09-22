export default class  {

	object = null
	material = null
	position = null
	top = null
	
	constructor() {
		this.object = new THREE.Object3D()
		this.object.position.set(0, 0, 0)
		this.material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true
		})
		//board
		this.createBoard(0, 5, 0)

		//wheels
		this.createWheel(-18, 2, -8)
		this.createWheel(-18, 2, 8)
		this.createWheel(18, 2, 8)
		this.createWheel(18, 2, -8)

		//lower_articulation
		this.createLowerArticulation(0,6,0)

	}

	createBoard(x, y, z){
		let geometry = new THREE.CubeGeometry(40, 2, 20)
		let mesh = new THREE.Mesh(geometry, this.material)
		mesh.position.set(x, y, z)
		this.object.add(mesh)
	}
	
	createWheel(x, y, z){
		let geometry = new THREE.SphereGeometry(2, 8, 8)
		let mesh = new THREE.Mesh(geometry, this.material)
		mesh.position.set(x, y, z)
		this.object.add(mesh)
	}

	createLowerArticulation(x, y, z){
		let geometry = new THREE.SphereGeometry(4, 8, 8, 0, Math.PI*2, 0, Math.PI/2)
		let mesh = new THREE.Mesh(geometry, this.material)
		mesh.position.set(x, y, z)
		this.object.add(mesh)
	}
	
}