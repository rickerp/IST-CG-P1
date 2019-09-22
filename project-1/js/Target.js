export default class  {

	object = null
	material = null
	position = null
	top = null
	
	constructor() {
		this.object = new THREE.Object3D()
		this.object.position.set(30, 0, 0)
		this.material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true
		})

        this.createCylinder(0, 10, 0)
        this.createTorus(0, 23, 0)
	}

	createCylinder(x, y, z){
		let geometry = new THREE.CylinderGeometry( 3, 3, 20, 16, 16)
		let mesh = new THREE.Mesh(geometry, this.material)
		mesh.position.set(x, y, z)
		this.object.add(mesh)
	}
	
	createTorus(x, y, z){
		let geometry = new THREE.TorusGeometry( 2.25, 0.75, 16, 100 )
		let mesh = new THREE.Mesh(geometry, this.material)
		mesh.position.set(x, y, z)
		this.object.add(mesh)
	}
	
}