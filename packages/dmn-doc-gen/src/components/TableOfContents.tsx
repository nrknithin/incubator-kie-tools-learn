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
// import { DmnLatestModel, DmnDiDecisionService, DmnDiDmnElement } from "@kie-tools/dmn-marshaller"; // For typing

export interface TableOfContentsProps {
  definition: any; // DmnLatestModel
}

const createSlug = (text: string = "") => { // Add default value for text
  return String(text).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ definition }) => {
  const styles: Record<string, React.CSSProperties> = {
    toc: {
      padding: "20px",
      borderBottom: "1px solid #eee",
      marginBottom: "20px",
    },
    tocTitle: {
      fontSize: "2em",
      fontWeight: "bold",
      marginBottom: "1em",
    },
    tocList: {
      listStyleType: "none",
      paddingLeft: "0",
    },
    tocListItem: {
      marginBottom: "0.5em",
    },
    tocSubList: {
      listStyleType: "none",
      paddingLeft: "20px",
      marginTop: "0.5em",
    },
    tocLink: {
      textDecoration: "none",
      color: "#007bff", // Standard link color
    },
  };

  const modelName = definition?.definitions?.["@_name"] || "Unnamed Model";
  
  // Ensure diagrams are correctly accessed, even if dmnDI or dmndi:DMNDiagram is missing
  const diagrams = definition?.dmnDI?.["dmndi:DMNDiagram"] || [];
  
  const drgElements = definition?.definitions?.drgElement || [];
  const itemDefinitions = definition?.definitions?.itemDefinition || [];

  const inputs = drgElements.filter((el: any) => el.__$$element === "inputData");
  const decisions = drgElements.filter((el: any) => el.__$$element === "decision");
  const bkms = drgElements.filter((el: any) => el.__$$element === "businessKnowledgeModel");
  const customDataTypes = itemDefinitions.filter((itemDef: any) => 
    !(itemDef.typeRef?.__$$text?.startsWith("feel:")) && 
    !(typeof itemDef.typeRef === 'string' && itemDef.typeRef.startsWith("feel:"))
  );


  return (
    <div style={styles.toc} data-testid="table-of-contents">
      <div style={styles.tocTitle}>Table of Contents</div>
      <ul style={styles.tocList}>
        {/* Model Name and its DRDs */}
        <li style={styles.tocListItem}>
          <a href={`#model-${createSlug(modelName)}`} style={styles.tocLink}>
            Model: {modelName}
          </a>
          {diagrams.length > 0 && (
            <ul style={styles.tocSubList}>
              {diagrams.map((diag: any, index: number) => (
                <li key={diag["@_id"] || index} style={styles.tocListItem}>
                  <a href={`#drd-${createSlug(diag["@_name"] || `drd-${index}`)}`} style={styles.tocLink}>
                    DRD: {diag["@_name"] || `DRD ${index + 1}`}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* DRG Elements Section Link */}
        {(inputs.length > 0 || decisions.length > 0 || bkms.length > 0) && (
          <li style={styles.tocListItem}>
            <a href={`#drg-elements-${createSlug(modelName)}`} style={styles.tocLink}>
              DRG Elements ({modelName})
            </a>
            <ul style={styles.tocSubList}>
              {inputs.length > 0 && (
                <li style={styles.tocListItem}>
                  <a href={`#inputs-${createSlug(modelName)}`} style={styles.tocLink}>Inputs</a>
                  <ul style={styles.tocSubList}>
                    {inputs.map((el: any) => (
                       <li key={el["@_id"]} style={styles.tocListItem}>
                         <a href={`#drg-${createSlug(el["@_id"])}`} style={styles.tocLink}>{el["@_name"]}</a>
                       </li>
                    ))}
                  </ul>
                </li>
              )}
              {decisions.length > 0 && (
                <li style={styles.tocListItem}>
                  <a href={`#decisions-${createSlug(modelName)}`} style={styles.tocLink}>Decisions</a>
                   <ul style={styles.tocSubList}>
                    {decisions.map((el: any) => (
                       <li key={el["@_id"]} style={styles.tocListItem}>
                         <a href={`#drg-${createSlug(el["@_id"])}`} style={styles.tocLink}>{el["@_name"]}</a>
                       </li>
                    ))}
                  </ul>
                </li>
              )}
              {bkms.length > 0 && (
                <li style={styles.tocListItem}>
                  <a href={`#bkms-${createSlug(modelName)}`} style={styles.tocLink}>Business Knowledge Models</a>
                   <ul style={styles.tocSubList}>
                    {bkms.map((el: any) => (
                       <li key={el["@_id"]} style={styles.tocListItem}>
                         <a href={`#drg-${createSlug(el["@_id"])}`} style={styles.tocLink}>{el["@_name"]}</a>
                       </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          </li>
        )}

        {/* DataTypes Section Link */}
        {customDataTypes.length > 0 && (
           <li style={styles.tocListItem}>
            <a href={`#data-types-${createSlug(modelName)}`} style={styles.tocLink}>
              DataTypes ({modelName})
            </a>
            <ul style={styles.tocSubList}>
              {customDataTypes.map((el: any) => (
                 <li key={el["@_id"]} style={styles.tocListItem}>
                   <a href={`#type-${createSlug(el["@_id"])}`} style={styles.tocLink}>{el["@_name"]}</a>
                 </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
      <p><i>(Note: Links are placeholders for actual navigation.)</i></p>
    </div>
  );
};
