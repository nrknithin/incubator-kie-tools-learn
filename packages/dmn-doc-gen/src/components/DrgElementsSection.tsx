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
// import { DmnLatestModel, Decision, InputData, BusinessKnowledgeModel } from "@kie-tools/dmn-marshaller";
import { BoxedExpressionComponent } from "@kie-tools/boxed-expression-component";
import { EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateVariant } from "@patternfly/react-core/dist/js/components/EmptyState";
import { Title } from "@patternfly/react-core/dist/js/components/Title";
import { CubesIcon } from "@patternfly/react-icons/dist/js/icons/cubes-icon";


export interface DrgElementsSectionProps {
  definition: any; // DmnLatestModel; Assuming single model for now
}

// Helper to create an ID for anchor links
const createIdFromName = (name: string) => {
  return String(name).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const renderDrgElement = (el: any, allDrgElements: any[], dataTypes: any[]) => {
  const styles: Record<string, React.CSSProperties> = { // Moved styles inside for access if needed, or keep outside if static
    elementListItem: {
      marginBottom: "1.5em",
      padding: "10px",
      border: "1px solid #f0f0f0",
    },
    elementName: {
      fontSize: "1.2em",
      fontWeight: "bold",
    },
    elementDetails: {
      marginLeft: "20px",
      fontSize: "0.9em",
      color: "#333",
    },
    elementSubDetails: { // Added style
      marginLeft: "25px",
      fontSize: "0.85em",
      color: "#444",
      marginTop: "5px",
    },
    boxedExpressionContainer: {
      marginTop: "10px",
      border: "1px solid #ddd",
      minHeight: "150px",
      background: "#f9f9f9",
      padding: "10px",
    },
    placeholder: {
      padding: "10px",
      color: "#888",
      fontStyle: "italic",
    },
    requirementList: {
      listStyleType: "disc",
      paddingLeft: "20px",
      margin: "5px 0",
    }
  };
  
  const getElementNameById = (id: string) => {
    if (!id) return "Invalid ID";
    const found = allDrgElements.find(e => e["@_id"] === id.replace("#", ""));
    return found ? found["@_name"] : id;
  };

  return (
    <div key={el["@_id"]} style={styles.elementListItem}>
      <div style={styles.elementName}>{el["@_name"] || "Unnamed Element"}</div>
      <div style={styles.elementDetails}>
        ID: {el["@_id"]} <br />
        Type: {el.variable?.["@_typeRef"] || "N/A"}
      </div>

      {/* Display Information Requirements */}
      {el.informationRequirement && el.informationRequirement.length > 0 && (
        <div style={styles.elementSubDetails}>
          <strong>Requires:</strong>
          <ul style={styles.requirementList}>
            {el.informationRequirement.map((req: any, idx: number) => (
              <li key={req["@_id"] || idx}>
                {req.requiredInput && `Input: ${getElementNameById(req.requiredInput["@_href"])}`}
                {req.requiredDecision && `Decision: ${getElementNameById(req.requiredDecision["@_href"])}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Knowledge Requirements for Decisions and BKMs */}
      {el.knowledgeRequirement && el.knowledgeRequirement.length > 0 && (
        <div style={styles.elementSubDetails}>
          <strong>Knowledge Requires:</strong>
          <ul style={styles.requirementList}>
            {el.knowledgeRequirement.map((req: any, idx: number) => (
              <li key={req["@_id"] || idx}>
                {req.requiredKnowledge && `BKM: ${getElementNameById(req.requiredKnowledge["@_href"])}`}
                {/* Add other types like requiredInput / requiredDecision if applicable */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Expression for Decisions */}
      {el.__$$element === "decision" && el.expression && (
        <div style={styles.boxedExpressionContainer}>
          <strong>Expression ({el.expression.__$$element}):</strong>
          <BoxedExpressionComponent
            expressionDefinition={el.expression}
            logicType={el.expression.__$$element}
            dataTypes={dataTypes}
            isReadOnly={true}
          />
        </div>
      )}
      {el.__$$element === "decision" && !el.expression && (
         <p style={styles.placeholder}><i>(No expression defined for this decision)</i></p>
      )}

      {/* Encapsulated Logic for BKMs */}
      {el.__$$element === "businessKnowledgeModel" && el.encapsulatedLogic && (
        <div style={styles.boxedExpressionContainer}>
          <strong>Encapsulated Logic ({el.encapsulatedLogic.__$$element || "N/A"}):</strong>
          {typeof el.encapsulatedLogic.text?.__text === 'string' ? (
            <pre>{el.encapsulatedLogic.text.__text}</pre>
          ) : (
            <BoxedExpressionComponent
              expressionDefinition={el.encapsulatedLogic}
              logicType={el.encapsulatedLogic.__$$element}
              dataTypes={dataTypes}
              isReadOnly={true}
            />
          )}
        </div>
      )}
      {el.__$$element === "businessKnowledgeModel" && !el.encapsulatedLogic && (
         <p style={styles.placeholder}><i>(No encapsulated logic defined for this BKM)</i></p>
      )}
    </div>
  );
};


export const DrgElementsSection: React.FC<DrgElementsSectionProps> = ({ definition }) => {
  const styles: Record<string, React.CSSProperties> = { // Styles for the main component
    drgElementsSection: {
      padding: "20px",
      borderBottom: "1px solid #eee",
      marginBottom: "20px",
    },
    modelTitle: {
      fontSize: "1.8em",
      fontWeight: "bold",
      marginBottom: "1em",
      borderBottom: "1px dashed #ccc",
      paddingBottom: "0.5em",
    },
    elementTypeTitle: {
      fontSize: "1.5em",
      fontWeight: "bold",
      marginTop: "1.5em",
      marginBottom: "1em",
    }
  };

  const modelName = definition?.definitions?.["@_name"] || "Unnamed Model";
  const drgElements = definition?.definitions?.drgElement || [];
  const dataTypes = definition?.definitions?.itemDefinition || [];

  const inputs = drgElements.filter((el: any) => el.__$$element === "inputData");
  const decisions = drgElements.filter((el: any) => el.__$$element === "decision");
  const bkms = drgElements.filter((el: any) => el.__$$element === "businessKnowledgeModel");

  return (
    <div style={styles.drgElementsSection} data-testid="drg-elements-section">
      <div style={styles.modelTitle} id={`drg-elements-${createIdFromName(modelName)}`}>
        DRG Elements: {modelName}
      </div>

      {inputs.length > 0 && (
        <>
          <h3 style={styles.elementTypeTitle} id={`inputs-${createIdFromName(modelName)}`}>Inputs</h3>
          {inputs.map((el: any) => renderDrgElement(el, drgElements, dataTypes))}
        </>
      )}

      {decisions.length > 0 && (
        <>
          <h3 style={styles.elementTypeTitle} id={`decisions-${createIdFromName(modelName)}`}>Decisions</h3>
          {decisions.map((el: any) => renderDrgElement(el, drgElements, dataTypes))}
        </>
      )}

      {bkms.length > 0 && (
        <>
          <h3 style={styles.elementTypeTitle} id={`bkms-${createIdFromName(modelName)}`}>Business Knowledge Models (BKMs)</h3>
          {bkms.map((el: any) => renderDrgElement(el, drgElements, dataTypes))}
        </>
      )}

      {inputs.length === 0 && decisions.length === 0 && bkms.length === 0 && (
        <EmptyState variant={EmptyStateVariant.small}>
          <EmptyStateIcon icon={CubesIcon} />
          <Title headingLevel="h4" size="lg">
            No DRG Elements
          </Title>
          <EmptyStateBody>
            This DMN model does not contain any inputs, decisions, or business knowledge models.
          </EmptyStateBody>
        </EmptyState>
      )}
    </div>
  );
};
