import React from 'react';
import { render } from '@testing-library/react';
import Header from './index';

describe('Header Component', () => {
  it('Should render app component', () => {
    const wrapper = render(<Header />);
    expect(wrapper).toBeTruthy();
  });
});