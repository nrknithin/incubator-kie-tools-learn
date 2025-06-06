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

import { Form, FormGroup, FormHelperText } from "@patternfly/react-core/dist/js/components/Form";

import { TextInput } from "@patternfly/react-core/dist/js/components/TextInput";
import * as React from "react";
import { useEffect, FormEvent, useCallback, useMemo } from "react";
import { ValidatedOptions } from "@patternfly/react-core/dist/js/helpers/constants";
import { useEditorEnvelopeLocator } from "../../envelopeLocator/EditorEnvelopeLocatorContext";
import { UrlType, useImportableUrl } from "../hooks/ImportableUrlHooks";
import { HelperText, HelperTextItem } from "@patternfly/react-core/dist/js/components/HelperText";

export function ImportFromUrlForm(props: {
  allowedTypes?: UrlType[];
  importingError?: string;
  onChange: (url: string) => void;
  onSubmit: () => void;
  onValidate?: (isValid: ValidatedOptions) => void;
  url?: string;
  urlInputRef?: React.RefObject<HTMLInputElement>;
}) {
  const { onValidate } = props;
  const editorEnvelopeLocator = useEditorEnvelopeLocator();
  const importableUrl = useImportableUrl({
    isFileSupported: (path: string) => editorEnvelopeLocator.hasMappingFor(path),
    urlString: props.url,
    allowedUrlTypes: props.allowedTypes,
  });

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (importableUrl.error) {
        return;
      }

      props.onSubmit();
    },
    [importableUrl.error, props]
  );

  const validatedOption = useMemo(() => {
    if (!props.url) {
      return ValidatedOptions.default;
    }

    if (importableUrl.error || props.importingError) {
      return ValidatedOptions.error;
    }

    return ValidatedOptions.success;
  }, [props.url, props.importingError, importableUrl.error]);

  const displayError = useMemo(() => {
    if (importableUrl.error) {
      return importableUrl.error;
    }

    if (props.importingError) {
      return `Error: ${props.importingError}`;
    }

    return "";
  }, [importableUrl.error, props.importingError]);

  useEffect(() => {
    onValidate?.(validatedOption);
  }, [validatedOption, onValidate]);

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup fieldId="import-url-form-input">
        <TextInput
          ref={props.urlInputRef}
          id={"import-url-form-input"}
          ouiaId={"import-url-form-input"}
          validated={validatedOption}
          isRequired={true}
          placeholder={"URL"}
          value={props.url}
          onChange={(_event, val) => props.onChange(val)}
        />
        {validatedOption === "error" ? (
          <FormHelperText>
            <HelperText>
              <HelperTextItem variant="error">{displayError}</HelperTextItem>
            </HelperText>
          </FormHelperText>
        ) : (
          <FormHelperText>
            <HelperText>
              <HelperTextItem variant="success"></HelperTextItem>
            </HelperText>
          </FormHelperText>
        )}
      </FormGroup>
    </Form>
  );
}
