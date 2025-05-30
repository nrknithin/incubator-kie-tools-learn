/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {
  Job,
  JobStatus,
  BulkCancel,
  JobOperationResult,
  JobsSortBy,
} from "@kie-tools/runtime-tools-process-gateway-api/dist/types";
import { JobsManagementState } from "./JobsManagementApi";

export interface OnUpdateJobsManagementStateListener {
  onUpdate: (jobsManagementState: JobsManagementState) => void;
}

export interface UnSubscribeHandler {
  unSubscribe: () => void;
}

export interface JobsManagementChannelApi {
  jobList__initialLoad(filter: JobStatus[], orderBy: JobsSortBy): Promise<void>;
  jobList__applyFilter(filter: JobStatus[]): Promise<void>;
  jobList__bulkCancel(jobsToBeActioned: Job[]): Promise<BulkCancel>;
  jobList__cancelJob(job: Pick<Job, "id" | "endpoint">): Promise<JobOperationResult>;
  jobList__rescheduleJob(
    job: Job,
    repeatInterval: number | string,
    repeatLimit: number | string,
    scheduleDate: Date
  ): Promise<{ modalTitle: string; modalContent: string }>;
  jobList__sortBy(orderBy: JobsSortBy): Promise<void>;
  jobList__query(offset: number, limit: number): Promise<Job[]>;
  jobList__onUpdateJobsManagementState(listener: OnUpdateJobsManagementStateListener): Promise<UnSubscribeHandler>;
}
