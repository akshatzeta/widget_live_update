import React from "react";

const Right = ({ config }) => {
  const handleDownloadConfig = () => {
    const filteredConfig = {
      configName: config.configName,
      botName: config.botName,
      fontFamily: config.fontFamily,
      headerColor: config.headerColor,
      headerFontColor: config.headerFontColor,
      backgroundColor: config.backgroundColor,
      chatFontColor: config.chatFontColor,
    };
  
    const data = JSON.stringify(filteredConfig, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
  
    
    const fileName = config.configName ? `${config.configName}.json` : "config.json";
    link.download = fileName;
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  

  return (
    <div className="w-1/2 h-screen p-6 bg-gray-50 relative flex flex-col">
      
      <h2 className="text-2xl font-bold mb-4">Live Preview</h2>

      
      <div className="flex-grow flex items-center justify-center">
        <div
          className="rounded-2xl shadow-md flex flex-col items-center border-full"
          style={{
            backgroundColor: config.backgroundColor,
            fontFamily: config.fontFamily,
          }}
        >
          
          <div
            className="flex items-center justify-between px-4 py-2 rounded-t w-full "
            style={{
              backgroundColor: config.headerColor,
              color: config.headerFontColor,
            }}
          >
            <div className="flex items-center">
              <span className="font-bold">{config.botName}</span>
            </div>
            <button className="text-white font-bold">&times;</button>
          </div>

          
          <div className="p-4 text-sm w-full pb-60 flex items-center" style={{ color: config.chatFontColor }}>
              <img src={config.avatarImage} alt="Avatar" className="w-8 h-8 rounded-full mr-2"/>
              <span>Hi! I'm {config.botName}, your friendly concierge. How can I help?</span>
          </div>


          
          <div className="py-3 border-b text-center text-xs text-gray-600 w-full bg-white">
            Need help? Just type or say it.
            <img src={config.launcherImage} alt="Launcher" className="absolute bottom-48 right-72 w-16 h-16 rounded-lg"/>
          </div>
          
        </div>
        
      </div>
      

      
      <button
        onClick={handleDownloadConfig}
        className="absolute bottom-6 px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800"
      >
        Download Config
      </button>
    </div>
  );
};

export default Right;
