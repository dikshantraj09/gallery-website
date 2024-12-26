import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import {
  SpotLight,
  Text,
  ScrollControls,
  Scroll,
  Html,
} from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { TextureLoader, Vector3 } from "three";
import ReactHowler from "react-howler";
const ART_PIECES = [
  { title: "One Where it All Began", imgPath: "/Image00001.jpg" },
  { title: "One Where It started Brewing", imgPath: "/Image00002.jpg" },
  { title: "One Where I Fell", imgPath: "/Image00003.jpg" },
  { title: "In Love with this Smile", imgPath: "/Image00004.jpg" },
  { title: "One where nothing else mattered", imgPath: "/Image00005.jpg" },
  { title: "Pandey → Panda Conversion", imgPath: "/Image00006.jpg" },
  { title: "The Love of My Life ❤️", imgPath: "/Image00007.jpg" },
  { title: "Sautan Ji In the House", imgPath: "/Image00008.jpg" },
  { title: "Most Precious Bond", imgPath: "/Image00009.jpg" },
  { title: "Smiles that Matter Most", imgPath: "/Image00010.jpg" },
  { title: "One whith US", imgPath: "/Image00011.jpg" },
];

const WallArt = (props) => {
  const { art, i } = props;
  const { width: w } = useThree((state) => state.viewport);
  const gap = 4;
  const imageWidth = 3.5;
  const texture = useLoader(TextureLoader, art.imgPath);
  return (
    <>
      <group>
        <SpotLight
          position={[(i + 1) * (imageWidth + gap) + (i + 1) - w / 4, 2.5, 3]}
          penumbra={1}
          angle={0.9}
          attenuation={1.0}
          anglePower={10}
          intensity={80}
          distance={8}
          castShadow
          color={0xffffff}
        />
        <mesh
          castShadow
          position={[(i + 1) * (imageWidth + gap) + (i + 1), 0, 0]}
        >
          <boxGeometry attach="geometry" args={[4, 5, 0.1]} />
          <meshStandardMaterial
            attach="material"
            map={texture}
            roughness={0.1}
            metalness={0.05}
          />
        </mesh>

        <mesh position={[(i + 1) * (imageWidth + gap) + (i + 1), -2.5, 0.5]}>
          <planeGeometry args={[2.25, 0.5]} />
          <meshStandardMaterial color={0xffffff} />
          <Text
            position-z={0}
            scale={[0.2, 0.2, 0.4]}
            color="black"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
          >
            {art.title}
          </Text>
        </mesh>
      </group>
    </>
  );
};

const Scene = () => {
  const { width: screenWidth } = useThree((state) => state.viewport);
  console.log("screenWidth", screenWidth);
  const textScale = screenWidth < 5.5 ? 0.2 : 0.4;

  return (
    <Suspense
      fallback={
        <Html
          style={{ fontSize: "6vw", whiteSpace: "nowrap", color: "white" }}
          center
        ></Html>
      }
    >
      <ScrollControls
        // infinite
        horizontal
        damping={1}
        pages={39 * Math.exp(-0.11 * screenWidth)}
        distance={0.8}
        touchScroll={true}
      >
        <Scroll className="scroll-container">
          <Text
            position-z={4}
            anchorX="center"
            anchorY="bottom"
            scale={[textScale, textScale, textScale]}
            color="#94A6FF"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
            castShadow
          >
            Welcome to Shades of Ananya
          </Text>
          <Text
            position-z={1}
            anchorX="center"
            anchorY="top"
            scale={[textScale, textScale, textScale]}
            color="#FBA90A"
            // font="https://fonts.gstatic.com/s/cookie/v8/syky-y18lb0tSbf9kgqU.woff"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
            castShadow
          >
            Step into a world filled with smiles & love{" "}
          </Text>
          <Text
            position={[0, -0.5, 2.5]}
            scale={[textScale, textScale, textScale]}
            anchorX="center"
            anchorY="top"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
            // castShadow
          >
            Slide Right to Explore →
          </Text>

          {ART_PIECES.map((art, i) => {
            return <WallArt key={i} i={i} art={art} />;
          })}
          {/* <Html
    position={[(ART_PIECES.length + 1) * 18, -2, 2]} // Place after the last wall art
    center
  >
    <button
      style={{
        padding: "10px 20px",
        fontSize: "46px",
        backgroundColor: "#FFFFFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={() => alert("Button Clicked!")}
    >
      Explore More
    </button>
  </Html> */}
        </Scroll>
      </ScrollControls>
    </Suspense>
  );
};

const Rig = () => {
  const { camera, mouse } = useThree();
  const vec = new Vector3();
  return useFrame(() =>
    camera.position.lerp(
      vec.set(mouse.x * 0.5, mouse.y * 0.5, camera.position.z),
      0.2
    )
  );
};

const GalleryApp = () => {
  const [playMusic, setPlayMusic] = useState(false);

  useEffect(() => {
    // Delay the playback by 3 seconds (or any desired duration)
    const delay = setTimeout(() => {
      setPlayMusic(true);
    }, 8000); // 3000ms = 3 seconds

    return () => clearTimeout(delay); // Cleanup timeout
  }, []);

  return (
    <>
      <ReactHowler
        src="/Subhanallah.mp3"
        playing={playMusic}
        loop
        volume={0.5}
      />
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }}>
        <ambientLight intensity={1.8} color={0xffffff} />

        {/* This is the wall that supports shadows */}
        <mesh position={[0, 0, -0.1]} receiveShadow>
          <planeGeometry args={[20, 15]} />
          <meshStandardMaterial
            attach="material"
            map={useLoader(TextureLoader, "/wall.jpg")}
            roughness={0.4}
          />
        </mesh>
        <Scene />

        <EffectComposer>
          {/* <Noise opacity={0.01} /> */}
          <Vignette eskil={false} offset={0.1} darkness={0.5} />
        </EffectComposer>

        <Rig />
      </Canvas>
    </>
  );
};

export default GalleryApp;
