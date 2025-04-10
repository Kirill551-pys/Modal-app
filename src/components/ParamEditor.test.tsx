import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ParamEditor from './ParamEditor';
import { Param, Model } from '../types';

describe('ParamEditor Component', () => {
    const params: Param[] = [
        { id: 1, name: 'Назначение', type: 'string' },
        { id: 2, name: 'Длина', type: 'string' },
    ];

    const model: Model = {
        paramValues: [
            { paramId: 1, value: 'повседневное' },
            { paramId: 2, value: 'макси' },
        ],
        colors: [],
    };

    it('renders all parameters with initial values', () => {
        render(<ParamEditor params={params} model={model} />);

        expect(screen.getByLabelText('Назначение:')).toHaveValue('повседневное');
        expect(screen.getByLabelText('Длина:')).toHaveValue('макси');
    });

    it('updates parameter values on input change', () => {
        render(<ParamEditor params={params} model={model} />);

        const purposeInput = screen.getByLabelText('Назначение:');
        fireEvent.change(purposeInput, { target: { value: 'спортивное' } });

        expect(purposeInput).toHaveValue('спортивное');
    });

    it('calls getModel() and returns updated model', () => {
        const ref = React.createRef<any>();
        render(<ParamEditor ref={ref} params={params} model={model} />);

        const purposeInput = screen.getByLabelText('Назначение:');
        fireEvent.change(purposeInput, { target: { value: 'спортивное' } });

        const updatedModel = ref.current?.getModel();

        expect(updatedModel).toEqual({
            ...model,
            paramValues: [
                { paramId: 1, value: 'спортивное' }, 
                { paramId: 2, value: 'макси' },   
            ],
        });
    });

    it('displays error message for empty fields (validation)', () => {
        render(<ParamEditor params={params} model={model} />);

        const purposeInput = screen.getByLabelText('Назначение:');
        fireEvent.change(purposeInput, { target: { value: '' } });

        expect(screen.getByText('Поле не может быть пустым')).toBeInTheDocument();
    });
});