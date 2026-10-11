import { useEffect, useRef, useState, type ReactNode } from "react";

export function HeroScene({
  paused,
  fallback,
}: {
  paused: boolean;
  fallback: ReactNode;
}) {
  const host = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const [ready, setReady] = useState(false);
  const redraw = useRef(() => {});
  useEffect(() => {
    redraw.current();
  }, [paused]);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    void (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } =
        await import("three/addons/environments/RoomEnvironment.js");
      const { RoundedBoxGeometry } =
        await import("three/addons/geometries/RoundedBoxGeometry.js");
      if (cancelled || !host.current) return;
      const container = host.current;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      renderer.domElement.setAttribute("aria-hidden", "true");
      container.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
      camera.position.set(0, 0, 8.6);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environment = pmrem.fromScene(room, 0.04);
      scene.environment = environment.texture;
      room.dispose();
      pmrem.dispose();
      scene.add(new THREE.HemisphereLight(0xbbe5ff, 0x081322, 2));
      const key = new THREE.DirectionalLight(0xd7edff, 4);
      key.position.set(-3, 4, 5);
      scene.add(key);
      const edge = new THREE.DirectionalLight(0x0066ff, 6);
      edge.position.set(3, -1, 2);
      scene.add(edge);
      const group = new THREE.Group();
      scene.add(group);
      const blue = new THREE.MeshPhysicalMaterial({
        color: 0x0064ef,
        metalness: 0.72,
        roughness: 0.19,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
      });
      const silver = new THREE.MeshPhysicalMaterial({
        color: 0xd5e5ef,
        metalness: 0.92,
        roughness: 0.2,
        clearcoat: 1,
      });
      const core = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.02, 0.3, 180, 28, 2, 3),
        blue,
      );
      core.rotation.set(0.35, -0.35, 0.1);
      group.add(core);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.88, 0.045, 12, 128),
        silver,
      );
      ring.rotation.set(0.9, 0.45, -0.3);
      group.add(ring);
      const thinRing = new THREE.Mesh(
        new THREE.TorusGeometry(2.17, 0.009, 8, 128),
        new THREE.MeshBasicMaterial({
          color: 0x319aff,
          transparent: true,
          opacity: 0.5,
        }),
      );
      thinRing.rotation.set(-0.7, 0.7, 0.5);
      group.add(thinRing);
      const satellites: InstanceType<typeof THREE.Mesh>[] = [];
      const cubeGeometry = new RoundedBoxGeometry(0.42, 0.42, 0.42, 3, 0.065);
      for (let i = 0; i < 5; i++) {
        const cube = new THREE.Mesh(cubeGeometry, i % 2 ? blue : silver);
        cube.rotation.set(i * 0.4, 0.5, 0.3);
        satellites.push(cube);
        group.add(cube);
      }
      const positions = new Float32Array(60 * 3);
      for (let i = 0; i < 60; i++) {
        const angle = i * 2.399;
        const radius = 2.3 + (i % 7) * 0.09;
        positions.set(
          [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            -0.8 - (i % 5) * 0.3,
          ],
          i * 3,
        );
      }
      const particles = new THREE.BufferGeometry();
      particles.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      scene.add(
        new THREE.Points(
          particles,
          new THREE.PointsMaterial({
            color: 0x89c9ff,
            size: 0.018,
            transparent: true,
            opacity: 0.7,
          }),
        ),
      );
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      let visible = true,
        frame = 0,
        previous = 0,
        elapsed = 0;
      const pointer = { x: 0, y: 0 };
      const move = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.35;
        pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.25;
      };
      const leave = () => {
        pointer.x = 0;
        pointer.y = 0;
      };
      const render = (now: number) => {
        frame = 0;
        if (now - previous < 1000 / 30) {
          frame = requestAnimationFrame(render);
          return;
        }
        const delta = Math.min((now - previous) / 1000 || 0, 0.05);
        previous = now;
        if (!pausedRef.current && !reduced.matches) {
          elapsed += delta;
          core.rotation.y += delta * 0.14;
          core.rotation.z += delta * 0.045;
          group.rotation.y += (pointer.x - group.rotation.y) * 0.04;
          group.rotation.x += (pointer.y - group.rotation.x) * 0.04;
        }
        group.position.y = Math.sin(elapsed * 0.65) * 0.09;
        satellites.forEach((cube, i) => {
          const angle = (i / 5) * Math.PI * 2 + elapsed * 0.09;
          cube.position.set(
            Math.cos(angle) * 2.05,
            Math.sin(angle) * 1.7,
            Math.sin(angle + 0.8) * 0.55,
          );
          cube.rotation.y = i * 0.6 + elapsed * 0.14;
        });
        renderer.render(scene, camera);
        if (
          visible &&
          !document.hidden &&
          !pausedRef.current &&
          !reduced.matches
        )
          frame = requestAnimationFrame(render);
      };
      const start = () => {
        if (!frame && visible && !document.hidden) {
          previous = performance.now();
          frame = requestAnimationFrame(render);
        }
      };
      redraw.current = start;
      reduced.addEventListener("change", start);
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else cancelAnimationFrame(frame);
        if (!visible) frame = 0;
      });
      observer.observe(container);
      const resize = new ResizeObserver(() => {
        const { width, height } = container.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        start();
      });
      resize.observe(container);
      container.addEventListener("pointermove", move, { passive: true });
      container.addEventListener("pointerleave", leave);
      document.addEventListener("visibilitychange", start);
      start();
      setReady(true);
      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        resize.disconnect();
        container.removeEventListener("pointermove", move);
        container.removeEventListener("pointerleave", leave);
        document.removeEventListener("visibilitychange", start);
        reduced.removeEventListener("change", start);
        redraw.current = () => {};
        const geometries = new Set<InstanceType<typeof THREE.BufferGeometry>>();
        const materials = new Set<InstanceType<typeof THREE.Material>>();
        scene.traverse((object) => {
          const mesh = object as InstanceType<typeof THREE.Mesh>;
          if (mesh.geometry) geometries.add(mesh.geometry);
          if (mesh.material)
            (Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material]
            ).forEach((m) => materials.add(m));
        });
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        environment.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => {
      /* The existing artwork remains available if WebGL cannot load. */
    });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div className={`render-scene${ready ? " is-rendered" : ""}`}>
      <div className="render-fallback">{fallback}</div>
      <div
        className="render-canvas"
        ref={host}
        role="img"
        aria-label="Rotating cobalt metal sculpture with silver orbital rings and floating rounded cubes"
      />
      <span className="render-label" aria-hidden="true">
        IDEAS IN MOTION <i /> 2026
      </span>
    </div>
  );
}
