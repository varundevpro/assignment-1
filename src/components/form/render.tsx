import React, { useState } from "react";
import { PuckContext } from '@measured/puck'
import { FormFieldConfig, FormProps } from "./types";
import styled from "styled-components";

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
          <StyledTextAreaField>
            <StyledDefaultLabel>
              {field.label}
              {field.required === "true" && <StyledAsterisk>*</StyledAsterisk>}
            </StyledDefaultLabel>
            <StyledTextarea
              id={fieldId}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(fieldId, e.target.value)}
              required={field.required === "true"}
              className="w-full p-2 border rounded"
            />
          </StyledTextAreaField>
        );

      case "radio":
        return (
          <StyledRadioField>
            <h3>
              {field.label}
              {field.required === "true" && <StyledAsterisk>*</StyledAsterisk>}
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
          </StyledRadioField>
        );

      case "select":
        return (
          <>
            <StyledDefaultLabel>
              {field.label}
              {field.required === "true" && <StyledAsterisk>*</StyledAsterisk>}
            </StyledDefaultLabel>
            <StyledSelect
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
            </StyledSelect>
          </>
        );

      default:
        return (
          <>
            <StyledDefaultLabel>
              {field.label}
              {field.required === "true" && <StyledAsterisk>*</StyledAsterisk>}
            </StyledDefaultLabel>
            <StyledDefaultInput
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
    <StyledSection>
      {title && <StyledHeading>{title}</StyledHeading>}
      {description && <StyledDescription>{description}</StyledDescription>}

      <StyledForm onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <StyledField key={index}>
            {renderField(field, index)}
          </StyledField>
        ))}

        <StyledButton
          type="submit"
          tabIndex={puck.isEditing ? -1 : undefined}
        >
          {submitButtonText}
        </StyledButton>
      </StyledForm>

      {submitted && (
        <StyledSuccessMessage>
          Form submitted successfully!
        </StyledSuccessMessage>
      )}
    </StyledSection>
  );
}

const StyledSection = styled.section`
  max-width: 1024px;
  padding: 128px 16px;
  margin: 0 auto;
  font-family: sans-serif;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media screen and (max-width: 600px) {
    padding: 64px 16px;
  }
`

const StyledHeading = styled.h2`
  text-align: center;
  font-size: 48px;
  font-weight: 600;
  letter-spacing: -1.2px;
  
  @media screen and (max-width: 600px) {
    font-size: 28px;
    letter-spacing: -0.6px;
  }
`

const StyledDescription = styled.p`
  text-align: center;
  font-size: 18px;
  line-height: 32px;
  margin-top: 8px;
  color: #555555;
  
  @media screen and (max-width: 600px) {
    font-size: 16px;
    line-height: 24px;
  }
`

const StyledForm = styled.form`
  max-width: 680px;
  margin: 64px auto 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
`

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledTextAreaField = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledDefaultLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
`

const StyledDefaultInput = styled.input`
  margin-top: 8px;
  font-size: 16px;
  padding: 12px 14px;
  width: 100%;
  border: 1px solid #D0D5DD;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
`

const StyledAsterisk = styled.span`
  padding: 0 0.25em;
  color: #f63d68;
`

const StyledTextarea = styled.textarea`
  margin-top: 8px;
  font-family: inherit;
  font-size: 16px;
  line-height: 20px;
  padding: 12px 14px;
  width: 100%;
  min-height: 86px;
  border: 1px solid #D0D5DD;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  resize: vertical;
`

const StyledSelect = styled.select`
  margin-top: 8px;
  font-family: inherit;
  font-size: 15px;
  padding: 12px;
  width: 100%;
  border: 1px solid #D0D5DD;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;

  padding-right: 1.5rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.87868 7.12132L8 9.24264L10.1213 7.12132' stroke='rgb(0 0 0 / 90%)' stroke-linecap='round'/%3E%3C/svg%3E%0A");
  background-size: 24px;
  background-position: calc(100% - 0.25rem) center;
  background-repeat: no-repeat;
`

const StyledButton = styled.button`
  appearance: none;
  background-color: #444ce7;
  border: 1px solid #444ce7;
  color: #fafafa;
  border-radius: 8px;

  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  padding: 12px 14px;
  width: 100%;

  &:hover {
    background-color: #3538cd;
    border-color: #3538cd;
  }
`

const StyledRadioField = styled.div`
  h3 {
    font-size: 14px;
    font-weight: 600;
  }

  h3 + div {
    margin-top: 16px;
    
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  label {
    display: flex;
    gap: 10px;
    font-size: 16px;
    color: #555;
  }

  label > input {
    margin-top: 1px;
    width: 16px;
    height: 16px;
  }
`

const StyledSuccessMessage = styled.div`
  color: #069506;
  padding: 12px;
  text-align: center;
`