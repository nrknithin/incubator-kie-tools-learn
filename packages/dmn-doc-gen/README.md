# DMN Document Generator (`@kie-tools/dmn-doc-gen`)

This package provides utilities to generate documentation from DMN models, including PDF export and a React component for previewing. It is part of the Apache KIE Tools monorepo.

## Features

- **PDF Generation (Web):** Generate a PDF document from a DMN model directly in the browser.
- **PDF Generation (Node.js):** Generate a PDF document in a Node.js environment (e.g., for VS Code extensions).
- **React Preview Component:** A React component to visually preview the DMN model's content as it would appear in the PDF.

## Installation

This package is consumed as part of the `kie-tools` monorepo. Typically, you would depend on it using the `workspace:*` protocol if you are also within the monorepo:

```json
{
  "dependencies": {
    "@kie-tools/dmn-doc-gen": "workspace:*"
  }
}
```

## Usage

The `DocumentPreview` component aims to render a DMN model in a structured format suitable for documentation, including sections like Cover Page, Table of Contents, DRD diagrams, DRG Element details (with Boxed Expressions), and DataTypes. This structure is designed to be eventually translated into a PDF document.

### Exported Members

- `handleDownloadWeb(definition: DmnLatestModel): Promise<Blob>`:
  Asynchronously generates a PDF in the browser and returns it as a Blob.
  - `definition`: The DMN model object, typically obtained from `@kie-tools/dmn-marshaller`.

- `handleDownloadNode(definition: DmnLatestModel): Promise<void>`:
  Asynchronously generates a PDF in a Node.js environment and prompts the user for a save location.
  - `definition`: The DMN model object.

- `DocumentPreview: React.FC<DocumentPreviewProps>`:
  A React component to preview the DMN document, rendering it in a structured multi-section format (Cover, TOC, Models, DRG Elements, DataTypes).
  - `DocumentPreviewProps`:
    - `definition: DmnLatestModel`: The DMN model object.
    - `showDownload?: boolean`: If true, shows a download button (defaults to false).
    - `subtitle?: string`: Optional subtitle for the cover page (e.g., "Banking").
    - `modelNames?: string[]`: Optional array of model names for the cover page.

### Example: Using `DocumentPreview`

```tsx
import { DocumentPreview, DocumentPreviewProps } from "@kie-tools/dmn-doc-gen";
import { DmnLatestModel } // ... import from dmn-marshaller or have your model object

// Assuming 'myDmnModel' is your DMN definition object
const MyComponent = () => {
  const dmnModel: any /* DmnLatestModel */ = { /* ... your DMN model object ... */ };

  return (
    <DocumentPreview definition={dmnModel} showDownload={true} />
  );
};
```

### Example: Using `handleDownloadWeb`

```typescript
import { handleDownloadWeb } from "@kie-tools/dmn-doc-gen";
import { DmnLatestModel } // ... import from dmn-marshaller

async function downloadMyDmn(dmnModel: any /* DmnLatestModel */) {
  try {
    const blob = await handleDownloadWeb(dmnModel);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (dmnModel.definitions.name || "dmn-document") + ".pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download DMN PDF:", error);
  }
}
```

**Note:** The actual rendering of DMN diagrams and boxed expressions within the generated PDF and preview component relies on `@kie-tools/dmn-editor-standalone` and `@kie-tools/boxed-expression-component`. The PDF generation logic is currently a placeholder and will be fully implemented to leverage these components.
