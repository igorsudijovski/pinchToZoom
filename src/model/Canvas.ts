import { CanvasElement } from './CanvasElement';
import { ViewPoint } from './ViewPoint';

export interface Canvas {
  element: CanvasElement;
  viewPoint: ViewPoint;
}