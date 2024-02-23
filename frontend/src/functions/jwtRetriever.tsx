export function takeRoleFromJwt(jwt: string): string | null {
    try {
        const token = jwt.split('.')[1];
        const decodedToken = JSON.parse(atob(token));
        const roleKey = Object.keys(decodedToken).find(key => key.includes('identity/claims/role'));

        if (roleKey) {
            const role = decodedToken[roleKey];
            return role;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}