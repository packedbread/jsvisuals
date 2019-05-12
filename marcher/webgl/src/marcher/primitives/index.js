import Sphere from './Sphere.js';
import Mandelbulb from './Mandelbulb.js'

const OBJECT_TYPE_MAP = new Map([
    [Sphere, 1],
    [Mandelbulb, 2]
]);

const MAX_OBJECTS = 1;

export {
    Sphere,
    Mandelbulb,
    OBJECT_TYPE_MAP,
    MAX_OBJECTS,
};

export default {
    Sphere,
    Mandelbulb,
    OBJECT_TYPE_MAP,
    MAX_OBJECTS,
};
