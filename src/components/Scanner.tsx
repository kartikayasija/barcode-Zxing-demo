import { BrowserMultiFormatReader } from "@zxing/library";
import { MouseEventHandler, useState } from "react";

export const Scanner: React.FC = () => {
  const [result, setResult] = useState<string>();
  const reader = new BrowserMultiFormatReader();
  const startScanner: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const [deviceId] = await reader.listVideoInputDevices();
    if (!deviceId) {
      console.log("No Camera");
    }
    console.log(deviceId);

    const result = await reader.decodeOnceFromVideoDevice(
      deviceId.deviceId,
      "video"
    );
    if(result){
      setResult(result.getText());
    }
  };
  return (
    <>
      <button onClick={startScanner}>Start</button>
      <button onClick={()=>reader.reset()}>Reset</button>

      <div style={{ display:'flex', justifyContent:'center',margin:'5rem 0' }}>
        <video
          id="video"
          width="350"
        ></video>
      </div>

      {result && <h1>Result : {result}</h1>}
    </>
  );
};
