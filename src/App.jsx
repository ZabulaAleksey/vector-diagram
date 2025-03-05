import React, { useState } from "react";
import VectorDiagram from "./VectorDiagram";
import InputForm from "./InputForm";
import "./App.css"; // Подключаем стили

const App = () => {
    const [voltage, setVoltage] = useState(230);
    const [impedances, setImpedances] = useState([
        { id: 1, real: 10, imag: 5, color: "red" },
        { id: 2, real: 8, imag: -6, color: "green" },
        { id: 3, real: 6, imag: 3, color: "blue" }
    ]);

    const updateImpedance = (id, field, value) => {
        setImpedances(prev =>
            prev.map(imp => (imp.id === id ? { ...imp, [field]: Number(value) } : imp))
        );
    };

    const addImpedance = () => {
        setImpedances([
            ...impedances,
            { id: Date.now(), real: 5, imag: 2, color: "black" }
        ]);
    };

    const removeImpedance = (id) => {
        setImpedances(impedances.filter(imp => imp.id !== id));
    };

    const vectors = impedances.map(({ id, real, imag, color }) => {
        const magnitude = voltage / Math.sqrt(real ** 2 + imag ** 2);
        const angle = -Math.atan2(imag, real);

        return {
            id,
            startX: 0,
            startY: 0,
            endX: magnitude * Math.cos(angle) * 10,
            endY: magnitude * Math.sin(angle) * 10,
            color
        };
    });

    return (
        <div className="container">
            <InputForm
                voltage={voltage}
                setVoltage={setVoltage}
                impedances={impedances}
                updateImpedance={updateImpedance}
                addImpedance={addImpedance}
                removeImpedance={removeImpedance}
            />
            <VectorDiagram vectors={vectors} />
        </div>
    );
};

export default App;
