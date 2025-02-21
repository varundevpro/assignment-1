import React, { useState } from "react";
import { PuckContext } from '@measured/puck'
import { FormFieldConfig, FormProps } from "./types";

type RenderFormProps = {
  title: FormProps['title'],
  description: FormProps['description'],
  submitButtonText: FormProps['submitButtonText'],
  fields: FormProps['fields'],
  puck: PuckContext
}

export const RenderForm = ({ title, description, submitButtonText, fields, puck }: RenderFormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted with values:", formValues);
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const renderField = (field: FormFieldConfig, index: number) => {
    const fieldId = `field-${index}`;
    const value = formValues[fieldId] || "";

    switch (field.type) {
      case "textarea":
        return (
          <div className="text-area-field">
            <label className="default">
              {field.label}
              {field.required === "true" && <span className="asterisk">*</span>}
            </label>
            <textarea
              id={fieldId}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(fieldId, e.target.value)}
              required={field.required === "true"}
              className="w-full p-2 border rounded"
            />
          </div>
        );

      case "radio":
        return (
          <div className="radio-field">
            <h3>
              {field.label}
              {field.required === "true" && <span className="asterisk">*</span>}
            </h3>
            <div>
              {field.options?.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={fieldId}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => handleFieldChange(fieldId, e.target.value)}
                    required={field.required === "true"}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "select":
        return (
          <>
            <label className="default">
              {field.label}
              {field.required === "true" && <span className="asterisk">*</span>}
            </label>
            <select
              id={fieldId}
              value={value}
              onChange={(e) => handleFieldChange(fieldId, e.target.value)}
              required={field.required === "true"}
              className="w-full p-2 border rounded"
            >
              <option value="">Select an option</option>
              {field.options?.map((option, optionIndex) => (
                <option key={optionIndex} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        );

      default:
        return (
          <>
            <label className="default">
              {field.label}
              {field.required === "true" && <span className="asterisk">*</span>}
            </label>
            <input
              className="default"
              type={field.type}
              id={fieldId}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(fieldId, e.target.value)}
              required={field.required === "true"}
            />
          </>
        );
    }
  };

  return (
    <section className="form">
      {title && <h2>{title}</h2>}
      {description && <p className="description">{description}</p>}

      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div className="field" key={index}>
            {renderField(field, index)}
          </div>
        ))}

        <button
          type="submit"
          tabIndex={puck.isEditing ? -1 : undefined}
        >
          {submitButtonText}
        </button>
      </form>

      {submitted && (
        <div className="success-message">
          Form submitted successfully!
        </div>
      )}
    </section>
  );
}
