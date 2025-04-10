export interface Param {
    id: number;
    name: string;
    type: 'string';
}

export interface ParamValue {
    paramId: number;
    value: string;
}

export interface Color {
}

export interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}

export interface Props {
    params: Param[];
    model: Model;
}