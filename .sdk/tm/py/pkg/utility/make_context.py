# Todoist SDK utility: make_context

from projectname_sdk.core.context import TodoistContext


def make_context_util(ctxmap, basectx):
    return TodoistContext(ctxmap, basectx)
