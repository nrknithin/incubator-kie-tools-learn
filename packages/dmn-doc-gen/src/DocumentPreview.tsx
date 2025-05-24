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
// import { DmnLatestModel } from "@kie-tools/dmn-marshaller"; // Assuming this type
// import { DmnEditor } from "@kie-tools/dmn-editor"; // Or specific read-only components
// import { BoxedExpressionComponent } from "@kie-tools/boxed-expression-component";
import { handleDownloadWeb } from "./handleDownloadWeb";
import { CoverPage } from "./components/CoverPage";
import { TableOfContents } from "./components/TableOfContents";
import { ModelsSection } from "./components/ModelsSection";
import { DrgElementsSection } from "./components/DrgElementsSection";
import { DataTypesSection } from "./components/DataTypesSection";

export interface DocumentPreviewProps {
  definition: any; // DmnLatestModel;
  showDownload?: boolean;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ definition, showDownload = false }) => {
  const onDownload = async () => {
    try {
      const blob = await handleDownloadWeb(definition);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${definition.definitions.name || "dmn-document"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error during PDF download:", error);
      // Potentially show an error message to the user
    }
  };

  // Placeholder styles - actual styling would use PatternFly or other kie-tools conventions
  // const styles: Record<string, React.CSSProperties> = { /* ... styles ... */ };

  return (
    <div /* style={styles.container} */>
      <CoverPage definition={definition} />
      <TableOfContents definition={definition} />
      <ModelsSection definition={definition} />
      <DrgElementsSection definition={definition} />
      <DataTypesSection definition={definition} />

      {showDownload && (
        <button /* style={styles.button} */ onClick={onDownload}>
          Download as PDF
        </button>
      )}
    </div>
  );
};
