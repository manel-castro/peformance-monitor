import "./Widget.css";
import Cpu from "./Cpu";
import Info from "./Info";
import Mem from "./Mem";
import socket from "../utilities/socketConnection";
import { useEffect, useState } from "react";

const Widget = ({ data }) => {
  const [isAlive, setIsAlive] = useState(true);

  const {
    freeMem,
    totalMem,
    usedMem,
    memUsage,
    osType,
    upTime,
    cpuType,
    numCores,
    cpuSpeed,
    cpuLoad,
    macA,
  } = data;

  const cpuData = { cpuLoad };
  const memData = { freeMem, totalMem, usedMem, memUsage };
  const infoData = { macA, osType, upTime, cpuType, cpuSpeed, numCores };

  useEffect(() => {
    socket.on("connectedOrNot", ({ machineMacA, isAlive }) => {
      if (machineMacA === macA) {
        setIsAlive(isAlive);
      }
      // Doesn't mean this client has disconnected (or reconnected)
      // It is for one of the node clients that is ticking
    });
  }, []);

  const notAliveDiv = !isAlive ? (
    <div className="not-active">Offline</div>
  ) : (
    <></>
  );

  return (
    <div className="widget row justify-content-evenly">
      {notAliveDiv}
      <Cpu data={cpuData} />
      <Mem data={memData} />
      <Info data={infoData} />
    </div>
  );
};
export default Widget;
