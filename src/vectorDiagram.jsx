import React, { useEffect, useRef } from "react";

const VectorDiagram = ({ vectors }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const offsetX = canvas.width / 2;
        const offsetY = canvas.height / 2;

        // Рисуем оси координат
        ctx.strokeStyle = "#ddd";
        ctx.beginPath();
        ctx.moveTo(0, offsetY);
        ctx.lineTo(canvas.width, offsetY);
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX, canvas.height);
        ctx.stroke();

        // Рисуем векторы
        vectors.forEach(({ startX, startY, endX, endY, color }) => {
            ctx.strokeStyle = color || "blue";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(startX + offsetX, -startY + offsetY);
            ctx.lineTo(endX + offsetX, -endY + offsetY);
            ctx.stroke();

            // Стрелка в конце вектора
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

    return <canvas ref={canvasRef} width={400} height={400} className="canvas" />;
};

export default VectorDiagram;
