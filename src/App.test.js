import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('Should render app component', () => {
    const wrapper = render(<App />)
    expect(wrapper).toBeTruthy()
  })
})