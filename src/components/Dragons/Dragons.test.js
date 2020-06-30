import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dragons from './index';

describe('Dragons Component', () => {
  it('Should render app component', () => {
    const wrapper = render(<Router><Dragons /></Router>);
    expect(wrapper).toBeTruthy();
  });
});