import React, { useState } from "react";
import Left from "./components/Left";
import Right from "./components/Right";

const App = () => {
  const [config, setConfig] = useState({
    configName: "config-1",
    botName: "Greebo",
    fontFamily: "Space Grotesk, sans-serif",
    headerColor: "#E63A1E",
    headerFontColor: "#FFFFFF",
    backgroundColor: "#E8E1DB",
    chatFontColor: "#323130",
    avatarImage: "", 
    launcherImage: "", 
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfig((prev) => ({
          ...prev,
          [name]: event.target.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setConfig((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleLoadConfig = (loadedConfig) => {
    setConfig((prev) => ({
      ...prev,
      ...loadedConfig,
    }));
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      <Left 
        config={config} 
        handleInputChange={handleInputChange} 
        handleLoadConfig={handleLoadConfig} 
      />
      <Right config={config} />
    </div>
  );
};

export default App;
