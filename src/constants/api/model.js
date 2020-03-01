export const messageList = (nav_id) => {
    return {
        apiPath: 'admin/BMessage/' + nav_id,
        request: {
            method: "GET",
        }
    }
}

export const updateUpper = (model, body) => {
    return {
        apiPath: `admin/upper/${model}`,
        request: {
            body: body,
            method: "POST",
        }
    }
}

export const upperModelPreview = () => {
    return {
        apiPath: 'admin/upper',
        request: {
            method: "GET",
        }
    }
}

//请求下面四个的数据
export const lowwerModelPreview = (name) => {
    return {
        apiPath: 'admin/lowwer/' + name,
        request: {
            method: "GET",
        }
    }
};

export const updateLowwer = (model, body) => {
    return {
        apiPath: `admin/uplowwer/${model}`,
        request: {
            method: "POST",
            body: JSON.stringify(body),
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

// export default () => {
//     return;
// }