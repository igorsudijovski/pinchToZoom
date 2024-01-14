# Pinch to zoom
Javascript library that help with implementing pinch to zoom.
The library offer vanilla Javascript function that will do the necessary calculation in order to do pinch to zoom on image, pdf, graph...

## How to install

```
$ npm install container-pinch-to-zoom
```

## Usage

```ecmascript 6
const { zoomAndMove, move } = require('container-pinch-to-zoom');
```
```ecmascript 6
import { zoomAndMove, move} from 'container-pinch-to-zoom';
```
The library offers es5 and es6

## Functionalities
### Move
Moving the rendered object from start point to end point.

method definition: `move(first: Point, second: Point, canvas: Canvas): Canvas`

- `first`: Point where the moving started. Ref: [Point](#object-point)
- `second`: Point where the moving ended: Ref: [Point](#object-point)
- `canvas`: Reference value for the rendered object and view point: Ref: [Canvas](#object-canvas)


- Return - `canvas`: The new position of the rendered object in the view point. 
View point that is returned is always unchanged.

### Zoom To Point
Zooming rendered object in one point. Example: If the zoom point is the middle of the object, then
the image will be zoomed but the middle point of the object will stay in the middle.

method definition: `zoomToPoint(point: Point, scale: number, canvas: Canvas): Canvas`

- `point`: Point where the zoom is happening. Ref: [Point](#object-point)
- `scale`: How much scale needs to be applied to the rendered object. Example: 1.1 (means 10% bigger object). 
This is scale to the current values in the canvas that are provided to the method.
- `canvas`: Reference value for the rendered object and view point: Ref: [Canvas](#object-canvas)


- Return - `canvas`: The new position and new size of the rendered object in the view point. 
View point that is returned is always unchanged.

### Zoom
Zooming the rendered object without moving in the process. This method is intended to be used when pinch to zoom. 
This will zoom(in/out) in the center of the first touch. (The meaning of the center is the center point between the two fingers)
The scale will be calculated based on where it first started and where it ended with the zooming. The difference between the distance is the scale.
Example: First touch (100, 100), (200, 100), Finished touch (75, 100), (225, 100). In this case the zoom will be zoom in of 50%
distance between first touch: 100, between finished touch: 150, result 150 / 100 = 1.5

method definition: `zoom(startingPinch: FingerPinch, endingPinch: FingerPinch, canvas: Canvas, scaleFactor = 1): Canvas`

- `startingPinch`: The two points where the pinch to zoom started. Ref: [FingerPinch](#object-fingerpinch)
- `endingPinch`: The two points where the pinch to zoom ended. Ref: [FingerPinch](#object-fingerpinch)
- `canvas`: Reference value for the rendered object and view point: Ref: [Canvas](#object-canvas)
- `scaleFactor`: This is optional value, and it is used if you need bigger zoom. 
The example is if you have a very big screen, and you want your pinching to have bigger effect (or smaller effect). This scaleFactor is multiply by the calculated factor.
If the scaleFactor is bigger than 1, then the zooming is faster (zoom in is bigger), if is less than 1, then it is slower


- Return - `canvas`: The new position and new size of the rendered object in the view point.
  View point that is returned is always unchanged.

### Zoom and move
Zooming the rendered object and moving in the process. This means that the rendered object can be zoomed and moved with two fingers in same time.
This method is intended to be used when pinch to zoom.
The scale will be calculated based on where it first started and where it ended with the zooming. The difference between the distance is the scale.
Example: First touch (100, 100), (200, 100), Finished touch (75, 100), (225, 100). In this case the zoom will be zoom in of 50%
distance between first touch: 100, between finished touch: 150, result 150 / 100 = 1.5

method definition: `zoomAndMove(startingPinch: FingerPinch, endingPinch: FingerPinch, canvas: Canvas, scaleFactor = 1): Canvas`

- `startingPinch`: The two points where the pinch to zoom started. Ref: [FingerPinch](#object-fingerpinch)
- `endingPinch`: The two points where the pinch to zoom ended. Ref: [FingerPinch](#object-fingerpinch)
- `canvas`: Reference value for the rendered object and view point: Ref: [Canvas](#object-canvas)
- `scaleFactor`: This is optional value, and it is used if you need bigger zoom.
  The example is if you have a very big screen, and you want your pinching to have bigger effect (or smaller effect). This scaleFactor is multiply by the calculated factor.
  If the scaleFactor is bigger than 1, then the zooming is faster (zoom in is bigger), if is less than 1, then it is slower


- Return - `canvas`: The new position and new size of the rendered object in the view point.
  View point that is returned is always unchanged.

#### **OBJECT: `Point`**
```ecmascript 6
interface Point {
  x: number;
  y: number
}
```
`x`: x coordinate from the touch finger

`y`: y coordinate from the touch finger

This is used to represent the touch point.

Example:
```ecmascript 6
var point = {
  x: 200,
  y: 200
}
```


#### **OBJECT: `FingerPinch`**
```ecmascript 6
interface FingerPinch {
  firstFinger: Point;
  secondFinger: Point
}
```
`firstFinger`: The point of the first finger (usually `event.targetTouches[0]`)

`secondFinger`: The point of the second finger (usually `event.targetTouches[1]`)

This object is used to represent the two fingers touching the screen.

Example:
```ecmascript 6
var finger = {
  firstFinger: {
    x: 200,
    y: 200
  },
  secondFinger: {
    x: 300,
    y: 300
  },
}
```

#### **OBJECT: `ViewPoint`**
```ecmascript 6
interface ViewPoint {
  width: number;
  height: number;
  maxWidth?: number;
  maxHeight?:number;
}
```
`width`: Width of the view point where the rendered object is rendered. Use to position and stop zoom out.

`height`: Height of the view point where the rendered object is rendered. Use to position and stop zoom out.

Aspect ratio of ViewPoint needs to be the same as the rendered object. This is the reason when zoom out is applied,
the latest state is rendered object in filling the whole view point.

`maxWidth`: Optional value for max width of the rendered object. It will stop the zoom in when the width is reached.

`maxHeight`: Optional value for max height of the rendered object. It will stop the zoom in when the height is reached.

Example:
```ecmascript 6
var viewPoint = {
  height: 200,
  width: 300
}
var viewPointWithMax = {
  height: 200,
  width: 300,
  maxHeight: 2000,
  maxWidth: 3000
}
```

#### **OBJECT: `CanvasElement`**
```ecmascript 6
interface CanvasElement {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}
```
`offsetX`: How much in px the rendered container needs to be moved to right (reference point is upper left corner).
Positive number means moving to right, negative number to left. Usually used with css property `left`.

`offsetY`: How much in px the rendered container needs to be moved down (reference point is upper left corner).
Positive number means moving down, negative number moving up. Usually used with css property `top`.

`width`: Current width of the rendered container.

`height`: Current height of the rendered container.

Example:
```ecmascript 6
var canvasElement = {
  offsetX: -12.321,
  offsetY: -30.222,
  height: 400,
  width: 600
}
```

#### **OBJECT: `Canvas`**
```ecmascript 6
interface Canvas {
  element: CanvasElement;
  viewPoint: ViewPoint;
}
```
`element`: Current position of the rendered object inside the view point.

`viewPoint`: Size of the view point where rendered object is shown.
Basically something like frame (or boundaries) for rendered object.

Example:
```ecmascript 6
var canvas = {
  element: {
    offsetX: -12.321,
    offsetY: -30.222,
    height: 400,
    width: 600
  },
  viewPoint: {
    height: 200,
    width: 300,
    maxHeight: 2000,
    maxWidth: 3000
  }
}
```