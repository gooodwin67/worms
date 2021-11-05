export let init = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer: new THREE.WebGLRenderer(),
    stats: new Stats(),

    randomInteger: function (min, max) {
        let rand = Math.random() * (max - min) + min
        rand = Math.round(rand * 1e2) / 1e2
        return rand;
    },

    init: function () {
        document.getElementById('container').appendChild(this.renderer.domElement);
        document.getElementById('container').appendChild(this.stats.dom);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene.background = new THREE.Color(0xcccccc);
        this.scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
    },

    render: function () {
        this.init();
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
    }
}