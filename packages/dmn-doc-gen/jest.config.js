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

const config = require("@kie-tools/jest-base/jest.config");
module.exports = {
  ...config,
  testEnvironment: "jsdom", // Important for React component testing
  moduleNameMapper: {
    // Add any specific module mappings if needed, e.g., for CSS or SVG files
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/tests/__mocks__/fileMock.js",
  },
  // Add setupFilesAfterEnv if you need to configure testing library or other test setup
  // setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
};
