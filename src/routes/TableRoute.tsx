import React from "react";
import { Table } from "../components/Table";
import { useData } from "../contexts/context";

export const TableRoute: React.FC = () => {
  const { data, columns, loading } = useData();

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Users Table</h1>
          <Table data={data.users} columns={columns.users} />

          <h1>Brands Table</h1>
          <Table data={data.brands} columns={columns.brands} />

          <h1>Products Table</h1>
          <Table data={data.products} columns={columns.products} />

          <h1>Reviews Table</h1>
          <Table data={data.reviews} columns={columns.reviews} />
        </>
      )}
    </div>
  );
};
