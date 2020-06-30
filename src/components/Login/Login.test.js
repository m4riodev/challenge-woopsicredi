import React from 'react';
import { render } from '@testing-library/react';
import Login from './index';

describe('Login Component', () => {
  it('Should render app component', () => {
    const wrapper = render(<Login />);
    expect(wrapper).toBeTruthy();
  });
});