/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DocumentPreview, DocumentPreviewProps } from "../src/DocumentPreview";
// import { DmnLatestModel } from "@kie-tools/dmn-marshaller"; // For proper typing

// Enhanced Mock DMN definition for the story
const mockFullDmnDefinition: any /* DmnLatestModel */ = {
  definitions: {
    "@_id": "_model1",
    "@_name": "Loan Application",
    "@_namespace": "https://kie.apache.org/dmn/loan-app",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "dmn:description": "A comprehensive DMN model for loan application processing.",
    drgElement: [
      {
        "@_id": "_input_age",
        "@_name": "Applicant Age",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        __$$element: "inputData",
        variable: { "@_name": "Applicant Age", "@_typeRef": "feel:number" },
      },
      {
        "@_id": "_input_credit_score",
        "@_name": "Credit Score",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        __$$element: "inputData",
        variable: { "@_name": "Credit Score", "@_typeRef": "feel:number" },
      },
      {
        "@_id": "_decision_eligibility",
        "@_name": "Loan Eligibility",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        __$$element: "decision",
        variable: { "@_name": "Loan Eligibility", "@_typeRef": "tEligibilityStatus" },
        informationRequirement: [
          { requiredInput: { "@_href": "#_input_age" } },
          { requiredInput: { "@_href": "#_input_credit_score" } },
        ],
        expression: {
          "@_id": "_exp_eligibility",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          __$$element: "literalExpression", // Simple example
          text: { __text: "if Applicant Age > 18 and Credit Score > 600 then \"Eligible\" else \"Not Eligible\"" },
        },
      },
      {
        "@_id": "_bkm_scoring_rules",
        "@_name": "Scoring Rules",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        __$$element: "businessKnowledgeModel",
        variable: { "@_name": "Scoring Rules", "@_typeRef": "feel:string" }, // Type for BKM might be different
        encapsulatedLogic: {
            "@_id": "_bkm_exp",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            __$$element: "literalExpression",
            text: { __text: "\"Some complex scoring rule logic...\""}
        }
      }
    ],
    itemDefinition: [
      {
        "@_id": "_type_person",
        "@_name": "tPerson",
        "@_isCollection": false,
        itemComponent: [
          { "@_id": "_person_name", "@_name": "Name", typeRef: {__text: "feel:string"} },
          { "@_id": "_person_age", "@_name": "Age", typeRef: {__text: "feel:number"} },
        ]
      },
      {
        "@_id": "_type_eligibility_status",
        "@_name": "tEligibilityStatus",
        "@_isCollection": false,
        typeRef: {__text: "feel:string"},
        allowedValues: {
            "@_id": "_constraint_eligibility",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            __$$element: "unaryTests",
            text: {__text: "\"Eligible\", \"Not Eligible\", \"Review""}
        }
      }
    ],
  },
  dmnDI: { // DMN Diagram Interchange information
    "dmndi:DMNDiagram": [
        {
            "@_id": "_drd1_id",
            "@_name": "Main DRD",
            // Bounds and shapes would go here for actual rendering
            "dmndi:DMNShape": [
                // shapes for input_age, input_credit_score, decision_eligibility
            ],
            "dmndi:DMNEdge": [
                // edges for informationRequirements
            ]
        }
    ]
  }
};

const meta: Meta<typeof DocumentPreview> = {
  title: "DMN Document Generation/DocumentPreview",
  component: DocumentPreview,
  tags: ["autodocs"],
  argTypes: {
    definition: {
      control: "object",
      description: "The DMN model definition (from dmn-marshaller).",
    },
    showDownload: {
      control: "boolean",
      description: "Whether to show the download button.",
    },
    // Props for CoverPage might be added here if needed directly on DocumentPreview story
    subtitle: {
      control: "text",
      description: "Subtitle for the cover page (e.g., Banking).",
    },
    modelNames: {
      control: "object",
      description: "Array of model names for the cover page (if definition is an array or for override)."
    }
  },
};

export default meta;
type Story = StoryObj<DocumentPreviewProps & { subtitle?: string; modelNames?: string[] }>;


export const FullDocument: Story = {
  args: {
    definition: mockFullDmnDefinition,
    showDownload: true,
    subtitle: "Banking Loan Application",
    // modelNames: ["Loan Application"] // Can be omitted if derived from definition
  },
};

export const MinimalDocument: Story = {
  args: {
    definition: {
      definitions: {
        "@_id": "_minimal_model",
        "@_name": "Minimal DMN",
        "@_namespace": "https://kie.apache.org/dmn/minimal",
        drgElement: [
          {
            "@_id": "_min_input",
            "@_name": "Minimal Input",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            __$$element: "inputData",
            variable: { "@_name": "Minimal Input", "@_typeRef": "feel:string" },
          },
        ],
        itemDefinition: [],
      },
      dmnDI: { "dmndi:DMNDiagram": [{ "@_id": "_min_drd", "@_name": "Minimal DRD"}] }
    },
    showDownload: false,
    subtitle: "Simple Example",
  },
};

export const NoDataTypes: Story = {
  args: {
    ...FullDocument.args, // Use full definition but test how sections handle missing parts
    // @ts-ignore
    definition: {
      ...mockFullDmnDefinition,
      definitions: {
        ...mockFullDmnDefinition.definitions,
        itemDefinition: [], // No custom data types
      }
    },
    subtitle: "Test: No Data Types",
  }
};

export const NoDrgElements: Story = {
  args: {
    ...FullDocument.args,
    // @ts-ignore
    definition: {
      ...mockFullDmnDefinition,
      definitions: {
        ...mockFullDmnDefinition.definitions,
        drgElement: [], // No DRG Elements
      }
    },
    subtitle: "Test: No DRG Elements",
  }
};
