import type { Data } from "@measured/puck";
import {Props} from "./puck.config";

export const data: Partial<Data<Props>> = {
  "root": {
      "props": {
        title: "Editor Assignment"
      }
  },
  "content": [
      {
          "type": "Form",
          "props": {
              "title": "Contact Form",
              "description": "Hit \"Publish\" to save your edits.",
              "submitButtonText": "Submit",
              "fields": [
                  {
                      "label": "Name",
                      "type": "text",
                      "required": "true",
                      "placeholder": "Enter your name"
                  },
                  {
                      "label": "Message",
                      "type": "textarea",
                      "required": "false",
                      "placeholder": "Type your message here"
                  },
                  {
                      "label": "Expected budget",
                      "type": "radio",
                      "required": "false",
                      "options": [
                          {
                              "label": "Less than $25K",
                              "value": "lt25k"
                          },
                          {
                              "label": "$25K – $50K",
                              "value": "gt25k-lt50k"
                          },
                          {
                              "label": "$50K+",
                              "value": "gt50k"
                          }
                      ]
                  },
                  {
                      "label": "Revisions",
                      "type": "number",
                      "required": "true"
                  },
                  {
                      "label": "Country",
                      "type": "select",
                      "required": "false",
                      "options": [
                          {
                              "label": "United States",
                              "value": "us"
                          },
                          {
                              "label": "India",
                              "value": "in"
                          }
                      ]
                  }
              ],
              "id": "Form-65302247-febe-42f3-878d-dd66dfbae6ff"
          }
      }
  ],
  "zones": {}
}