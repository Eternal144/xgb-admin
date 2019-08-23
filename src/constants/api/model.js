export const upperModelPreview = (body) => {
    return {
        apiPath: 'admin/upper',
        request: {
            body: body,
            method: "GET",
        }
    }
}

export const lowwerModelPreview = (name) => {
    return {
        apiPath: 'admin/lowwer/' + name,
        request: {
            method: "GET",
        }
    }
};