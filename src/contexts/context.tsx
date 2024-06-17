import React, { createContext, useContext, useState, useEffect } from "react";

interface Data {
  users: any[];
  brands: any[];
  products: any[];
  reviews: any[];
}

interface Columns {
  users: any[];
  brands: any[];
  products: any[];
  reviews: any[];
}

interface DataContextProps {
  data: Data;
  columns: any;
  forms: any;
  charts: any;
  loading: boolean;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Data>({
    users: [],
    brands: [],
    products: [],
    reviews: [],
  });
  const [columns, setColumns] = useState<Columns>({
    users: [],
    brands: [],
    products: [],
    reviews: [],
  });
  const [forms, setForms] = useState<Columns>({
    users: [],
    brands: [],
    products: [],
    reviews: [],
  });
  const [charts, setCharts] = useState<Columns>({
    users: [],
    brands: [],
    products: [],
    reviews: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch("/data/users.json");
        const brandsRes = await fetch("/data/brands.json");
        const productsRes = await fetch("/data/products.json");
        const reviewsRes = await fetch("/data/reviews.json");
        const columnsRes = await fetch("/data/columns.json");
        const formsRes = await fetch("/data/forms.json");
        const chartsRes = await fetch("/data/charts.json");

        if (
          !usersRes.ok ||
          !brandsRes.ok ||
          !productsRes.ok ||
          !reviewsRes.ok ||
          !formsRes.ok ||
          !chartsRes.ok ||
          !columnsRes.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const users = await usersRes.json();
        const brands = await brandsRes.json();
        const products = await productsRes.json();
        const reviews = await reviewsRes.json();
        const columnsData = await columnsRes.json();
        const formsData = await formsRes.json();
        const chartsData = await chartsRes.json();

        setData({
          users,
          brands,
          products,
          reviews,
        });
        setColumns(columnsData);
        setForms(formsData);
        setCharts(chartsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, columns, charts, forms, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
