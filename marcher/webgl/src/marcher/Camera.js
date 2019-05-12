import { utils } from './index.js'
import { Vector } from './math/index.js';

export default class Camera {
    constructor(
        position = new Vector(0, 0, 0),
        direction = new Vector(0, 0, -1),
        up = new Vector(0, 1, 0),
        field_of_view = utils.PI / 4,
    ) {
        this.position = position;
        this.direction = direction;
        this.up = up;
        this.right = direction.cross(up);
        this.field_of_view = field_of_view;
    }

    get_directions(width, height) {
        let half_width = Math.tan(this.field_of_view);
        let half_height = half_width * height / width;

        let right = this.right.scale(half_width);
        let up = this.up.scale(half_height);

        let directions = [
            this.direction.add(up).add(right).normalize(),
            this.direction.add(up).add(right.negate()).normalize(),
            this.direction.add(up.negate()).add(right).normalize(),
            this.direction.add(up.negate()).add(right.negate()).normalize(),
        ];

        return directions.map(x => x.to_array()).reduce((prev, cur) => prev.concat(cur), []);
    }
};