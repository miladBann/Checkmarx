import { render, screen, fireEvent } from '@testing-library/react';
import AddResource from "../components/add-resource/AddResource";
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

window.alert = jest.fn();

test('shows form when clicked', async () => {
  render(<AddResource />);
  
  const button = screen.getByText('Add a Resource');
  
  fireEvent.click(button);
  
  expect(screen.getByText('Submit')).toBeInTheDocument();
});

test('checks form inputs are initially empty', async () => {
    render(<AddResource />);
    
    const nameInput = screen.getByTestId('input1');
    const typeInput = screen.getByTestId('input2');
    const microserviceInput = screen.getByTestId('input3');
    
    expect(nameInput).toHaveValue('');
    expect(typeInput).toHaveValue('');
    expect(microserviceInput).toHaveValue('');
});

test('selects access type correctly', async () => {
  render(<AddResource />);
  
  const privateCheckbox = screen.getByTestId('box1');
  const publicCheckbox = screen.getByTestId('box2');
  const unknownCheckbox = screen.getByTestId('box3');
  
  fireEvent.click(privateCheckbox);
  
  expect(privateCheckbox).toBeChecked();
  expect(publicCheckbox).not.toBeChecked();
  expect(unknownCheckbox).not.toBeChecked();
});
