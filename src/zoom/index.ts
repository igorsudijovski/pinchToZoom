import { Point } from '../model/Point';
import { Canvas } from '../model/Canvas';
import { FingerPinch } from '../model/FingerPinch';
import { calculateDistance, getCenter, positionInContainer } from '../helpers';

export const move = (begin: Point, end: Point, canvas: Canvas) : Canvas => {
  return positionInContainer(
    {
      element: {
        offsetX: end.x - begin.x + canvas.element.offsetX,
        offsetY: end.y - begin.y + canvas.element.offsetY,
        width: canvas.element.width,
        height: canvas.element.height
      },
      viewPoint: canvas.viewPoint
    }
  );
};

export const zoomToPoint = (point: Point, scale: number, canvas: Canvas): Canvas => {
  const pointToCanvas: Point = {
    x: point.x - canvas.element.offsetX,
    y: point.y - canvas.element.offsetY
  };

  let newWidth = canvas.element.width * scale;
  let newHeight = canvas.element.height * scale;
  let calculatedScale = scale;
  if (newWidth < canvas.viewPoint.width || newHeight < canvas.viewPoint.height) {
    calculatedScale = canvas.viewPoint.width / canvas.element.width;
    newWidth = canvas.viewPoint.width;
    newHeight = canvas.viewPoint.height;
  }
  if (canvas.viewPoint.maxHeight !== undefined && canvas.viewPoint.maxWidth !== undefined) {
    if (canvas.viewPoint.maxWidth < newWidth || canvas.viewPoint.maxHeight < newHeight) {
      calculatedScale = canvas.viewPoint.maxWidth / canvas.element.width;
      newWidth = canvas.viewPoint.maxWidth;
      newHeight = canvas.viewPoint.maxHeight;
    }
  }
  const newPoint: Point = {
    x: calculatedScale * pointToCanvas.x,
    y: calculatedScale * pointToCanvas.y
  };

  return positionInContainer(
    {
      element: {
        offsetX: canvas.element.offsetX + pointToCanvas.x - newPoint.x,
        offsetY: canvas.element.offsetY + pointToCanvas.y - newPoint.y,
        width: newWidth,
        height: newHeight
      },
      viewPoint: canvas.viewPoint
    }
  );
};

export const zoom = (startingPoint: FingerPinch, endingPoint: FingerPinch, canvas: Canvas, scaleFactor = 1): Canvas => {
  const scale = (calculateDistance(endingPoint)/calculateDistance(startingPoint)) * scaleFactor;
  const startingCenter = getCenter(startingPoint);

  return zoomToPoint(startingCenter, scale, canvas);
};
export const zoomAndMove = (startingPoint: FingerPinch, endingPoint: FingerPinch, canvas: Canvas, scaleFactor = 1): Canvas => {
  const scale = (calculateDistance(endingPoint)/calculateDistance(startingPoint)) * scaleFactor;
  const startingCenter = getCenter(startingPoint);
  const endingCenter = getCenter(endingPoint);

  const newCanvas = zoomToPoint(endingCenter, scale, canvas);
  return move(startingCenter, endingCenter, newCanvas);
  // const delta = {
  //   x: endingCenter.x - startingCenter.x,
  //   y: endingCenter.y - startingCenter.y
  // };
  //
  // return positionInContainer(
  //   {
  //     element: {
  //       offsetX: newCanvas.element.offsetX + delta.x,
  //       offsetY: newCanvas.element.offsetY + delta.y,
  //       width: newCanvas.element.width,
  //       height: newCanvas.element.height
  //     },
  //     viewPoint: newCanvas.viewPoint
  //   }
  // );
};