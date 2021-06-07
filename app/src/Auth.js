export function inOneOfRole(roles, user) {
    if (!Array.isArray(roles) ||
        typeof user !== 'object' ||
        user === null ||
        !Array.isArray(user['https://frandine.randomphp.com/roles'])) {
        return false;
    }
    for (var role of user['https://frandine.randomphp.com/roles']) {
        if (roles.indexOf(role.toLowerCase()) !== -1) {
            return true;
        }
    }
    return false;
}