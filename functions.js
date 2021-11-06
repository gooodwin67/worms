export let functions = {
    randomMinMaxFloat : (min, max) => {
        let rand = Math.random() * (max - min) + min
        rand = Math.round(rand * 1e2) / 1e2
        return rand;
    },
    onWindowResize: (camera, renderer) => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      
        renderer.setSize( window.innerWidth, window.innerHeight )
    }
}