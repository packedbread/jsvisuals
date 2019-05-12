async function shader_source(filename) {
    return (await fetch(filename)).text();
}

const PI = 3.14159265359;

export {
    PI,
    shader_source,
};

export default {
    PI,
    shader_source,
};