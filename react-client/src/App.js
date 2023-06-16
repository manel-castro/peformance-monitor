import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import socket from "./utilities/socketConnection";
import Widget from "./perfDataComponents/Widget";

function App() {
  const [performanceData, setPerformanceData] = useState({});
  useEffect(() => {
    socket.on("perfData", (data) => {
      const copyPerfData = { ...performanceData };
      copyPerfData[data.macA] = data;
      setPerformanceData(copyPerfData);
    });
  });

  const widgets = Object.values(performanceData).map((d) => (
    <Widget data={d} key={d.macA} />
  ));
  return <div className="container">{widgets}</div>;
}

export default App;
