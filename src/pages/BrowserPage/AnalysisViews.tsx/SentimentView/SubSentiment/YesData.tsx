import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Instruction from "./Instruction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface YesDataProps {
  data: any;
}

export const YesData: React.FC<YesDataProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          marginTop: "30px",
          width: "100%",
        }}>
        <Line data={data} />
      </div>
      <Instruction />
    </div>
  );
};

export default YesData;
