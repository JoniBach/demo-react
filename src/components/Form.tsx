import React from "react";

interface Field {
  title: string;
  field: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  validation?: string;
  min?: number;
  max?: number;
  options?: string[];
}

interface FormProps {
  data: any;
  fields: Field[];
  onSubmit: (formData: any) => void;
}

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const setNestedValue = (obj: any, path: string, value: any) => {
  const keys = path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
};

export const Form: React.FC<FormProps> = ({ data, fields, onSubmit }) => {
  const renderField = (field: Field, index: number) => {
    const defaultValue = getNestedValue(data, field.field) || "";

    if (field.type === "radio") {
      return (
        <div key={index}>
          <label>{field.title}</label>
          {field.options?.map((option, idx) => (
            <div key={idx}>
              <input
                type="radio"
                name={field.field}
                value={option}
                required={field.required}
                defaultChecked={defaultValue === option}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={index}>
          <label>{field.title}</label>
          <textarea
            name={field.field}
            placeholder={field.placeholder}
            required={field.required}
            defaultValue={defaultValue}
          ></textarea>
        </div>
      );
    }

    return (
      <div key={index}>
        <label>{field.title}</label>
        <input
          type={field.type}
          name={field.field}
          placeholder={field.placeholder}
          required={field.required}
          pattern={field.validation}
          min={field.min}
          max={field.max}
          defaultValue={defaultValue}
        />
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataObj: any = {};
    formData.forEach((value, key) => {
      setNestedValue(dataObj, key, value);
    });
    onSubmit(dataObj);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(renderField)}
      <button type="submit">Submit</button>
    </form>
  );
};
