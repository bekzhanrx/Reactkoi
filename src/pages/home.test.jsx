import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/Home';

describe('Home Component', () => {
    test('renders Home component correctly', () => {
        render(<Home />);
        expect(screen.getByText(/Header/i)).toBeInTheDocument(); // Check if the Header component text is rendered
      });
      
});
