# WorkspaceInvitationView entity test

import json
import os
import time

import pytest

from todoist_sdk.utility.voxgig_struct import voxgig_struct as vs
from todoist_sdk import TodoistSDK
from todoist_sdk.core import helpers
from todoist_sdk.config import shared_config
from todoist_sdk.feature.base_feature import TodoistBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class _FailHook(TodoistBaseFeature):
    def __init__(self):
        super().__init__()
        self.name = "failhook"
        self.unexpected = 0

    def init(self, ctx, options):
        pass

    def PreSpec(self, ctx):
        raise RuntimeError("workspace_invitation_view hook failed")

    def PreUnexpected(self, ctx):
        self.unexpected += 1



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestWorkspaceInvitationViewEntity:

    def test_should_create_instance(self):
        testsdk = TodoistSDK.test(None, None)
        ent = testsdk.WorkspaceInvitationView(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "workspace_invitation_view": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = TodoistSDK.test(seed, None)
        seen = list(base.WorkspaceInvitationView(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from todoist_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = TodoistSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.WorkspaceInvitationView(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_report_a_failed_stream(self):
        offline = {"net": {"offline": True}}
        with pytest.raises(Exception, match="offline"):
            list(TodoistSDK.test(offline, None).WorkspaceInvitationView(None).stream("list", None, None))

        quiet = {"ctrl": {"throw": False}}
        list(TodoistSDK.test(offline, None).WorkspaceInvitationView(None).stream("list", None, quiet))

        if "rbac" in (shared_config().get("feature") or {}):
            denied = TodoistSDK.test(
                None, {"feature": {"rbac": {"active": True, "deny": True}}})
            with pytest.raises(Exception) as err:
                list(denied.WorkspaceInvitationView(None).stream("list", None, None))
            assert "rbac_denied" == getattr(err.value, "code", None)

    def test_should_leave_the_callers_ctrl(self):
        explain = {}
        ctrl = {"explain": explain}
        list(TodoistSDK.test(None, None).WorkspaceInvitationView(None).stream("list", None, {"ctrl": ctrl}))
        assert ["explain"] == list(ctrl.keys())
        assert explain is ctrl["explain"] and 0 < len(explain)

    def test_should_fire_pre_unexpected(self):
        hook = _FailHook()
        client = TodoistSDK({"feature": {"test": {"active": True}}, "extend": [hook]})
        with pytest.raises(Exception, match="hook failed"):
            client.WorkspaceInvitationView(None).list(None, None)
        assert 0 < hook.unexpected

        fired = hook.unexpected
        assert client.WorkspaceInvitationView(None).list(None, {"throw": False}) is None
        assert fired < hook.unexpected

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = TodoistSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.WorkspaceInvitationView(None).list({"workspace_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _workspace_invitation_view_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "workspace_invitation_view." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # CREATE
        workspace_invitation_view_ref01_ent = client.WorkspaceInvitationView(None)
        workspace_invitation_view_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.workspace_invitation_view"), "workspace_invitation_view_ref01"))

        workspace_invitation_view_ref01_data = helpers.to_map(runner.entity_data(workspace_invitation_view_ref01_ent.create(workspace_invitation_view_ref01_data, None)))
        assert workspace_invitation_view_ref01_data is not None
        assert workspace_invitation_view_ref01_data["id"] is not None

        # LIST
        workspace_invitation_view_ref01_match = {}

        workspace_invitation_view_ref01_list_result = workspace_invitation_view_ref01_ent.list(workspace_invitation_view_ref01_match, None)
        assert isinstance(workspace_invitation_view_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(workspace_invitation_view_ref01_list_result),
            {"id": workspace_invitation_view_ref01_data["id"]})
        assert not vs.isempty(found_item)



def _workspace_invitation_view_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/workspace_invitation_view/WorkspaceInvitationViewTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = TodoistSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["workspace_invitation_view01", "workspace_invitation_view02", "workspace_invitation_view03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "TODOIST_TEST_WORKSPACE_INVITATION_VIEW_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "TODOIST_TEST_WORKSPACE_INVITATION_VIEW_ENTID": idmap,
        "TODOIST_TEST_LIVE": "FALSE",
        "TODOIST_TEST_EXPLAIN": "FALSE",
        "TODOIST_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("TODOIST_TEST_WORKSPACE_INVITATION_VIEW_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("TODOIST_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("TODOIST_APIKEY"),
            },
            extra or {},
        ])
        client = TodoistSDK(helpers.to_map(merged_opts))

    _live = env.get("TODOIST_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("TODOIST_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
