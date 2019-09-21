export default class  {

	object = null
	material = null
	position = null
	top = null
	
	constructor() {
		this.object = new THREE.Object3D()
		
		//board
		this.create_board(0, 5, 0)

		//wheels
		this.create_wheel(-18, 2, -8)
		this.create_wheel(-18, 2, 8)
		this.create_wheel(18, 2, 8)
		this.create_wheel(18, 2, -8)

		//lower_articulation
		this.create_lower_articulation(0,6,0)

	}

	create_board(x, y, z){
		let material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true
		})
		let geometry = new THREE.CubeGeometry(40, 2, 20)
		let mesh = new THREE.Mesh(geometry, material)
		mesh.position.set(x, y, z)
		this.object.add(mesh)
	}
	
	create_wheel(x, y, z){
		let material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true
		})
		let geometry = new THREE.SphereGeometry(2, 8, 8)
		let mesh = new THREE.Mesh(geometry, material)
		mesh.position.set(x, y, z)
		this.object.add(mesh)
	}

	create_lower_articulation(x, y, z){
		let material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true
		})
		let geometry = new THREE.SphereGeometry(4, 8, 8, 0, Math.PI*2, 0, Math.PI/2)
		let mesh = new THREE.Mesh(geometry, material)
		mesh.position.set(x, y, z)
		this.object.add(mesh)
	}
	
}