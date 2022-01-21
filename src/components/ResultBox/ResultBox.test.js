import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from={'PLN'} to={'USD'} amount={100} />);
    });

    const testCases = [
        { amount: '100.00', result: '28.57' },
        { amount: '20.00', result: '5.71' },
        { amount: '200.00', result: '57.14' },
        { amount: '345.00', result: '98.57' },
    ];

    for (const testObj of testCases) {
        it('should render proper info about conversion when PLN -> USD', () => {
            render(<ResultBox from={'PLN'} to={'USD'} amount={parseFloat(testObj.amount)} />);

            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent('PLN ' + testObj.amount + ' = $' + testObj.result);
        });
        cleanup()
    }

    const testCases2 = [
        { amount: '100.20', result: '350.70' },
        { amount: '20.10', result: '70.35' },
        { amount: '200.03', result: '700.11' },
        { amount: '45.05', result: '157.67' },
    ];

    for (const testObj of testCases2) {
        it('should render proper info about conversion when USD -> PLN', () => {
            render(<ResultBox from={'USD'} to={'PLN'} amount={parseFloat(testObj.amount)} />);

            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent('$' + testObj.amount + ' = PLN ' + testObj.result);
        });
        cleanup()
    }

    const testCases3 = [
        { amount: '100.20', result: '100.20', currency: 'USD', symbol: '$' },
        { amount: '20.10', result: '20.10', currency: 'PLN', symbol: 'PLN ' },
    ];

    for (const testObj of testCases3) {
        it('should render proper info about conversion when the same currency ' + testObj.currency, () => {
            render(<ResultBox from={testObj.currency} to={testObj.currency} amount={parseFloat(testObj.amount)} />);

            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.symbol + testObj.amount + ' = ' + testObj.symbol + testObj.result);
        });
        cleanup()
    }
});