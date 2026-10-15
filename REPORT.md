# Report: building a Todoist SDK with the Voxgig SDK generator

Arda Çankaya, 15 October 2026 · Repository: https://github.com/technomonkey-7/todoist-sdk (MIT)

## In short

I generated unofficial Todoist clients for **TypeScript, Python and Go**, plus a **CLI** and an **MCP server**, from the OpenAPI definition Todoist publishes. Then I corrected how the generator read that definition and tested the result against the live Todoist API. The [README](README.md) shows how to install and use it.

- **It works.** Through the TypeScript SDK, against the live API: full create, read, update and delete on projects, tasks and labels; create, list, update and delete on comments; create and list on sections. Claude Code can drive the MCP server.
- **It needed shaping.** Out of the box the SDK had 51 entities, many named after internal schemas, no `update` on any core resource, and no authentication, and its offline tests still passed. About 250 lines of corrections in the generator's guide file brought it to 34 entities and full CRUD, without editing the definition or any generated code.
- **25 findings.** 14 look new, 5 are already tracked upstream (fully or in part), 4 relate to open issues, and 2 are things that worked well. Most come from the generator's templates and tools rather than from Todoist.
- **Time:** my own time ran a little over the 30-minute time box, because of the issues found along the way; Claude Code did the hands-on work.

**Why Todoist:** it is not in the voxgig-sdk catalogue, and a free account gives an API token, so I could test everything live. Todoist (the company, formerly Doist) publishes official SDKs for TypeScript and Python, an official CLI and a hosted MCP server, but nothing for Go. Its definition is produced by FastAPI, which made it a good test of how the generator reads framework-generated definitions.

## How it went, step by step

1. **Scaffold.** On Windows, `npm create @voxgig/sdkgen` stopped with `spawn npm ENOENT` and left a half-built project. Scaffolding again with `--no-install` and running its three npm steps by hand got past it; after that, adding targets and features worked.
2. **First generation.** `npm run generate` then failed on Windows because the scaffold's own include paths did not resolve. With a local fix it worked, and every later change regenerated in about 7 seconds. apidef's warnings were clear and named the exact routes that collided, but it said nothing about the two bigger problems: no authentication, and Todoist's Task spread over five entities.
3. **Shaping.** This is the toolchain's strongest part. In one readable file I regrouped resources, turned a misread "create" into "update", and added actions such as `close`. Each change regenerated all five outputs in seconds. Two of the moves I needed most are not in the guide reference; I learned them from the schema.
4. **Generated code and docs.** The tests type-check and run the README's code examples, which caught a TypeScript typing problem before I published. Identity needed four settings; without them the LICENSE names Voxgig.
5. **Testing.** The offline tests passed on Windows the first time, but they check the SDK against its own model, so they could not see what was wrong. The live tests could, and they taught me the most. Before running them I had to switch off writes that would have changed my account. The first run failed on every call because of where the key file must live. Claude Code then found a bug in the MCP server that my own checks had missed.

## What to fix first

| # | What happens | Who is affected | Upstream |
|---|---|---|---|
| F3, F4 | On Windows the quick start fails twice: `npm create` cannot start npm, then `npm run generate` cannot find its own files. | Every Windows user | Known: [create-sdkgen#58](https://github.com/voxgig/create-sdkgen/issues/58), [create-sdkgen#62](https://github.com/voxgig/create-sdkgen/issues/62). For #62 I confirmed that adding `./` to the scaffold's includes is enough. |
| F22 | The live tests write to the user's real account through endpoints that have no "create" step. On Todoist that would change notification settings and open a Stripe checkout. | Every generated SDK | New |
| F18 | The MCP server's list tool returns data in a shape the MCP spec does not allow, so Claude Code rejects it. | Every generated MCP server | New |
| F12 | The live tests look for the API key file in a different folder in each language. The READMEs say "project root", and the result is a silent 401. | Every generated SDK | New |
| F17 | The Python and Go live tests are older than the TypeScript ones: they send placeholder test data to the real API. | Every generated SDK | New |
| F19 | In TypeScript, `create()` demands fields the server fills in, such as `id`, so normal code does not compile. | APIs built with FastAPI and similar | Known: [sdkgen#215](https://github.com/voxgig/sdkgen/issues/215) |
| F5 | If the definition does not declare authentication, the SDK is built without it and no warning is shown. | APIs built with FastAPI and similar | New |
| F6, F7 | Resources are split by internal schema names, and `POST /tasks/{id}` is read as "create" instead of "update". | APIs built with FastAPI and similar | F6 partly [apidef#103](https://github.com/voxgig/apidef/issues/103) (closed, still happens); F7 new |

The other 15 findings, 13 smaller issues (mostly in documentation and the test runners) and the 2 things that worked well, are in [report/FINDINGS.md](report/FINDINGS.md). Each issue there has steps to reproduce, the cause in the generator's code, and a suggested fix.

**Specific to my computer?** No. Where a finding comes from the generator's templates, I checked that the same code is in [buggie-sdk](https://github.com/voxgig-sdk/buggie-sdk), an SDK Voxgig generated and published. I also checked every finding against the issue trackers of sdkgen, apidef, create-sdkgen, model and docgen. F3 and F4 hit every Windows user, and other contributors have reported them. The rows marked "APIs built with FastAPI" depend on how an API's definition is written.

## What worked well

- **One model, five outputs.** A correction made once updates the TypeScript, Python and Go SDKs, the CLI and the MCP server together, in about 7 seconds.
- **The guide file.** Regrouping resources, turning a "create" into an "update" and adding actions all fit in one file, kept separate from the API definition.
- **Clear warnings.** When something collided, apidef named the exact routes.
- **Tested documentation.** Every TypeScript, Python and Go example in the README is type-checked and run offline by the test suite.

## How I checked it

- **Live tests on a real account, with nothing changed.** Before and after every run I saved a snapshot of the account's projects, sections, labels and active tasks and compared the two. No existing record changed and nothing was left behind; the project and task the MCP demo created were deleted afterwards.
- **Each surface on its own:** a 16-step scenario through the TypeScript SDK (16/16 passed), the README example, the CLI, and Claude Code using the MCP server.
- **Every failure explained.** Each of the 44 failing tests in the generated TypeScript live suite has a known cause. None is a defect in my corrections, though 8 of them (F15) appear because the corrections add search and filter actions to `list`.

The scripts for all of this are in [report/scripts](report/scripts).

## Notes

- Generation on Windows used a one-line local fix (F4). It changes nothing in the output: without it, and with `./` added to the includes instead, the generated files are identical.
- The repository's Documentation workflow is switched off: docgen's text check fails on a typo in Todoist's own definition (F24). The SDK test workflow passes on GitHub.
- Checked on the latest published packages on 15 October 2026: create-sdkgen 0.30.7, @voxgig/sdkgen 4.34.7, @voxgig/apidef 8.25.2, @voxgig/docgen 0.30.1.
- If it helps, I can open the new findings as issues.
