import React, { useRef, useEffect } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

interface TableProps {
  data: any[];
  columns: any[];
  id: string;
}

export const Table: React.FC<TableProps> = ({ data, columns, id }) => {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      const tabulator = new Tabulator(tableRef.current, {
        data,
        reactiveData: true,
        columns,
      });

      // Cleanup function to destroy Tabulator instance on component unmount
      return () => {
        tabulator.destroy();
      };
    }
  }, [data, columns]);

  return (
    <div>
      <h1>{id}</h1>
      <div ref={tableRef}></div>
    </div>
  );
};
