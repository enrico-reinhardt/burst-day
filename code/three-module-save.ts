<script type="module">
      // THREE + EFFECT
      import * as THREE from "three";
      import { CSS3DRenderer } from "CSS3DRenderer";
      
      // Vertex shader source code
      const vertexShaderSource = `
    varying vec3 vNormal;
    void main() {
        vNormal = normalMatrix * normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

      // Fragment shader source code
      const fragmentShaderSource = `
    varying vec3 vNormal;

    void main() {
        vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // Example light direction
        float intensity = dot(vNormal, lightDir);
        gl_FragColor = vec4(vec3(intensity), 1.0); // Example: Use intensity for color
    }
`;

      // Initialize Three.js scene
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for transparency
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Define uniforms for shaders
      const uniforms = {
        refractRatio: { value: 1.0 }, // Example: Refraction index ratio (air to glass)
      };

      // Create a transparent material for the bubble using ShaderMaterial
      const bubbleMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShaderSource,
        fragmentShader: fragmentShaderSource,
        transparent: true,
        side: THREE.DoubleSide, // Ensure the bubble is visible from inside and outside
      });

      // Create bubble geometry (e.g., SphereGeometry)
      const bubbleGeometry = new THREE.SphereGeometry(1, 32, 32);

      // Create bubble mesh
      const bubbleMesh = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      scene.add(bubbleMesh);

      // Example: Load HTML content using a CSS3DRenderer if needed
      const htmlContainer = document.getElementById("html-container");
      const cssRenderer = new CSS3DRenderer();
      cssRenderer.setSize(window.innerWidth, window.innerHeight);
      htmlContainer.appendChild(cssRenderer.domElement);

      // Render loop
      function animate() {
        requestAnimationFrame(animate);

        // Update uniforms or other animations here if needed

        renderer.render(scene, camera);
        cssRenderer.render(scene, camera);
      }
      animate();
    </script>