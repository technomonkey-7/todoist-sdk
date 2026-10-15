
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TodoistSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TodoistSDK.test()
    equal(testsdk instanceof TodoistSDK, true,
      'TodoistSDK.test() must return a client synchronously')
  })

})
