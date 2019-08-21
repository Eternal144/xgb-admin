export const upperModelPreview = (body) => {
    return {
        apiPath: 'upper',
        request: {
            body: body,
            method: "GET",
        }
    }
}

export const lowwerModelPreview = (name) => {
    return {
        apiPath: 'lowwer/' + name,
        request: {
            method: "GET",
        }
    }
};