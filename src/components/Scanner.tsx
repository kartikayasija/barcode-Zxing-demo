import { BrowserMultiFormatReader } from "@zxing/library";
import { MouseEventHandler, useState,useRef } from "react";

export const Scanner: React.FC = () => {
  const [result, setResult] = useState<string>();
  const reader = new BrowserMultiFormatReader();
  const videoRef = useRef<HTMLVideoElement>(null)
  const startScanner: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    // const [deviceId] = await reader.listVideoInputDevices();
    // if (!deviceId) {
    //   console.log("No Camera");
    // }
    // console.log(deviceId);

    const constraints = {
      video: {
        facingMode: "environment",
      },
    };
    if(videoRef.current){
      const result = await reader.decodeOnceFromConstraints(constraints,videoRef.current);
      if (result) {
        setResult(result.getText());
      }
    }
  };
  return (
    <>
      <button onClick={startScanner}>Start</button>
      <button onClick={() => reader.reset()}>Reset</button>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "5rem 0" }}
      >
        <video ref={videoRef} id="video" width="350"></video>
      </div>

      {result && <h1>Result : {result}</h1>}
    </>
  );
};
