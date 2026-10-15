# Report: building a Todoist SDK with the Voxgig SDK generator

Arda Çankaya, 15 October 2026

## In short

I generated unofficial Todoist clients for **TypeScript, Python and Go**, plus a **CLI** and an **MCP server**, from Doist's own OpenAPI definition. I corrected how the generator read the definition, then tested the result against the live Todoist API. The [README](README.md) shows how to install and use them.

- **It works.** Projects, tasks, sections, comments and labels can be created, read, updated and deleted from the SDK, and Claude Code can drive the MCP server.
- **It needed shaping.** Out of the box the SDK had 51 entities named after internal schemas, no `update`, and no authentication, and its offline tests still passed. About 250 lines of corrections in the generator's guide file brought it to 34 entities and full CRUD, without editing the definition or any generated code.
- **22 findings.** 13 look new, 4 are already tracked upstream (fully or in part), 3 relate to open issues, and 2 are things that worked well. Most affect every SDK the generator makes, not just this one.
- **Time:** about 25 to 30 minutes of my own time; Claude Code did the hands-on work.

## What to fix first

| # | What happens | Who is affected | Upstream |
|---|---|---|---|
| F3, F4 | On Windows the quick start fails twice: `npm create` cannot start npm, then `npm run generate` cannot find its own files. | Every Windows user | Known: create-sdkgen #58, #62. For #62 I confirmed that adding `./` to the scaffold's includes is enough. |
| F22 | The live tests write to the user's real account through endpoints that have no "create" step. On Todoist that would change notification settings and open a Stripe checkout. | Every generated SDK | New |
| F18 | The MCP server's list tool returns data in a shape the MCP spec does not allow, so Claude Code rejects it. | Every generated MCP server | New |
| F12 | The live tests look for the API key file in a different folder in each language. The README says "project root", and the result is a silent 401. | Every generated SDK | New |
| F17 | The Python and Go live tests are older than the TypeScript ones: they send placeholder test data to the real API. | Every generated SDK | New |
| F19 | In TypeScript, `create()` demands fields the server fills in, such as `id`, so normal code does not compile. | APIs built with FastAPI and similar | Known: sdkgen #215 |
| F5 | If the definition does not declare authentication, the SDK is built without it and no warning is shown. | APIs built with FastAPI and similar | New |
| F6, F7 | Resources are split by internal schema names, and `POST /tasks/{id}` is read as "create" instead of "update". | APIs built with FastAPI and similar | F6 partly apidef #103 (closed, still happens); F7 new |

The other 12, mostly small documentation and test-runner issues, are in [report/FINDINGS.md](report/FINDINGS.md). Each finding there has steps to reproduce, the cause in the generator's code, and a suggested fix.

**Specific to my computer?** No. I checked each finding against the code of [buggie-sdk](https://github.com/voxgig-sdk/buggie-sdk), an SDK Voxgig generated and published, and against the issue trackers. The Windows problems hit every Windows user, and others have reported them. The rest come from the generator's templates and appear in buggie-sdk as well, except the four marked "APIs built with FastAPI", which depend on how the API's definition is written.

## What worked well

- **One model, five outputs.** A correction made once updates the TypeScript, Python and Go SDKs, the CLI and the MCP server together, in about 7 seconds.
- **The guide file.** Regrouping resources, turning a "create" into an "update" and adding actions such as `close` all fit in one readable file, kept separate from the API definition.
- **Clear warnings.** When something was wrong, apidef named the exact routes.
- **Tested documentation.** Every code example in the README is compiled and run by the test suite. That is how I caught F19 before publishing.

## How I checked it

- **Live tests on a real account, with nothing changed.** Before and after every run I saved a snapshot of the account and compared the two. Nothing was left behind and no existing data changed.
- **Each surface on its own:** a 16-step scenario through the TypeScript SDK (16/16 passed), the README example, the CLI, and Claude Code using the MCP server.
- **Every failure explained.** Each of the 44 failing tests in the generated TypeScript live suite has a cause; none comes from my corrections.

The scripts for all of this are in [report/scripts](report/scripts).

## Notes

- Generation on Windows used a one-line local fix (F4). It changes nothing in the output: I confirmed the generated files are identical without it.
- Checked on the latest published packages on 15 October 2026: create-sdkgen 0.30.7, @voxgig/sdkgen 4.34.7, @voxgig/apidef 8.25.2.
- If it helps, I can open the new findings as issues.
