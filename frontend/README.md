# Dosa UI

Minimal control panel for digital signage PoC. Talks directly to a local n8n instance via webhooks.

## Development

```bash
npm i
npm run dev
```

## Docker

```bash
docker build -t dosa-ui .
```

### docker-compose example

```yaml
version: '3'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - '5678:5678'
  dosa-ui:
    build: .
    ports:
      - '8080:80'
```

The UI expects the following webhook endpoints on n8n:

- `${VITE_N8N_GENERATE_PATH}` (default `/webhook/signage-generate`)
- `${VITE_N8N_STATUS_PATH}` (default `/webhook/signage-status`)
- `${VITE_N8N_BUILD_PATH}` (default `/webhook/signage-build`)

## TODO

- Wire real n8n endpoints
- Connect preview images from n8n
- Replace dummy mp4 with real
- Add error overlay
