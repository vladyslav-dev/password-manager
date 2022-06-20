import { render, screen } from '@testing-library/react';
import Form from './index';

// describe(Form, () => {
//     it('Form component displays correctly incoming props', () => {
//         const res: any = render(<Form title='Sample title' />)
//     })
// })

test('render a title in Form', () => {
    render(<Form title='Sample title' type='login' />)

    const h1Element = screen.getByRole('title')
    expect(h1Element).toBeInTheDocument();
})