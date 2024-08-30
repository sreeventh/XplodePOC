import React, { useState } from "react";
import styles from "./FuturisticToolbar.module.css";
import {
  FaMousePointer,
  FaBinoculars,
  FaInfo,
  FaCog,
  FaRedo,
  FaBlackTie,
  FaChevronDown
} from "react-icons/fa";

const ToolbarButton = ({ icon, tooltip, onClick }) => (
  <button className={styles.toolbarButton} onClick={onClick}>
    {icon}
    <span className={styles.tooltip}>{tooltip}</span>
  </button>
);

const FuturisticToolbar = (props) => {
  const [showBackgrounds, setShowBackgrounds] = useState(false);
  
  const toggleBackgrounds = () => {
    setShowBackgrounds(!showBackgrounds);
  };

  // List of available HDRI files
  const hdriFiles = [
    { name: "Sunset", path: "default" },
    { name: "CyberPunk", path: "src/assets/cyberpunk-urban-scenery.hdr" },
    { name: "Warehouse 4K", path: "src/assets/warehouse.hdr" },
    { name: "Workshop", path: "./workshop.hdr" },
    { name: "Office", path: "src/assets/office.hdr" },
    { name: "Roof Top", path: "src/assets/roof.hdr" },
    { name: "Aurora", path: "src/assets/aurora.hdr" },
    { name: "Garage", path: "src/assets/garage.hdr" },
    { name: "Underground", path: "src/assets/underground.hdr" },
    { name: "Car Interior", path: "src/assets/car.hdr" },
    { name: "Clean Warehouse", path: "src/assets/clean.hdr" },
    { name: "Artroom", path: "src/assets/art.hdr" },
  ];

  return (
    <div className={styles.toolbarContainer}>
      <ToolbarButton icon={<FaMousePointer />} tooltip="Cursor" onClick={props.cursorOption} />
      <ToolbarButton icon={<FaBinoculars />} tooltip="Transparent" onClick={props.TransparentOption} />
      <ToolbarButton icon={<FaInfo />} tooltip="View Info" onClick={props.InfOption} />
      <ToolbarButton icon={<FaCog />} tooltip="Settings" onClick={props.SettingsOption} />
      <ToolbarButton icon={<FaRedo />} tooltip="Reset Model" onClick={props.ResetOption} />
      <div className={styles.backgroundSelector}>
        <ToolbarButton 
          icon={<>
            <FaBlackTie />
          </>} 
          tooltip="Change Background" 
          onClick={toggleBackgrounds}
        />
        {showBackgrounds && (
          <ul className={styles.backgroundList}>
            {hdriFiles.map((hdri, index) => (
              <li key={index} onClick={() => {
                props.BgOption(hdri.path);
                setShowBackgrounds(false);
              }}>
                {hdri.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FuturisticToolbar;