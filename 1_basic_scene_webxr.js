<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Basic Scene with WebXR</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=no"
    />
    <link type="text/css" rel="stylesheet" href="style.css" />
    <script
      src="https://unpkg.com/three@0.133.0/build/three.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <script type="module">
      // To start an AR scene with webXR, we can use a handy button provided by three.js
      // We first have to import it because it is a javascript module
      import { ARButton } from "https://unpkg.com/three@0.133.0/examples/jsm/webxr/ARButton.js";

      let camera, scene, renderer;
      let mesh;

      init();
      animate();

      function init() {
        const container = document.createElement("div");
        document.body.appendChild(container);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
          70,
          window.innerWidth / window.innerHeight,
          0.01,
          40
        );

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        // This next line is important to to enable the renderer for WebXR
        renderer.xr.enabled = true; // New!
        container.appendChild(renderer.domElement);

        var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        light.position.set(0.5, 1, 0.25);
        scene.add(light);

        const geometry = new THREE.IcosahedronGeometry(0.1, 1);
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color("rgb(226,35,213)"),
          shininess: 6,
          flatShading: true,
          transparent: 1,
          opacity: 0.8,
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, -0.5);
        scene.add(mesh);

        // Add the AR button to the body of the DOM
        document.body.appendChild(ARButton.createButton(renderer));

        window.addEventListener("resize", onWindowResize, false);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        renderer.setAnimationLoop(render);
      }

      function render() {
        renderer.render(scene, camera);
      }
    </script>
  </body>
</html>      renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        renderer.setAnimationLoop(render);
      }

      function render() {
        renderer.render(scene, camera);
      }
    </script>
  </body>
</html>
