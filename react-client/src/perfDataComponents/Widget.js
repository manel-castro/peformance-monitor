import Cpu from "./Cpu";
import Info from "./Info";
import Mem from "./Mem";

const Widget = () => {
  return (
    <h1>
      Widget
      <Cpu />
      <Mem />
      <Info />
    </h1>
  );
};
export default Widget;
