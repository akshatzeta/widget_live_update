import React, { useState } from "react";

const Left = ({ config, handleInputChange, handleLoadConfig }) => {
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];

    if (file && file.type === "application/json") {
      fileReader.onload = (event) => {
        try {
          const loadedConfig = JSON.parse(event.target.result);
          console.log("Parsed Config:", loadedConfig); 
          if (isValidConfig(loadedConfig)) {
            handleLoadConfig(loadedConfig); 
            setError(null);
          } else {
            setError("Invalid configuration format.");
          }
        } catch (err) {
          console.error("Error parsing JSON:", err);
          setError("Error parsing JSON file.");
        }
      };
      fileReader.readAsText(file);
    } else {
      setError("Please upload a valid JSON file.");
    }
  };
  
  
  const isValidConfig = (config) => {
    const requiredFields = [
      "configName",
      "botName",
      "fontFamily",
      "headerColor",
      "headerFontColor",
      "backgroundColor",
      "chatFontColor",
    ];
    return requiredFields.every((field) => field in config);
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="w-1/2 p-6 bg-white shadow-md">

    
      <div className="mb-6">
        <button
          type="button"
          onClick={triggerFileInput}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Load Config
        </button>
        <input
          id="fileInput"
          type="file"
          accept="application/json"
          onChange={handleFileUpload}
          className="hidden"
        />
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      <form className="flex-row px-5 space-y-3">
        
        <div>
          <label className="block font-medium mb-2">Config Name</label>
          <input
            type="text"
            name="configName"
            value={config.configName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        
        <div>
          <label className="block font-medium mb-2">Bot Name</label>
          <input
            type="text"
            name="botName"
            value={config.botName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        
        <div>
          <label className="block font-medium mb-2">Font Family</label>
          <select
            name="fontFamily"
            value={config.fontFamily}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="Space Grotesk, sans-serif">Space Grotesk</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Roboto, sans-serif">Roboto</option>
          </select>
        </div>

        
        {[
          { label: "Header Color", name: "headerColor" },
          { label: "Header Font Color", name: "headerFontColor" },
          { label: "Background Color", name: "backgroundColor" },
          { label: "Chat Font Color", name: "chatFontColor" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block font-medium mb-2">{label}</label>
            <div className="flex items-center border rounded-lg">
              <input
                type="text"
                name={name}
                value={config[name]}
                onChange={handleInputChange}
                placeholder="#FFFFFF"
                className="w-full px-4 py-2 border-none rounded-lg"
              />
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(name).click();
                }}
              >
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: config[name] }}
                ></div>
              </button>
              <input
                id={name}
                type="color"
                name={name}
                value={config[name]}
                onChange={handleInputChange}
                className="hidden"
              />
            </div>
          </div>
        ))}

        
        <div>
          <label className="block font-medium mb-2">Avatar Image</label>
          <input
            type="file"
            name="avatarImage"
            onChange={(e) => handleInputChange(e)}
            className="w-full px-4 py-2 border rounded-lg"
            accept="image/*"
          />
        </div>

        
        <div>
          <label className="block font-medium mb-2">Launcher Image</label>
          <input
            type="file"
            name="launcherImage"
            onChange={(e) => handleInputChange(e)}
            className="w-full px-4 py-2 border rounded-lg"
            accept="image/*"
          />
        </div>
      </form>
    </div>
  );
};

export default Left;
