#version 300 es

precision mediump float;

const float PI = 3.14159265359;

float atan2(float y, float x)
{
    bool s = (abs(x) > abs(y));
    return mix(PI/2.0 - atan(x,y), atan(y,x), s);
}

in vec3 camera_direction;

const float INFINITY = 1e30;
const float EPS = 1e-5;

// >>> PRIMITIVE TYPES <<<

const uint TYPE_SPHERE = uint(1);
const uint TYPE_MANDELBULB = uint(2);

// >>> PRIMITIVE TYPES END <<<


const uint MAX_OBJECTS = uint(256);

uniform uint u_object_count;
uniform uint u_object_types[MAX_OBJECTS];
uniform vec3 u_object_positions[MAX_OBJECTS];
// object is allowed to have up to 4 float parameters, other than position and type
uniform vec4 u_object_params[MAX_OBJECTS];

/*
>>> OBJECT PARAMETERS SCHEME <<<

> TYPE_SPHERE
>> x: sphere radius

> TYPE_MANDELBULB
>> x: power
>> y: border value

*/


uniform vec3 u_camera_position;

float estimate_distance_to_sphere(vec3 point, uint object_index) {
    float radius = u_object_params[object_index].x;
    return distance(point, u_object_positions[object_index]) - radius;
}

const uint MAX_ITERATIONS = uint(256);

float estimate_distance_to_mandelbulb(vec3 point, uint object_index) {
    float power = u_object_params[object_index].x;
    float border_value = u_object_params[object_index].y;

    vec3 z = point;
    float dr = 1.0;
    float r = 0.0;
    for (uint i = uint(0); i < MAX_ITERATIONS; ++i) {
        r = length(z);
        if (r > border_value) {
            break;
        }
        float theta = acos(z.z / r);
        float phi = atan2(z.y, z.x);
        dr = pow(r, power - 1.0) * power * dr + 1.0;
        
        float zr = pow(r, power);
        theta *= power;
        phi *= power;

        z = vec3(
            sin(theta) * cos(phi),
            sin(theta) * sin(phi),
            cos(theta)
        ) * zr + point;
    }
    return r * log(r) / (2.0 * dr);
}

float estimate_distance_to_object(vec3 point, uint object_index) {
    if (u_object_types[object_index] == TYPE_SPHERE) {
        return estimate_distance_to_sphere(point, object_index);
    }
    if (u_object_types[object_index] == TYPE_MANDELBULB) {
        return estimate_distance_to_mandelbulb(point, object_index);
    }
    return INFINITY;
}

float combine_distance(float dist, float new_dist) {
    return min(dist, new_dist);
}

float distance_estimator(vec3 point) {
    float dist = INFINITY;
    for (uint i = uint(0); i < u_object_count; ++i) {
        dist = combine_distance(dist, estimate_distance_to_object(point, i));
    }
    return dist;
}

const uint MAX_MARCH_STEPS = uint(256);

// todo: add coloring modes (for normal scenes and for fractals)
vec3 color_from_steps(uint steps) {
    float gray = 1.0 - float(steps) / float(MAX_MARCH_STEPS);
    float r = gray;
    float g = gray;
    float b = 0.0;
    return vec3(r, g, b);
}

vec3 march(vec3 origin, vec3 direction) {
    float total_distance = 0.0;
    uint steps = uint(0);
    for (; steps < MAX_MARCH_STEPS; ++steps) {
        vec3 point = origin + direction * total_distance;
        float dist = distance_estimator(point);
        total_distance += dist;
        if (dist < EPS) {
            break;
        }
    }
    return color_from_steps(steps);
}

out vec4 out_color;

void main() {
    out_color = vec4(march(u_camera_position, normalize(camera_direction)), 1);
    // out_color = vec4(normalize(camera_direction), 1);
}