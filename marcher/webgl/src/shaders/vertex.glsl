#version 300 es

in vec4 a_position;
in vec3 a_direction;

out vec3 camera_direction;

void main() {
    gl_Position = a_position;
    camera_direction = a_direction;
}