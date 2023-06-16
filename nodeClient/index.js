const os = require("os");
const io = require("socket.io-client");
const options = {
  auth: {
    token: "asdfañlskdjglk12",
  },
};
const socket = io("http://127.0.0.1:3000", options);

socket.on("connect", () => {
  console.log("we connected to the server");

  const nI = os.networkInterfaces(); // A list of all network interfaces on this machine
  let macAddress;
  for (let key in nI) {
    const isInternetFacing = !nI[key][0].internal;
    if (isInternetFacing) {
      macAddress = nI[key][0].mac;
      break;
    }
  }

  const perfDataInterval = setInterval(async () => {
    const perfData = await performanceLoadData();
    perfData.macA = macAddress;
    socket.emit("perfData", perfData);
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(perfDataInterval);
  });
});

function cpuAverage() {
  const cpus = os.cpus();

  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((aCore) => {
    for (mode in aCore.times) {
      totalMs += aCore.times[mode];
    }
    idleMs += aCore.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
}

const getCpuLoad = (cpus) =>
  new Promise((res, rej) => {
    const start = cpuAverage(cpus); // "Now" value of load
    setTimeout(() => {
      const end = cpuAverage(cpus); // "End" value of now
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;

      const percentOfCpu = 100 - Math.floor((100 * idleDiff) / totalDiff);
      res(percentOfCpu);
    }, 100);
  });

const performanceLoadData = () =>
  new Promise(async (res, rej) => {
    const osType = os.type() === "Darwin" ? "Mac" : os.type();

    const cpus = os.cpus();

    const upTime = os.uptime();

    const freeMem = os.freemem(); // in bytes

    const totalMem = os.totalmem(); // in bytes

    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;

    const cpuType = cpus[0].model;
    const numCores = cpus.length;
    const cpuSpeed = cpus[0].speed;
    const cpuLoad = await getCpuLoad();

    res({
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
    });
  });

// Testing:
const run = async () => {
  const data = await performanceLoadData();
  console.log(data);
};
