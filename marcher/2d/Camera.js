class Camera {
    constructor(position, angle, boundRect) {
        this.position = position;
        this.angle = angle;
        this.boundRect = boundRect;
    }

    rotate(angle) {
        this.angle += angle;
    }

    march(objects, threshold = 1) {
        let closest = [Infinity, null];
        let current = this.position.copy();
        let marches = [];
        while (true) {
            // calculete closest object distance
            closest = [Infinity, null]
            for (let object of objects) {
                let sd = object.signedDistance(current);
                if (sd < closest[0]) {
                    closest = [sd, object];
                }
            }
            if (!(closest[0] > threshold && this.isInsideBounds(current))) {
                break;
            }
            marches.push([current.copy(), closest[0]]);
            // make a step
            current.x += Math.cos(this.angle) * closest[0];
            current.y += Math.sin(this.angle) * closest[0];
        }
        marches.push([current.copy(), closest[0]]);
        if (this.isInsideBounds(current)) {
            return [marches, closest[1]];
        }
        return [marches, null];
    }

    isInsideBounds(point) {
        return point.x >= this.boundRect.x &&
            point.y >= this.boundRect.y &&
            point.x <= this.boundRect.x + this.boundRect.width &&
            point.y <= this.boundRect.y + this.boundRect.height;
    }
}