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
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DocumentPreview, DocumentPreviewProps } from "./DocumentPreview";
// import { DmnLatestModel } from "@kie-tools/dmn-marshaller";

// Mock the handleDownloadWeb function
jest.mock("./handleDownloadWeb", () => ({
  handleDownloadWeb: jest.fn().mockResolvedValue(new Blob(["pdf content"], { type: "application/pdf" })),
}));

const mockDmnDefinition: any /* DmnLatestModel */ = {
  definitions: {
    "@_id": "_test_id",
    "@_name": "Test DMN",
    "@_namespace": "https://kie.apache.org/dmn/test",
    drgElement: [
      {
        "@_id": "_decision_test",
        "@_name": "Test Decision",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        __$$element: "decision",
      },
    ],
  },
};

describe("DocumentPreview Component", () => {
  const getProps = (
    overrides?: Partial<DocumentPreviewProps>
  ): DocumentPreviewProps => ({
    definition: mockDmnDefinition,
    showDownload: false,
    ...overrides,
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Clean up any appended anchor tags by the download mock
    document.body.innerHTML = '';
  });

  test("renders the component with DMN name", () => {
    render(<DocumentPreview {...getProps()} />);
    expect(screen.getByText(/DMN Document Preview: Test DMN/)).toBeInTheDocument();
    expect(screen.getByText(/DRD \(Decision Requirements Diagram\)/)).toBeInTheDocument();
    expect(screen.getByText(/Boxed Expressions/)).toBeInTheDocument();
  });

  test("does not show download button by default", () => {
    render(<DocumentPreview {...getProps()} />);
    expect(screen.queryByRole("button", { name: /Download as PDF/i })).not.toBeInTheDocument();
  });

  test("shows download button when showDownload is true", () => {
    render(<DocumentPreview {...getProps({ showDownload: true })} />);
    expect(screen.getByRole("button", { name: /Download as PDF/i })).toBeInTheDocument();
  });

  test("calls handleDownloadWeb and attempts download when button is clicked", async () => {
    // Mock URL.createObjectURL and URL.revokeObjectURL
    global.URL.createObjectURL = jest.fn(() => "mock_url");
    global.URL.revokeObjectURL = jest.fn();
    
    render(<DocumentPreview {...getProps({ showDownload: true })} />);
    const downloadButton = screen.getByRole("button", { name: /Download as PDF/i });
    
    fireEvent.click(downloadButton);

    const { handleDownloadWeb } = require("./handleDownloadWeb");
    expect(handleDownloadWeb).toHaveBeenCalledWith(mockDmnDefinition);
    
    // Check if the download link was created and clicked (indirectly)
    // We can't directly test document.createElement('a').click() easily in JSDOM
    // without more complex spies or checking document.body for the temporary anchor.
    // However, the mock being called is a good indication.
    // If we want to be more thorough:
    // await screen.findByRole('link', {name: 'Test DMN.pdf'}); // This won't work directly as it's removed.
    
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith("mock_url");
  });

  test("renders placeholder for DMN Editor", () => {
    render(<DocumentPreview {...getProps()} />);
    expect(screen.getByText(/\[DMN Editor for DRD rendering will be integrated here.\]/)).toBeInTheDocument();
  });

  test("renders placeholder for Boxed Expression Components", () => {
    render(<DocumentPreview {...getProps()} />);
    expect(screen.getByText(/\[Boxed Expression Components will be rendered here for each relevant DRG element.\]/)).toBeInTheDocument();
  });
});
