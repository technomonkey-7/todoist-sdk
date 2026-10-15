# Todoist SDK feature factory

from todoist_sdk.feature.base_feature import TodoistBaseFeature
from todoist_sdk.feature.paging_feature import TodoistPagingFeature
from todoist_sdk.feature.retry_feature import TodoistRetryFeature
from todoist_sdk.feature.test_feature import TodoistTestFeature
from todoist_sdk.feature.timeout_feature import TodoistTimeoutFeature


_FEATURES = {
    "base": lambda: TodoistBaseFeature(),
    "paging": lambda: TodoistPagingFeature(),
    "retry": lambda: TodoistRetryFeature(),
    "test": lambda: TodoistTestFeature(),
    "timeout": lambda: TodoistTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
