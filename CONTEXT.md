
# Dosa Project Context

This document provides a comprehensive overview of the Dosa project for AI agents to understand its purpose, architecture, and key components.

## Project Overview

**Dosa** stands for **Digital Outdoor Signage Automation**. It is a system designed to automate the creation and deployment of content for digital signage displays.

The project consists of two main parts:

1.  **Frontend (dosa-ui):** A React-based web application that serves as a control panel for managing the signage content.
2.  **Backend (n8n):** An `n8n` instance that automates the backend workflows for generating and building the final video content.

The frontend communicates with the n8n backend via webhooks.

## Frontend (dosa-ui)

The frontend is a single-page application that allows users to configure, generate, preview, and deploy digital signage content.

### Technology Stack

*   **Framework:** React
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** Zustand

### Workflow

The application guides the user through the following steps:

1.  **Configuration:** The user selects and configures the slides to be included in the final video. This includes enabling/disabling slides, setting their duration, and reordering them.
2.  **Generation:** The user initiates the content generation process, which triggers a webhook to the n8n backend.
3.  **Rendering:** The application polls the backend to monitor the status of the rendering job.
4.  **Preview:** Once the slides are rendered, the user can preview them in a grid format.
5.  **Deployment:** The user triggers the final build process, which creates the complete video.
6.  **Playback:** The final video is displayed in a player window.

### Key Components

*   `App.tsx`: The main application component that manages the overall workflow and renders different views based on the job status.
*   `useStore.ts`: The Zustand store that manages the application's state, including slide configurations, job status, and generated content.
*   `SlideConfigList.tsx`: A component for managing the list of configurable slides.
*   `GenerateButton.tsx`: The button that triggers the n8n `signage-generate` webhook.
*   `JobProgress.tsx`: A component that displays the progress of the rendering and building jobs.
*   `SlidePreviewGrid.tsx`: A component that displays a grid of the generated slide previews.
*   `DeployButton.tsx`: The button that triggers the n8n `signage-build` webhook.
*   `PlayerWindow.tsx`: A component that displays the final generated video.

### State Management (Zustand)

The `useStore` in `src/state/useStore.ts` is the single source of truth for the application's state. It includes:

*   `configSlides`: An array of slide configuration objects.
*   `jobId`: The ID of the current n8n job.
*   `jobStatus`: The current status of the job (`pending`, `rendering`, `ready`, `building`, `complete`).
*   `generatedSlides`: An array of the generated slide data.
*   `finalVideoUrl`: The URL of the final generated video.

## Backend (n8n)

The backend is an `n8n` instance that exposes several webhook endpoints to be called by the frontend.

### Webhook Endpoints

The frontend expects the following webhook endpoints to be available on the n8n instance:

*   **`VITE_N8N_GENERATE_PATH`** (default: `/webhook/signage-generate`): Initiates the slide generation process.
*   **`VITE_N8N_STATUS_PATH`** (default: `/webhook/signage-status`): Retrieves the status of the current job.
*   **`VITE_N8N_BUILD_PATH`** (default: `/webhook/signage-build`): Initiates the final video build process.

These endpoints are configured in the frontend's `.env` file.

## Development

To run the frontend locally, use the following commands:

```bash
npm i
npm run dev
```

## Docker

The frontend can be built into a Docker image using the provided `Dockerfile`. The `docker-compose.yml` example in the `frontend/README.md` shows how to run the frontend and an n8n instance together.

### Building the Docker Image

Before building the Docker image, you need to make sure all the dependencies are correctly installed and the `package-lock.json` file is generated.

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Install the `dayjs` library:**

    ```bash
    npm install dayjs
    ```

3.  **Build the Docker image:**

    ```bash
    docker build -t dosa-ui .
    ```

### Running the Docker Container

Once the image is built, you can run it as a container:

```bash
docker run -d -p 8080:80 --name dosa-ui-container dosa-ui
```

This will start the container in detached mode and map port 8080 on the host to port 80 in the container. You can then access the application at `http://localhost:8080`.


## Project Structure

```
C:/projects/dosa/
├───README.md
├───CONTEXT.md
├───.git/...
└───frontend/
    ├───.env.example
    ├───Caddyfile
    ├───Dockerfile
    ├───index.html
    ├───package.json
    ├───postcss.config.js
    ├───README.md
    ├───tailwind.config.js
    ├───tsconfig.json
    ├───vite.config.ts
    ├───public/
    │   └───player.html
    └───src/
        ├───App.tsx
        ├───index.css
        ├───main.tsx
        ├───api/
        │   ├───client.ts
        │   └───types.ts
        ├───components/
        │   ├───DeployButton.tsx
        │   ├───GenerateButton.tsx
        │   ├───JobProgress.tsx
        │   ├───SlideConfigList.tsx
        │   ├───SlidePreviewGrid.tsx
        │   └───SlideRow.tsx
        ├───player/
        │   └───PlayerWindow.tsx
        └───state/
            └───useStore.ts
```
