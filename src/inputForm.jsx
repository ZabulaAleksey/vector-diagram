import React from "react";

const InputForm = ({ voltage, setVoltage, impedances, updateImpedance, addImpedance, removeImpedance }) => {
    return (
        <div className="inputs">
            <h2>Векторная диаграмма токов</h2>
            <label>
                Линейное напряжение (В): 
                <input type="number" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} />
            </label>
            <button onClick={addImpedance}>Добавить сопротивление</button>
            {impedances.map((imp) => (
                <div key={imp.id} className="impedance">
                    <span style={{ color: imp.color, fontWeight: "bold" }}>Z {imp.id}:</span>
                    <input type="number" value={imp.real} onChange={(e) => updateImpedance(imp.id, "real", e.target.value)} />
                    +
                    <input type="number" value={imp.imag} onChange={(e) => updateImpedance(imp.id, "imag", e.target.value)} />
                    j Ω
                    <button onClick={() => removeImpedance(imp.id)}>Удалить</button>
                </div>
            ))}
        </div>
    );
};

export default InputForm;
