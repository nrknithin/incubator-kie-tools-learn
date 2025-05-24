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

// User-provided DMN definition
const userDmnExample: any /* DmnLatestModel */ = {
  definitions: { // Added 'definitions' wrapper based on typical DMN JSON structure
    "@_xmlns": "https://www.omg.org/spec/DMN/20230324/MODEL/",
    "@_xmlns:dmndi": "https://www.omg.org/spec/DMN/20230324/DMNDI/",
    "@_xmlns:dc": "http://www.omg.org/spec/DMN/20180521/DC/",
    "@_xmlns:di": "http://www.omg.org/spec/DMN/20180521/DI/",
    "@_xmlns:kie": "https://kie.org/dmn/extensions/1.0",
    "@_expressionLanguage": "https://www.omg.org/spec/DMN/20230324/FEEL/",
    "@_namespace": "https://kie.org/dmn/_8374AB7A-71D3-4ADD-862D-D26AD2B46DE5",
    "@_id": "_447C55C3-BD36-450B-ABE7-3680E2746CE2",
    "@_name": "Loan_Application_Model", // Changed name for clarity in story
    itemDefinition: [
      { "typeRef": { "__$$text": "number" }, "typeConstraint": { "text": { "__$$text": "1,2,3,4,5,6,7,8,9,10" }, "@_id": "_CBA24E99-9C7B-49A0-90A8-92A6B0995D42", "@_kie:constraintType": "expression" }, "@_id": "_30F5AD76-D9FF-4C0A-BBFC-248102F3BF79", "@_name": "Loan-Tenure-Type", "@_isCollection": false, "@_typeLanguage": "https://www.omg.org/spec/DMN/20230324/FEEL/" },
      { "typeRef": { "__$$text": "string" }, "typeConstraint": { "text": { "__$$text": "\"Approved with Low Interest\",\"Approved with Standard Interest\",\"Approved with High Interest\",\"Approved with Very High Interest\",\"Rejected\"" }, "@_id": "_E1D6AB0F-6733-4A01-B44E-EAC32978BF19", "@_kie:constraintType": "expression" }, "@_id": "_1331D4A7-886C-4AF2-8320-ABE02213120F", "@_name": "Qualification", "@_isCollection": false, "@_typeLanguage": "https://www.omg.org/spec/DMN/20230324/FEEL/" },
      { "typeRef": { "__$$text": "string" }, "typeConstraint": { "text": { "__$$text": "\"Very Low\",\"Low\",\"Medium\",\"High\",\"Very High\",\"Extreme\"" }, "@_id": "_F167FD1B-5730-4A6E-B781-0BE8BDCCF682", "@_kie:constraintType": "expression" }, "@_id": "_41C36A1B-65E1-4871-96B2-43E393B1A51C", "@_name": "RiskType", "@_isCollection": false, "@_typeLanguage": "https://www.omg.org/spec/DMN/20230324/FEEL/" },
      { "typeRef": { "__$$text": "string" }, "typeConstraint": { "text": { "__$$text": "\"Good\", \"Average\", \"Poor\"" }, "@_id": "_3895F138-8707-48D7-A11F-5CA74438CDCC", "@_kie:constraintType": "expression" }, "@_id": "_60C147B6-F06C-486D-82AF-559F9D8808C1", "@_name": "CreditScoreCategory", "@_isCollection": false, "@_typeLanguage": "https://www.omg.org/spec/DMN/20230324/FEEL/" },
      { "typeRef": { "__$$text": "string" }, "typeConstraint": { "text": { "__$$text": "\"Salaried\", \"Self-Employed\", \"Unemployed\"" }, "@_id": "_BC3EEB87-33B1-4FAC-821E-19A0410A9192", "@_kie:constraintType": "expression" }, "@_id": "_B621A2DE-1EBF-43FE-9136-E6D0A202AA4F", "@_name": "EmploymentStatus", "@_isCollection": false, "@_typeLanguage": "https://www.omg.org/spec/DMN/20230324/FEEL/" },
      { "description": { "__$$text": "CreditScore" }, "typeRef": { "__$$text": "number" }, "typeConstraint": { "text": { "__$$text": "[300..900]" }, "@_id": "_B4A2DE33-F6A3-4A95-AAAC-2488760BF005", "@_kie:constraintType": "expression" }, "@_id": "_BFDA263E-E53D-497B-A244-28A1F39F5E25", "@_name": "CreditScore", "@_isCollection": false, "@_typeLanguage": "https://www.omg.org/spec/DMN/20230324/FEEL/" }
    ],
    drgElement: [
      { "variable": { "@_name": "Total Monthly Debt Payments", "@_id": "_84C0EAC6-0497-4600-91A6-3C5452B27185", "@_typeRef": "number" }, "__$$element": "inputData", "@_name": "Total Monthly Debt Payments", "@_id": "_A57B4B36-BC7E-42DC-8498-9AF2695482B2" },
      { "variable": { "@_name": "Gross Monthly Income", "@_id": "_14D25283-9037-4999-B6B4-17AF170A6C1E", "@_typeRef": "number" }, "__$$element": "inputData", "@_name": "Gross Monthly Income", "@_id": "_4F6C6D44-6AEB-4B5B-85D8-1C1CAE51204C" },
      { "variable": { "@_name": "Debt-to-Income-Ratio", "@_id": "_7D91D9FA-03B7-4E1F-9BA1-D27782320CE6", "@_typeRef": "number" }, "informationRequirement": [ { "requiredInput": { "@_href": "#_A57B4B36-BC7E-42DC-8498-9AF2695482B2" }, "@_id": "_82BBBF44-89E6-49D4-B81D-7EAB67B4F39A" }, { "requiredInput": { "@_href": "#_4F6C6D44-6AEB-4B5B-85D8-1C1CAE51204C" }, "@_id": "_4A065DFD-528B-4C68-8522-2399A5F295C7" } ], "expression": { "text": { "__$$text": "( Total Monthly Debt Payments / Gross Monthly Income ) * 100" }, "__$$element": "literalExpression", "@_id": "_EDCD3845-89E0-4EB7-A9EB-001279541C0D", "@_typeRef": "number", "@_label": "Debt-to-Income-Ratio" }, "__$$element": "decision", "@_name": "Debt-to-Income-Ratio", "@_id": "_A5DF328F-5C39-4106-844F-2FD3928A2433" },
      { "variable": { "@_name": "Risk-Level", "@_id": "_4AD00027-5A17-4A3B-95C4-7479F650BEFC", "@_typeRef": "RiskType" }, "informationRequirement": [ { "requiredDecision": { "@_href": "#_A5DF328F-5C39-4106-844F-2FD3928A2433" }, "@_id": "_8B6D9159-3321-43FE-B801-021AADF18A37" }, { "requiredDecision": { "@_href": "#_9D6E316C-5403-4A24-A216-CF2ED897D21A" }, "@_id": "_F7EA7C3D-3900-4EC4-91D0-E0EAF06802C9" }, { "requiredInput": { "@_href": "#_F4931DFB-81A2-49D8-A898-2A3B618993FC" }, "@_id": "_79A02B68-79DA-41F3-AC6C-8FBDC306A5A5" } ], "expression": { "text": { "__$$text": "if Debt-to-Income-Ratio < 30 and LTI <= 300 and Applicant-Age >= 21 and Applicant-Age <= 50 then \"Very Low\" else if Debt-to-Income-Ratio < 30 and LTI > 300 and LTI <= 500 and Applicant-Age >= 21 and Applicant-Age <= 50 then \"Low\" else \"Extreme\"" }, "__$$element": "literalExpression", "@_id": "_A7831A4E-B2BF-4DE4-9932-FB47DFBC8DD8", "@_typeRef": "RiskType", "@_label": "Risk-Level" }, "__$$element": "decision", "@_name": "Risk-Level", "@_id": "_62C2CB0E-D0EE-49AB-9D5D-E96E08597C46" },
      { "variable": { "@_name": "Requested Loan Amount", "@_id": "_AF332F5D-2C19-488B-89CE-1D1E93F47965", "@_typeRef": "number" }, "__$$element": "inputData", "@_name": "Requested Loan Amount", "@_id": "_D86D3968-7953-4A94-B6EC-E566DC5209F0" },
      { "variable": { "@_name": "LTI", "@_id": "_4DF12A03-9EAB-42F8-9FCA-95652CECB727", "@_typeRef": "number" }, "informationRequirement": [ { "requiredInput": { "@_href": "#_D86D3968-7953-4A94-B6EC-E566DC5209F0" }, "@_id": "_CB33EDB2-7FAA-429E-986A-F37BD0E5243E" }, { "requiredInput": { "@_href": "#_4F6C6D44-6AEB-4B5B-85D8-1C1CAE51204C" }, "@_id": "_5B90F4F4-038A-482F-A838-995D627B0DE9" } ], "expression": { "text": { "__$$text": "( Requested Loan Amount/ (Gross Monthly Income*12) ) * 100" }, "__$$element": "literalExpression", "@_id": "_BE3E5274-F288-442A-A3F9-8D01688254E2", "@_typeRef": "number", "@_label": "LTI" }, "__$$element": "decision", "@_name": "LTI", "@_id": "_9D6E316C-5403-4A24-A216-CF2ED897D21A" },
      { "variable": { "@_name": "Applicant-Age", "@_id": "_4A012531-63E5-4ECE-B267-BE70132BAF81", "@_typeRef": "number" }, "__$$element": "inputData", "@_name": "Applicant-Age", "@_id": "_F4931DFB-81A2-49D8-A898-2A3B618993FC" },
      { "variable": { "@_name": "Loan Qualification", "@_id": "_1CD54B09-FA25-4A1D-877A-5AEC10321FAB", "@_typeRef": "Qualification" }, "informationRequirement": [ { "requiredInput": { "@_href": "#_D71C36FC-626C-411D-91B1-04C290E8CDCB" }, "@_id": "_51BE474C-844A-42E5-B421-A9194BDDE55B" }, { "requiredDecision": { "@_href": "#_62C2CB0E-D0EE-49AB-9D5D-E96E08597C46" }, "@_id": "_7F3A89BF-E9DB-4013-B378-E2303DDF827E" }, { "requiredDecision": { "@_href": "#_C40F3741-CA00-415A-8B43-2405FC947E6E" }, "@_id": "_D2254F81-EAF4-4190-BB4D-B90F2FD52135" } ], "expression": { "text": { "__$$text": "if Risk-Level = \"Very Low\" and Credit-Score-Evaluation = \"Good\" then \"Approved with Low Interest\" else \"Rejected\"" }, "__$$element": "literalExpression", "@_id": "_584FE316-9E75-4B12-95F5-E4D9C5EDAC05", "@_typeRef": "Qualification", "@_label": "Loan Qualification" }, "__$$element": "decision", "@_name": "Loan Qualification", "@_id": "_8F3D6E8A-70B1-4CC0-B6A0-9BDB2124DAE6" },
      { "variable": { "@_name": "Employment-Type", "@_id": "_E3FCBF59-51C1-4A92-8BD8-5AF093E40FA6", "@_typeRef": "EmploymentStatus" }, "__$$element": "inputData", "@_name": "Employment-Type", "@_id": "_D71C36FC-626C-411D-91B1-04C290E8CDCB" },
      { "variable": { "@_name": "CreditScore", "@_id": "_BDA0EA06-2CFE-4D2A-9371-E8D4C20558A6", "@_typeRef": "CreditScore" }, "__$$element": "inputData", "@_name": "CreditScoreInput", "@_id": "_85D77255-247E-45F2-B368-149FBC12357D" }, // Renamed for clarity from type
      { "variable": { "@_name": "Credit-Score-Evaluation", "@_id": "_4B788A0C-BC37-4A0D-AA86-DBB8B3E0A22B", "@_typeRef": "CreditScoreCategory" }, "informationRequirement": [ { "requiredInput": { "@_href": "#_85D77255-247E-45F2-B368-149FBC12357D" }, "@_id": "_EDA451BE-7B13-4C04-9A87-E4C4094B2E4E" } ], "expression": { "text": { "__$$text": "if CreditScoreInput > 730 then \"Good\" else if CreditScoreInput <=730 and CreditScoreInput > 600 then \"Average\" else \"Poor\"" }, "__$$element": "literalExpression", "@_id": "_2A85E4C2-E261-47C5-A492-23039D165A2A", "@_typeRef": "CreditScoreCategory", "@_label": "Credit-Score-Evaluation" }, "__$$element": "decision", "@_name": "Credit-Score-Evaluation", "@_id": "_C40F3741-CA00-415A-8B43-2405FC947E6E" },
      { "variable": { "@_name": "InterestRate", "@_id": "_F5BF8389-BE77-4648-9386-A35181B764E5", "@_typeRef": "number" }, "informationRequirement": [ { "requiredInput": { "@_href": "#_FB640A2F-A319-468E-86B2-4C97E2127C20" }, "@_id": "_7600C898-CA68-4559-A92E-8808ACC20D63" }, { "requiredDecision": { "@_href": "#_8F3D6E8A-70B1-4CC0-B6A0-9BDB2124DAE6" }, "@_id": "_250A5B46-31F0-4710-9B00-2432305967E8" } ], "expression": { "text": { "__$$text": "if Loan Qualification = \"Rejected\" then null else 8.0" }, "__$$element": "literalExpression", "@_id": "_DE236BB4-FD90-43F9-B9C6-B426814CB6CF", "@_typeRef": "number", "@_label": "InterestRate" }, "__$$element": "decision", "@_name": "InterestRate", "@_id": "_5B31EC13-70FA-425E-9D87-AC0DE7F9B207" },
      { "variable": { "@_name": "Loan-Tenure", "@_id": "_637C6644-F69C-4609-BE4B-C441C0B33404", "@_typeRef": "Loan-Tenure-Type" }, "__$$element": "inputData", "@_name": "Loan-Tenure", "@_id": "_FB640A2F-A319-468E-86B2-4C97E2127C20" }
    ],
  },
  dmnDI: { // Simplified dmnDI for brevity, real one would be more complex
    "dmndi:DMNDiagram": [
      { "@_id": "_C9A4993B-5AD0-4AF4-94D1-1B00C26D2117", "@_name": "Loan Approval DRD" /*, ...shapes and edges */ },
      { "@_id": "_D264A88F-A307-40CA-B2DE-733C8FFE6EA2", "@_name": "Risk Assessment DRD" /*, ... */ },
      { "@_id": "_B2FE67DC-FB0C-4DAB-B7A7-4385EA825195", "@_name": "Interest Rate Calculation DRD" /*, ... */ },
      { "@_id": "_CA787EC2-908F-4A9F-BE6A-BA6DD45C265F", "@_name": "Credit Score Evaluation DRD" /*, ... */ },
      { "@_id": "_F5EFEBD1-F0B2-433C-A2AA-A0168860DF39", "@_name": "Debt to Income Calculation DRD" /*, ... */ },
      { "@_id": "_982BA33A-E0B1-449C-A46B-B781ADCF9DA3", "@_name": "Loan to Income Ratio DRD" /*, ... */ }
    ]
  }
};

const meta: Meta<typeof DocumentPreview> = {
  title: "DMN Document Generation/DocumentPreview",
  component: DocumentPreview,
  tags: ["autodocs"],
  argTypes: {
    definition: { control: "object" },
    showDownload: { control: "boolean" },
    subtitle: { control: "text" },
    modelNames: { control: "object" }
  },
};

export default meta;
type Story = StoryObj<DocumentPreviewProps & { subtitle?: string; modelNames?: string[] }>;

export const UserProvidedExample: Story = {
  args: {
    definition: userDmnExample,
    showDownload: true,
    subtitle: "Loan Application Detailed Test",
  },
};

export const MinimalDocument: Story = { // Kept for basic testing
  args: {
    definition: {
      definitions: {
        "@_id": "_minimal_model",
        "@_name": "Minimal DMN",
        drgElement: [ { "@_id": "_min_input", "@_name": "Minimal Input", __$$element: "inputData", variable: { "@_name": "Minimal Input", "@_typeRef": "feel:string" } } ],
        itemDefinition: [],
      },
      dmnDI: { "dmndi:DMNDiagram": [{ "@_id": "_min_drd", "@_name": "Minimal DRD"}] }
    },
    showDownload: false,
    subtitle: "Simple Example",
  },
};
