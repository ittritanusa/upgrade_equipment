export const encodeId = (id) => {
    if (!id) return '';
    return btoa(id.toString()).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

export const decodeId = (encoded) => {
    if (!encoded) return null;
    try {
        return atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
    } catch (e) {
        return null;
    }
};