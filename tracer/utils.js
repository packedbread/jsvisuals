export default {
    pi: 3.14159265359,
    constrain: function (value, min, max) {
        return Math.max(Math.min(max, value), min);
    }
}