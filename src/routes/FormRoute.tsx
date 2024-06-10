import React from "react";
import { Form } from "../components/Form";
import { useData } from "../contexts/context";

export const FormRoute: React.FC = () => {
  const { data, forms, loading } = useData();

  const handleSubmit = (formData: any) => {
    console.log("Submitted data:", formData);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Users Form</h1>
          <Form
            onSubmit={handleSubmit}
            data={data.users[0]}
            fields={forms.users}
          />

          <h1>Brands Form</h1>
          <Form
            onSubmit={handleSubmit}
            data={data.brands[0]}
            fields={forms.brands}
          />

          <h1>Products Form</h1>
          <Form
            onSubmit={handleSubmit}
            data={data.products[0]}
            fields={forms.products}
          />

          <h1>Reviews Form</h1>
          <Form
            onSubmit={handleSubmit}
            data={data.reviews[0]}
            fields={forms.reviews}
          />
        </>
      )}
    </div>
  );
};
