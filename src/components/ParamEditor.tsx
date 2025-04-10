import React from 'react';
import { Param, ParamValue, Model, Props } from '../types';

interface State {
    paramValues: ParamValue[];
    errors: { [key: number]: string }; 
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            paramValues: [...props.model.paramValues],
            errors: {},
        };
    }

    handleParamChange = (paramId: number, value: string) => {
        const updatedErrors = { ...this.state.errors };
        if (!value.trim()) {
            updatedErrors[paramId] = 'Поле не может быть пустым';
        } else {
            delete updatedErrors[paramId];
        }

        this.setState((prevState) => ({
            paramValues: prevState.paramValues.map((pv) =>
                pv.paramId === paramId ? { ...pv, value } : pv
            ),
            errors: updatedErrors,
        }));
    };

    public getModel(): Model {
        return {
            ...this.props.model,
            paramValues: [...this.state.paramValues],
        };
    }

    render() {
        const { params } = this.props;
        const { paramValues, errors } = this.state;

        return (
            <div>
                {params.map((param) => {
                    const currentValue = paramValues.find((pv) => pv.paramId === param.id)?.value || '';
                    return (
                        <div key={param.id} className="param-item">
                            <label>{param.name}:</label>
                            <input
                                type="text"
                                value={currentValue}
                                onChange={(e) => this.handleParamChange(param.id, e.target.value)}
                            />
                            {errors[param.id] && <span style={{ color: 'red' }}>{errors[param.id]}</span>}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default ParamEditor;