import fetch from 'cross-fetch';
export function buildFetch(authToken) {
    return (init, options) => {
        return fetch(init, {
                ...options,
                credentials: "include",
                headers: {
                ...options?.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
    };
}