import { Fields, type ComponentConfig } from '@measured/puck'
import { FormFieldConfig, FormProps } from "./types";
import { RenderForm } from "./render";

const fields: Fields<FormProps> = {
  title: {
    type: "text",
    label: 'Title of the form'
  },
  description: { type: "textarea", label: 'Description' },
  submitButtonText: { type: "text", label: 'Submit Button Text' },
  fields: {
    label: 'Form Fields',
    type: "array",
    min: 1,
    getItemSummary: (item: { label: string; }) => item.label || "Form Field",
    arrayFields: {
      label: {
        type: "text",
        label: "Label",
      },
      type: {
        type: "select",
        label: 'Input Type',
        options: [
          { label: "Text Input", value: "text" },
          { label: "Text Area", value: "textarea" },
          { label: "Radio Buttons", value: "radio" },
          { label: "Select Dropdown", value: "select" },
          { label: "Number", value: "number" }
        ]
      },
      placeholder: {
        type: "text",
        label: "Placeholder",
      },
      required: {
        type: "radio",
        options: [
          { label: "Required", value: "true" },
          { label: "Optional", value: "false" },
        ],
      },
      options: {
        type: "array",
        label: "Options",
        getItemSummary: (item: { label: string; }, index) => item.label || `Option #${(index || 0) + 1}`,
        arrayFields: {
          label: { type: "text" },
          value: { type: "text" }
        } as Fields<Exclude<FormFieldConfig['options'], undefined>[number]>,
        defaultItemProps: {
          label: "",
          value: ""
        },
      },
    },
    defaultItemProps: {
      label: "New Field",
      type: "text",
      required: "false"
    }
  }
}

export const Form: ComponentConfig<FormProps> = {
  fields,

  defaultProps: {
    title: "Contact Us",
    description: "We’d love to hear from you. Please fill out this form.",
    submitButtonText: "Submit",
    fields: [
      {
        label: "Name",
        type: "text",
        required: "true",
        placeholder: "Enter your name"
      }
    ]
  },

  render: ({ title, description, submitButtonText, fields, puck }) => {
    return (
      <RenderForm
        title={title}
        description={description}
        submitButtonText={submitButtonText}
        fields={fields}
        puck={puck}
      />
    )
  }
};
