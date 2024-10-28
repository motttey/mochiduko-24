export const dispatchEventOnCanvas = (e: {
  clientX: number;
  clientY: number;
}) => {
  const canvas = document.getElementById("fluidCanvas");
  if (canvas) {
    // クリック発生時に新しいイベントを作成し、Canvasに発火させる
    const event = new MouseEvent("click", {
      clientX: e.clientX,
      clientY: e.clientY,
    });
    canvas.dispatchEvent(event);
  }
};
