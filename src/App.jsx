import { useState, Suspense, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Machineplode from "../public/MachinePlode";
import Garage_model from "../public/Garage";
import FuturisticToolbar from "./Toolbar";

function App() {
  const [exploded, setExploded] = useState(false);
  const [cursorType, setCursorType] = useState("default");
  const [hdriPath, setHdriPath] = useState("default");

  const toggleExplode = () => {
    setExploded(!exploded);
  };

  const cursorSelected = () => {
    setCursorType("default");
  };

  const TransparentSelected = () => {
    setCursorType("crosshair");
  };

  const changeBackground = (newHdriPath) => {
    setHdriPath(newHdriPath);
  };

  const ResetOption = () => {console.log("Model to be Reset to org posn")};
  useEffect(() => {
    localStorage.setItem("cursor", cursorType);
  }, [cursorType]);

  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          cursor: cursorType,
        }}
        camera={{ position: [0, 2, 5], fov: 100 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Machineplode
            position={[0, 20, 0]}
            scale={0.2}
            toggleExplode={toggleExplode}
          />
        </Suspense>
        {hdriPath === "default" ? (
          <Environment preset="sunset" background />
        ) : (
          <Environment files={hdriPath} background blur={0.5} />
        )}
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "black",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Click on the Machine to{" "}
        {cursorType === "default" ? "Explode" : "Make Parts Transparent"}
      </div>
      <FuturisticToolbar
        cursorOption={cursorSelected}
        TransparentOption={TransparentSelected}
        BgOption={changeBackground}
        ResetOption={ResetOption}
      />
    </>
  );
}

export default App;
