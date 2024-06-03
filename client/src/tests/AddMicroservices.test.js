import { render, screen, fireEvent } from '@testing-library/react';
import AddMicroservice from '../components/add-microservice/AddMicroservice';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

window.alert = jest.fn();

test('shows form when clicked', async () => {
    render(<AddMicroservice />);
    
    const button = screen.getByText('Add a Microservice');
    
    fireEvent.click(button);
    
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

test('submits form correctly', async () => {
  render(<AddMicroservice />);
  
  const submitButton = screen.getByText('Submit');
  
  fireEvent.click(submitButton);
  
  expect(window.alert).toHaveBeenCalledWith("Please fill all the fields");
});