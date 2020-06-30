import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Dragon from './index';

describe('Dragon Component', () => {
  it('Should render app component', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/69']}  initialIndex={0}>
        <Route path="/:id" component={Dragon} />
      </MemoryRouter>
    );
    expect(wrapper).toBeTruthy();
  });
});