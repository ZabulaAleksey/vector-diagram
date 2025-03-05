import React from "react";
import PropTypes from "prop-types";

const InputForm = ({ voltage, setVoltage, impedances, updateImpedance }) => {
    return (
        <div>
            <div className="impedance-table">
                <label>Uл:</label>
                <input 
                    type="number" 
                    value={voltage} 
                    onChange={(e) => setVoltage(Number(e.target.value))} 
                />
                <span></span> 
                <span></span> 
                <span>Ом</span>
                
                {impedances.map((imp, index) => (
                    <React.Fragment key={imp.id}>
                        <label>Z{String.fromCharCode(97 + index)}:</label>
                        <input 
                            type="number" 
                            value={imp.real} 
                            onChange={(e) => updateImpedance(imp.id, "real", Math.max(0, e.target.value))} 
                        />
                        <span>+j</span>
                        <input 
                            type="number" 
                            value={imp.imag} 
                            onChange={(e) => updateImpedance(imp.id, "imag", e.target.value)} 
                        />
                        <span>Ом</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

InputForm.propTypes = {
    voltage: PropTypes.number.isRequired, // Линейное напряжение (обязательно)
    setVoltage: PropTypes.func.isRequired, // Функция для изменения напряжения
    impedances: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            real: PropTypes.number.isRequired,
            imag: PropTypes.number.isRequired
        })
    ).isRequired,
    updateImpedance: PropTypes.func.isRequired,
    addImpedance: PropTypes.func.isRequired,
    removeImpedance: PropTypes.func.isRequired
};

export default InputForm;
