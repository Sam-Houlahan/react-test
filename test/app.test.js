import './setup-dom'
import test from 'ava'
import React from 'react'
import {shallow, mount} from 'enzyme'

import App from '../client/components/App'
App.prototype.componentDidMount = () => {}

test('mount <App />', t => {
  const wrapper = mount(<App />)
  t.is(wrapper.find('.repo-table').exists(), true)
})

test('Shows heading', t => {
  const wrapper = shallow(<App />)
  t.is(wrapper.find('h2').text(), 'Frisk Test')
})
