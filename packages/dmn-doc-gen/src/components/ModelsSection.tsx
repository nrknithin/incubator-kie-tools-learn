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
// import { DmnLatestModel } from "@kie-tools/dmn-marshaller";
import { DmnEditor } from "@kie-tools/dmn-editor"; // Using the full editor for now

export interface ModelsSectionProps {
  definition: any; // DmnLatestModel; Assuming single model for now
  // To support multiple models, this would be an array: DmnLatestModel[]
}

// Helper to create an ID for anchor links
const createIdFromName = (name: string) => {
  return String(name).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export const ModelsSection: React.FC<ModelsSectionProps> = ({ definition }) => {
  const styles: Record<string, React.CSSProperties> = {
    modelsSection: {
      padding: "20px",
      borderBottom: "1px solid #eee",
      marginBottom: "20px",
      // Conceptual landscape feel - actual PDF landscape is via @page CSS
      // For preview, we might constrain width or show a horizontal scroll if content is wide
    },
    modelTitle: {
      fontSize: "1.8em",
      fontWeight: "bold",
      marginBottom: "1em",
      borderBottom: "1px dashed #ccc",
      paddingBottom: "0.5em",
    },
    drdContainer: {
      marginBottom: "2em",
      padding: "1em",
      border: "1px solid #f0f0f0",
      // Simulating "new page" with significant margin
      pageBreakAfter: "always", // For PDF generation hint
    },
    drdTitle: {
      fontSize: "1.5em",
      marginBottom: "1em",
    },
    drdEditorContainer: {
      minHeight: "500px", // Ensure editor has space
      border: "1px solid #ddd",
      background: "#f9f9f9", // So it's visible if editor is empty
    },
    placeholder: {
      padding: "20px",
      textAlign: "center",
      color: "#888",
    }
  };

  const modelName = definition?.definitions?.["@_name"] || "Unnamed Model";
  // DMN DI an array of DMNDiagram objects
  const diagrams = definition?.["dmnDI"]?.["dmndi:DMNDiagram"] || [];

  if (!definition || !diagrams || diagrams.length === 0) {
    return (
      <div style={styles.modelsSection} data-testid="models-section">
        <div style={styles.modelTitle} id={`model-${createIdFromName(modelName)}`}>
          Model: {modelName}
        </div>
        <p style={styles.placeholder}>No DRDs found in this model.</p>
      </div>
    );
  }

  return (
    <div style={styles.modelsSection} data-testid="models-section">
      <div style={styles.modelTitle} id={`model-${createIdFromName(modelName)}`}>
        Model: {modelName}
      </div>
      {diagrams.map((diag: any, index: number) => (
        <div key={diag["@_id"] || index} style={styles.drdContainer}>
          <h3 style={styles.drdTitle} id={`drd-${createIdFromName(diag["@_name"] || `drd-${index}`)}`}>
            DRD: {diag["@_name"] || `DRD ${index + 1}`}
          </h3>
          <div style={styles.drdEditorContainer}>
            {/*
              The DmnEditor component expects the full model and other props.
              It internally handles which DRD to show if multiple are present,
              often based on the `navigation` state within its own context or props.
              For a documentation generator, we might need a way to tell it
              "render only DRD with id X" or "render DRD at index Y".
              This might require a custom wrapper or a specific view mode in DmnEditor if available.
              For now, passing the full definition and hoping it defaults to the first DRD or
              we might need to explore DmnEditor's API more deeply for specific DRD rendering.
              A simpler approach for pure read-only might be to extract SVG directly if possible,
              but that loses interactivity if any is desired in preview.
            */}
            <DmnEditor
              model={definition}
              originalVersion="0.0.0" // Placeholder, might not be relevant for read-only
              externalModelsByNamespace={new Map()} // Assuming no external models for now
              externalContextName={""}
              externalContextDescription={""}
              resources={new Map()}
              evaluationResults={undefined}
              validationMessages={[]}
              isReadOnly={true}
              // Props to control which DRD is active would be ideal here.
              // E.g., initialActiveDrdId={diag["@_id"]} if such a prop existed.
            />
            <p style={styles.placeholder}>
              <i>(Full DMN Editor integration for DRD: "{diag["@_name"] || `DRD ${index + 1}`}")</i>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
