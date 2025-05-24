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
// import { DmnLatestModel, ItemDefinition } from "@kie-tools/dmn-marshaller";
import { EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateVariant } from "@patternfly/react-core/dist/js/components/EmptyState";
import { Title } from "@patternfly/react-core/dist/js/components/Title";
import { CubesIcon } from "@patternfly/react-icons/dist/js/icons/cubes-icon";


export interface DataTypesSectionProps {
  definition: any; // DmnLatestModel; Assuming single model for now
}

// Helper to create an ID for anchor links
const createIdFromName = (name: string) => {
  return String(name).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const renderItemDefinition = (itemDef: any /* ItemDefinition */, level: number = 0): JSX.Element => {
  const styles: Record<string, React.CSSProperties> = {
    itemDef: {
      paddingLeft: `${level * 20}px`,
      marginBottom: "10px",
      borderLeft: level > 0 ? "2px solid #eee" : "none",
    },
    itemName: {
      fontWeight: "bold",
      fontSize: level === 0 ? "1.2em" : "1.1em",
    },
    itemDetails: {
      marginLeft: "15px",
      fontSize: "0.9em",
    },
    constraints: {
      marginTop: "5px",
      fontStyle: "italic",
      color: "#555",
    }
  };

  return (
    <div key={itemDef["@_id"]} style={styles.itemDef}>
      <div style={styles.itemName}>{itemDef["@_name"]}</div>
      <div style={styles.itemDetails}>
        Type: {itemDef.typeRef?.__text || itemDef.typeRef || (itemDef.itemComponent ? "Structure" : "Any")}
        {itemDef["@_isCollection"] && <span> (List)</span>}
      </div>
      {itemDef.allowedValues && (
        <div style={styles.constraints}>
          Allowed Values: {itemDef.allowedValues.text?.__text || itemDef.allowedValues.text}
        </div>
      )}
      {itemDef.typeConstraint && (
         <div style={styles.constraints}>
          Constraints: {itemDef.typeConstraint.text?.__text || itemDef.typeConstraint.text}
        </div>
      )}
      {/* Render nested components if it's a structure */}
      {itemDef.itemComponent && itemDef.itemComponent.map((component: any /* ItemDefinition */, idx: number) => (
        renderItemDefinition(component, level + 1)
      ))}
    </div>
  );
};


export const DataTypesSection: React.FC<DataTypesSectionProps> = ({ definition }) => {
  const styles: Record<string, React.CSSProperties> = {
    dataTypesSection: {
      padding: "20px",
      marginBottom: "20px", // No borderBottom if it's the last section
    },
    modelTitle: {
      fontSize: "1.8em",
      fontWeight: "bold",
      marginBottom: "1em",
      borderBottom: "1px dashed #ccc",
      paddingBottom: "0.5em",
    },
  };

  const modelName = definition?.definitions?.["@_name"] || "Unnamed Model";
  // itemDefinition is an array under definitions
  const itemDefinitions = definition?.definitions?.itemDefinition || [];
  const customDataTypes = itemDefinitions.filter((itemDef: any) => !itemDef.typeRef?.__text?.startsWith("feel:"));


  return (
    <div style={styles.dataTypesSection} data-testid="data-types-section">
      <div style={styles.modelTitle} id={`data-types-${createIdFromName(modelName)}`}>
        DataTypes: {modelName}
      </div>
      {customDataTypes.length > 0 ? (
        customDataTypes.map((itemDef: any) => renderItemDefinition(itemDef))
      ) : (
        <EmptyState variant={EmptyStateVariant.small}>
          <EmptyStateIcon icon={CubesIcon} />
          <Title headingLevel="h4" size="lg">
            No Custom Data Types
          </Title>
          <EmptyStateBody>
            This DMN model does not define any custom data types.
          </EmptyStateBody>
        </EmptyState>
      )}
    </div>
  );
};
