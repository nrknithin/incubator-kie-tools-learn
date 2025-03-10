<!--
   Licensed to the Apache Software Foundation (ASF) under one
   or more contributor license agreements.  See the NOTICE file
   distributed with this work for additional information
   regarding copyright ownership.  The ASF licenses this file
   to you under the Apache License, Version 2.0 (the
   "License"); you may not use this file except in compliance
   with the License.  You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing,
   software distributed under the License is distributed on an
   "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
   KIND, either express or implied.  See the License for the
   specific language governing permissions and limitations
   under the License.
-->

# Example :: SonataFlow Greeting

This example contains two simple greeting workflow services.
The services are described using both JSON and YAML formats as defined in the
[CNCF Serverless Workflow specification](https://github.com/serverlessworkflow/specification).

The workflow expects as JSON input containing the name of the person to greet, and the language in
which to greet them in (see details in the [Submit a request](#Submit-a-request) section).

The workflow starts with a SWITCH state, which is like a gateway. The switch state
decides which language to greet the person in based on the workflow input "language" parameter.
Depending on the language the workflow then injects the language-based greeting via RELAY states.
Relay states are just "pass" states which do not execute any functions and only have the ability
to inject data into the workflow.
The inject states then transition to the OPERATION state which call a "sysout" function passing it
input parameter containing the greeting and the name of the person to greet: "$.greeting $.name".
The function then prints out the greeting to the console.

## Installing and Running

### Prerequisites

You will need:

- Java 17 installed
- Environment variable JAVA_HOME set accordingly
- Maven 3.9.6 installed

When using native image compilation, you will also need:

- [GraalVM](https://www.graalvm.org/downloads/) 20.3+ installed
- Environment variable GRAALVM_HOME set accordingly
- Note that GraalVM native image compilation typically requires other packages (glibc-devel, zlib-devel and gcc) to be installed too. You also need 'native-image' installed in GraalVM (using 'gu install native-image'). Please refer to [GraalVM installation documentation](https://www.graalvm.org/docs/reference-manual/aot-compilation/#prerequisites) for more details.

### Compile and Run in Local Dev Mode

```sh
mvn clean package quarkus:dev
```

### Compile and Run in JVM mode

```sh
mvn clean package
java -jar target/quarkus-app/quarkus-run.jar
```

or on Windows

```sh
mvn clean package
java -jar target\quarkus-app\quarkus-run.jar
```

### Compile and Run using Local Native Image

Note that this requires GRAALVM_HOME to point to a valid GraalVM installation

```sh
mvn clean package -Pnative
```

To run the generated native executable, generated in `target/`, execute

```sh
./target/sw-quarkus-greeting-{version}-runner
```

### Submit a request

The service based on the JSON workflow definition can be access by sending a request to http://localhost:8080/jsongreet'
with following content

```json
{
  "name": "John",
  "language": "English"
}
```

Complete curl command can be found below:

```sh
curl -X POST -H 'Content-Type:application/json' -H 'Accept:application/json' -d '{"name": "John", "language": "English"}' http://localhost:8080/jsongreet
```

Log after curl executed:

```json
{
  "id": "541a5363-1667-4f6d-a8b4-1299eba81eac",
  "workflowdata": { "name": "John", "language": "English", "greeting": "Hello from JSON Workflow, " }
}
```

In Quarkus you should see the log message printed:

```text
Hello from JSON Workflow, John
```

If you would like to greet the person in Spanish, we need to pass the following data on workflow start:

```json
{
  "name": "John",
  "language": "Spanish"
}
```

Complete curl command can be found below:

```sh
curl -X POST -H 'Content-Type:application/json' -H 'Accept:application/json' -d '{"name": "John", "language": "Spanish"}' http://localhost:8080/jsongreet
```

In Quarkus you should now see the log message printed:

```text
Saludos desde JSON Workflow, John
```

Similarly, the service based on the YAML workflow definition can be access by sending a request to http://localhost:8080/yamlgreet'
using the same content:

```json
{
  "name": "John",
  "language": "English"
}
```

Complete curl command can be found below:

```sh
curl -X POST -H 'Content-Type:application/json' -H 'Accept:application/json' -d '{"name": "John", "language": "English"}' http://localhost:8080/yamlgreet
```

In Quarkus you should see the log message:

```text
Hello from YAML Workflow, John
```

You can also change the language parameter value to "Spanish" to get the greeting in Spanish.

---

Apache KIE (incubating) is an effort undergoing incubation at The Apache Software
Foundation (ASF), sponsored by the name of Apache Incubator. Incubation is
required of all newly accepted projects until a further review indicates that
the infrastructure, communications, and decision making process have stabilized
in a manner consistent with other successful ASF projects. While incubation
status is not necessarily a reflection of the completeness or stability of the
code, it does indicate that the project has yet to be fully endorsed by the ASF.

Some of the incubating project’s releases may not be fully compliant with ASF
policy. For example, releases may have incomplete or un-reviewed licensing
conditions. What follows is a list of known issues the project is currently
aware of (note that this list, by definition, is likely to be incomplete):

- Hibernate, an LGPL project, is being used. Hibernate is in the process of
  relicensing to ASL v2
- Some files, particularly test files, and those not supporting comments, may
  be missing the ASF Licensing Header

If you are planning to incorporate this work into your product/project, please
be aware that you will need to conduct a thorough licensing review to determine
the overall implications of including this work. For the current status of this
project through the Apache Incubator visit:
https://incubator.apache.org/projects/kie.html
