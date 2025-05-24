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
import { DmnEditorStandalone } from "@kie-tools/dmn-editor-standalone"; // Updated import

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
      // Consider adding overflow: "auto" if content might exceed fixed height
    },
    placeholder: {
      padding: "20px",
      textAlign: "center",
      color: "#888",
      fontStyle: "italic",
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
              Using DmnEditorStandalone.
              NOTE: DmnEditorStandalone typically expects the DMN model as an XML string.
              If 'definition' is a JSON object (from dmn-marshaller), it will likely need to be
              marshalled back to XML string form before being passed to DmnEditorStandalone.
              This marshalling step is not included here and would be a prerequisite.
              Example:
              import { DmnMarshaller } from "@kie-tools/dmn-marshaller";
              const marshaller = new DmnMarshaller();
              const xmlString = marshaller.marshall(definition);
              // then pass xmlString to the model prop.

              Also, how DmnEditorStandalone handles multiple DRDs within a single model needs confirmation.
              It might display all of them, only the first, or require a specific prop to select one.
              If it shows all DRDs, then looping and creating multiple instances might be redundant;
              a single instance with the full model could suffice.
              If it shows one, this loop is conceptually correct if a prop like 'initialDrdId' exists.
              For now, we are instantiating it per DRD found in dmnDI, assuming it might focus on
              the specific DRD context if such a feature exists or simply render the whole model,
              which might lead to repeated full model renderings if not handled carefully.
            */}
            <DmnEditorStandalone
              model={definition} // Placeholder: This likely needs to be an XML string.
              isReadOnly={true}
              // Speculative props (verify against DmnEditorStandalone's actual API):
              // initialDrdId={diag["@_id"]}
              // width={"100%"} // Might be controlled by container styles
              // height={"500px"} // Might be controlled by container styles
            />
            <p style={styles.placeholder}>
              <i>(Rendered DRD: "{diag["@_name"] || `DRD ${index + 1}`}" using DmnEditorStandalone. Note: Model prop likely requires XML.)</i>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
