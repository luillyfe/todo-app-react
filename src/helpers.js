export const generateId = () =>
    Math.random().toString(36) + new Date().getSeconds().toString(36);