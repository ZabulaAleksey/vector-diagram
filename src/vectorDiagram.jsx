import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const VectorDiagram = ({ vectors }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const offsetX = canvas.width / 2;
        const offsetY = canvas.height / 2;
        const gridSize = 50;

        ctx.strokeStyle = "#444";
        ctx.lineWidth = 0.5;

        for (let x = 0; x <= canvas.width / 2; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(offsetX + x, 0);
            ctx.lineTo(offsetX + x, canvas.height);
            ctx.moveTo(offsetX - x, 0);
            ctx.lineTo(offsetX - x, canvas.height);
            ctx.stroke();
        }

        for (let y = 0; y <= canvas.height / 2; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, offsetY + y);
            ctx.lineTo(canvas.width, offsetY + y);
            ctx.moveTo(0, offsetY - y);
            ctx.lineTo(canvas.width, offsetY - y);
            ctx.stroke();
        }

        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, offsetY);
        ctx.lineTo(canvas.width, offsetY);
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX, canvas.height);
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.font = "14px Arial";

        for (let x = gridSize; x <= canvas.width / 2; x += gridSize) {
            ctx.fillText((x / 10).toFixed(1), offsetX + x, offsetY + 15);
            ctx.fillText((-x / 10).toFixed(1), offsetX - x, offsetY + 15);
        }

        for (let y = gridSize; y <= canvas.height / 2; y += gridSize) {
            ctx.fillText((-y / 10).toFixed(1), offsetX - 5, offsetY + y + 5);
            ctx.fillText((y / 10).toFixed(1), offsetX - 5, offsetY - y + 5);
        }

        vectors.forEach(({ startX, startY, endX, endY, color }) => {
            ctx.strokeStyle = color || "blue";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(startX + offsetX, -startY + offsetY);
            ctx.lineTo(endX + offsetX, -endY + offsetY);
            ctx.stroke();

            const angle = Math.atan2(endY - startY, endX - startX);
            const arrowSize = 8;
            ctx.fillStyle = color || "blue";
            ctx.beginPath();
            ctx.moveTo(endX + offsetX, -endY + offsetY);
            ctx.lineTo(
                endX + offsetX - arrowSize * Math.cos(angle - Math.PI / 6),
                -endY + offsetY + arrowSize * Math.sin(angle - Math.PI / 6)
            );
            ctx.lineTo(
                endX + offsetX - arrowSize * Math.cos(angle + Math.PI / 6),
                -endY + offsetY + arrowSize * Math.sin(angle + Math.PI / 6)
            );
            ctx.closePath();
            ctx.fill();
        });
    }, [vectors]);

    return <canvas ref={canvasRef} width={450} height={450} className="canvas" />;
};

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

export default VectorDiagram;
