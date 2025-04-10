import React from 'react';
import ParamEditor from './components/ParamEditor';
import { Param, Model } from './types';
import './App.css'; 

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

const App: React.FC = () => {
    const editorRef = React.useRef<ParamEditor | null>(null);

    const handleGetModel = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getModel());
        }
    };

    return (
        <div className="container">
            <h1>Редактор параметров</h1>
            <ParamEditor ref={editorRef} params={params} model={model} />
            <button onClick={handleGetModel}>Получить модель</button>
        </div>
    );
};

export default App;