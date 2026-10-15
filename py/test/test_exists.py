# Todoist SDK exists test

import pytest
from todoist_sdk import TodoistSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TodoistSDK.test(None, None)
        assert testsdk is not None
