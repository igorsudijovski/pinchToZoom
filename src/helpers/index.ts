import { CanvasElement } from '../model/CanvasElement';
import { Point } from '../model/Point';
import { Canvas } from '../model/Canvas';
import { FingerPinch } from '../model/FingerPinch';

export const calculateDistance = (point: FingerPinch): number => {
  return Math.hypot(point.firstFinger.x - point.secondFinger.x, point.firstFinger.y - point.secondFinger.y);
};

export const getCenter = (point: FingerPinch): Point => {
  return {
    x: (point.firstFinger.x + point.secondFinger.x) / 2,
    y: (point.firstFinger.y + point.secondFinger.y) / 2
  };
};

export const positionInContainer = (canvas: Canvas): Canvas => {
  const newCanvas: CanvasElement = {
    offsetX: canvas.element.offsetX,
    offsetY: canvas.element.offsetY,
    width: canvas.element.width,
    height: canvas.element.height
  };

  const oldCanvasElement = canvas.element;
  if (oldCanvasElement.offsetX > 0) {
    newCanvas.offsetX = 0;
  }
  if (oldCanvasElement.offsetY > 0) {
    newCanvas.offsetY = 0;
  }
  if (oldCanvasElement.offsetX + oldCanvasElement.width < canvas.viewPoint.width) {
    newCanvas.offsetX = canvas.viewPoint.width - oldCanvasElement.width;
  }
  if (oldCanvasElement.offsetY + oldCanvasElement.height < canvas.viewPoint.height) {
    newCanvas.offsetY = canvas.viewPoint.height - oldCanvasElement.height;
  }
  return {
    element: newCanvas,
    viewPoint: canvas.viewPoint
  };
};