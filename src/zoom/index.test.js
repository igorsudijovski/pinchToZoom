const { zoomToPoint } = require('../../dist/lib/es5');

describe('blabla', () => {
  it('should blabla', () => {
    //given
    const canvas = {
      element: {
        offsetX: -100,
        offsetY: -100,
        width: 400,
        height: 400
      },
      viewPoint: {
        width: 200,
        height: 200
      }
    }
    const point = {
      x: 0,
      y: 0
    }

    const el = zoomToPoint(point, 2, canvas);
    const el1 = zoomToPoint(point, 2, el);

    console.log(JSON.stringify(el));
    console.log(JSON.stringify(el1));
  });
});