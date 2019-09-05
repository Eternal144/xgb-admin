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

export const updateLowwer = (body, model, id) => {
    return {
        apiPath: 'admin/updateLowwer/' + model + '/' + id,
        request: {
            method: "POST",
            body: body,
        }
    }
}

export const addlowwer = (body) => {
    return {
        apiPath: 'admin/addlowwer',
        request: {
            method: "POST",
            body: body,
        }
    }
}

export default () => {
    return;
}