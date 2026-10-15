# Provenance of the Todoist API definition

`todoist-openapi.json` in this folder is Doist's own OpenAPI document for the Todoist API v1, used unmodified.

- Source: https://developer.todoist.com/openapi.json
- Retrieved: 2026-10-15
- OpenAPI version: 3.1.0; `info.version`: 1
- Size: 1,244,086 bytes; SHA-256: `a763d4d454977d48f134a68d6a7a0fcc4860712c8ef04766b4931120628d8b3c`

Nothing in the definition was edited. Every correction to how the generator reads it lives in `.sdk/model/guide/guide.aontu` and `.sdk/model/project.aontu`, so the definition can be replaced with a newer copy and the corrections reapplied.
