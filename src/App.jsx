import { useState } from "react";
import VectorDiagram from "./VectorDiagram";
import InputForm from "./InputForm";
import "./App.css";

VectorDiagram.propTypes = {
    vectors: PropTypes.arrayOf(
        PropTypes.shape({
            startX: PropTypes.number.isRequired,
            startY: PropTypes.number.isRequired,
            endX: PropTypes.number.isRequired,
            endY: PropTypes.number.isRequired,
            color: PropTypes.string
        })
    ).isRequired
};

const App = () => {
    const [voltage, setVoltage] = useState(220);
    const [impedances, setImpedances] = useState([
        { id: "a", real: 10, imag: 0, color: "red" },
        { id: "b", real: 20, imag: 0, color: "green" },
        { id: "c", real: 30, imag: 0, color: "blue" }
    ]);


    const updateImpedance = (id, field, value) => {
        setImpedances(prev =>
            prev.map(imp => (imp.id === id ? { ...imp, [field]: Number(value) } : imp))
        );
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
            />
            <VectorDiagram vectors={vectors} />
        </div>
    );
};

export default App;
