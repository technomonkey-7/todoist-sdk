package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/technomonkey-7/todoist-sdk/go"
	"github.com/technomonkey-7/todoist-sdk/go/core"

	vs "github.com/technomonkey-7/todoist-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const notification_settingEntityLiveStrict = true


func TestNotificationSettingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.NotificationSetting(nil)
		if ent == nil {
			t.Fatal("expected non-nil NotificationSettingEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.NotificationSetting(nil).Update(map[string]any{"notification_type": 1}, nil)
		if sdkerr, ok := err.(*core.TodoistError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := notification_settingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "notification_setting." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		notificationSettingRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.notification_setting")))
		var notificationSettingRef01Data map[string]any
		if len(notificationSettingRef01DataRaw) > 0 {
			notificationSettingRef01Data = core.ToMapAny(notificationSettingRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = notificationSettingRef01Data

		// UPDATE
		notificationSettingRef01Ent := client.NotificationSetting(nil)
		notificationSettingRef01DataUp0Up := map[string]any{
		}

		notificationSettingRef01MarkdefUp0Name := "notification_type"
		notificationSettingRef01MarkdefUp0Value := fmt.Sprintf("Mark01-notification_setting_ref01_%d", setup.now)
		notificationSettingRef01DataUp0Up[notificationSettingRef01MarkdefUp0Name] = notificationSettingRef01MarkdefUp0Value

		notificationSettingRef01ResdataUp0Result, err := notificationSettingRef01Ent.Update(notificationSettingRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		notificationSettingRef01ResdataUp0 := core.ToMapAny(entityData(notificationSettingRef01ResdataUp0Result))
		if notificationSettingRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if notificationSettingRef01ResdataUp0[notificationSettingRef01MarkdefUp0Name] != notificationSettingRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", notificationSettingRef01MarkdefUp0Name, notificationSettingRef01ResdataUp0[notificationSettingRef01MarkdefUp0Name])
		}

	})
}

func notification_settingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "notification_setting", "NotificationSettingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read notification_setting test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse notification_setting test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"notification_setting01", "notification_setting02", "notification_setting03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("TODOIST_TEST_NOTIFICATION_SETTING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TODOIST_TEST_NOTIFICATION_SETTING_ENTID": idmap,
		"TODOIST_TEST_LIVE":      "FALSE",
		"TODOIST_TEST_EXPLAIN":   "FALSE",
		"TODOIST_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["TODOIST_TEST_NOTIFICATION_SETTING_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TODOIST_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["TODOIST_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewTodoistSDK(core.ToMapAny(mergedOpts))
	}

	live := env["TODOIST_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TODOIST_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
