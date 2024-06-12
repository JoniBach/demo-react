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
          {forms.map((form: any) => (
            <div key={form.id}>
              <h1>{form.id.charAt(0).toUpperCase() + form.id.slice(1)} Form</h1>
              <Form
                onSubmit={handleSubmit}
                data={data?.[form.id]?.[0]}
                fields={form.data}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
