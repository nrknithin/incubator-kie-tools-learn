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
// Assuming DmnLatestModel will be the type for the full DMN definition
// import { DmnLatestModel } from "@kie-tools/dmn-marshaller";

export interface CoverPageProps {
  // Assuming 'definition' could be an array if multiple models are supported,
  // or a single model object. For now, let's assume a single model object
  // and model names can be derived or passed explicitly if needed.
  definition: any; // DmnLatestModel;
  subtitle?: string; // e.g., "Banking"
  modelNames?: string[]; // Comma-separated list of model names
}

export const CoverPage: React.FC<CoverPageProps> = ({ definition, subtitle, modelNames }) => {
  const currentDate = new Date().toLocaleDateString();

  // Determine model names to display
  let displayModelNames = "";
  if (modelNames && modelNames.length > 0) {
    displayModelNames = modelNames.join(", ");
  } else if (definition && definition.definitions && definition.definitions["@_name"]) {
    // Fallback to the name from the DMN definition if a single model is passed
    displayModelNames = definition.definitions["@_name"];
  } else {
    displayModelNames = "N/A";
  }

  // Basic styling - will need refinement with PatternFly or standard KIE styles
  const styles: Record<string, React.CSSProperties> = {
    coverPage: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh", // Simulate a page
      textAlign: "center",
      padding: "20px",
      borderBottom: "1px solid #eee", // Separator
      marginBottom: "20px",
    },
    title: {
      fontSize: "2.5em",
      fontWeight: "bold",
      marginBottom: "0.5em",
    },
    subtitle: {
      fontSize: "1.8em",
      marginBottom: "1.5em",
      color: "#555",
    },
    metadata: {
      fontSize: "1em",
      color: "#777",
    },
    metadataItem: {
      marginBottom: "0.5em",
    }
  };

  return (
    <div style={styles.coverPage} data-testid="cover-page">
      <div style={styles.title}>Apache KIE™ – DMN Model Documentation</div>
      {subtitle && <div style={styles.subtitle} data-testid="cover-page-subtitle">{subtitle}</div>}
      <div style={styles.metadata}>
        <div style={styles.metadataItem} data-testid="cover-page-generated-on">
          Generated on: {currentDate}
        </div>
        <div style={styles.metadataItem} data-testid="cover-page-generated-from">
          Generated from: {displayModelNames}
        </div>
      </div>
    </div>
  );
};
