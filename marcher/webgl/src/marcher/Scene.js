import { 
    OBJECT_TYPE_MAP,
    MAX_OBJECTS,
} from './primitives/index.js';
import { Camera } from './index.js';

export default class Scene {
    constructor(camera = new Camera(), objects = []) {
        this.camera = camera;
        this.objects = objects;
    }

    get_uniforms() {
        let object_types = this.objects.map(o => {
            for (let [Type, value] of OBJECT_TYPE_MAP) {
                if (o instanceof Type) {
                    return value;
                }
            }
            return null;
        });
    
        return {
            u_object_count: this.objects.length,
            u_object_types: object_types,
            u_object_positions: 
                this.objects
                    .map(o => o.position.to_array())
                    .reduce((prev, cur) => prev.concat(cur), []),
            u_object_params: 
                this.objects
                    .map(o => o.get_params_array())
                    .reduce((prev, cur) => prev.concat(cur), [])
                    .map(x => x ? x : 0),
            u_camera_position: this.camera.position.to_array()
        }
    }
};