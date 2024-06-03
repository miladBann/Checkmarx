import { render, screen } from '@testing-library/react';
import AddConnection from '../components/add-connection/AddConnection';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';


test('renders resource input field correctly', async () => {
    render(<AddConnection />);
    
    const resourceNameParagraph = screen.getByText('Resource Name:');
    
    const inputField = resourceNameParagraph.nextSibling;
    
    expect(inputField).toBeInTheDocument();
  });
  
  test('renders submit button correctly', async () => {
    render(<AddConnection />);
    
    const submitButton = screen.getByText('Submit');
    
    expect(submitButton).toBeInTheDocument();
  });
