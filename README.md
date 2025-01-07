# Palantir AIP Foundry's Patient Drug Expenditure
Mission critical platform that classify structured medical information extracted from raw patient notes data while calculating the total medication cost per patient.

## Table of Contents

- [Introduction](#introduction)
- [Design](#design)
- [Features](#installation)
- [Installation](#installation)
- [References](#references)
- [License](#license)
## Introduction

A user can select a specific patient and it displays the name, dosage and the total cost of all medication taken.

## Design
Here's a solution designer created by Foundry's Solution Designer
![System](https://github.com/ShaiBrin/Palantir-MediMind/blob/main/my-osdk-app/design/Application%20development%20workflow.png)

Here's the data lineage.
![Data Lineage](https://github.com/ShaiBrin/Palantir-MediMind/blob/main/my-osdk-app/design/monocle-graph-components__graph__1lkhagp%20mon-graph.svg)

## Features
The Foundry's platform uses multiple features such as `Pipeline builder`, `Ontology Manager`, `Workshop Module`, `OSDK`, `Function Logic`, `Compute Modules`. 
The web application is built by using `OSDK` and the objects are fetched from `Ontology` and it calcualtes the total medication intake cost per patient.
It is built with `NextJS` accompanied by `Tailwind` and is hosted in `Vercel`. It uses `PostgresSQL` as database to store and fetch medication's prices found in the [Nation Average Drug Acquistion](https://data.medicaid.gov/dataset/a217613c-12bc-5137-8b3a-ada0e4dad1ff#api).

## Installation

To install and set up the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/ShaiBrin/Palantir-MediMind.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Palantir-MediMind
    ```
3. Change directory to my-osdk-app
   ```bash
    cd my-osdk-app
    ```
3. Install the required dependencies
    ```bash
    npm install
    ```
4. Run
    ```bash
    npm run dev
    ```

## References
1. [Nation Average Drug Acquistion](https://data.medicaid.gov/dataset/a217613c-12bc-5137-8b3a-ada0e4dad1ff#api)
2. [Video Demo](https://www.youtube.com/watch?v=xvXUtHxCL0s)
3. [MediMind - Computes Modules](https://github.com/ShaiBrin/Palantir-ComputeModules)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
