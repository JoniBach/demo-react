import { Chart } from "../components/Chart";
import { useData } from "../contexts/context";

export function ChartRoute() {
  const { data, charts, loading } = useData();

  return (
    <div>
      <h1>Chart Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Chart data={data.reviews} config={charts} />
      )}
    </div>
  );
}
