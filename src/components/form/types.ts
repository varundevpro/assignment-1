
export type FormFieldType = 
  | "text"
  | "textarea"
  | "radio"
//   | "checkbox"
  | "select"
//   | "email"
  | "number";

export type FormFieldConfig = {
  label: string;
  type: FormFieldType;
  required: "true" | "false";
  placeholder?: string;
  options?: { label: string; value: string }[];  // For radio, checkbox, select
};

export interface FormProps {
  title: string;
  description?: string;
  submitButtonText: string;
  fields: FormFieldConfig[];
};