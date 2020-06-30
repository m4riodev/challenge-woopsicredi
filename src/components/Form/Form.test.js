import React from 'react';
import { render } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import Form from './index';

describe('Form Component', () => {
  it('Should render app component', () => {
    const mock = {
      id: 69,
      createdAt: '',
      name: 'test',
      type: 'test'
    }
    
    const wrapper = render(<Form dragon={mock} history={useHistory} />);
    expect(wrapper).toBeTruthy();
  });
});