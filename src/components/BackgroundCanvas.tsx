"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(220, 220, 160, 160);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uDark: { value: 0 }, // 0 = light, 1 = dark
      },
      vertexShader: `
        uniform float uTime;

        void main() {
          vec3 pos = position;
          pos.z +=
            sin(pos.x * 0.08 + uTime * 0.6) *
            cos(pos.y * 0.08 + uTime * 0.6) *
            8.0;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uDark;

        void main() {
          vec3 lightA = vec3(0.45, 0.55, 1.0);
          vec3 lightB = vec3(0.70, 0.45, 0.95);

		  vec3 darkA  = vec3(0.16, 0.18, 0.36);
          vec3 darkB  = vec3(0.26, 0.24, 0.50);


          vec3 colA = mix(lightA, darkA, uDark);
          vec3 colB = mix(lightB, darkB, uDark);

          float grad = gl_FragCoord.y / 1000.0;
          vec3 color = mix(colA, colB, grad);

          gl_FragColor = vec4(color, 0.18);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2.6;
    scene.add(mesh);

    let raf: number;
    const animate = () => {
      // time progression
      material.uniforms.uTime.value +=
        prefersReducedMotion || isMobile ? 0.005 : 0.02;

      // smooth dark/light interpolation
      material.uniforms.uDark.value +=
        ((document.documentElement.classList.contains("dark") ? 1 : 0) -
          material.uniforms.uDark.value) *
        0.05;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
