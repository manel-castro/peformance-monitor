import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import socket from "./socketConnection";
import Widget from "./perfDataComponents/Widget";

function App() {
  const [performanceData, setPerformanceData] = useState({});
  useEffect(() => {
    socket.on("perfData", (data) => {
      console.log("data: ", data);
      const copyPerfData = { ...performanceData };
      copyPerfData[data.macA] = data;
      setPerformanceData(copyPerfData);
    });
  });
  return (
    <>
      <Widget />
    </>
  );
}

export default App;
