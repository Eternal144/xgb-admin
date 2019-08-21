
export const getBannerInfo = () => {
    return {
        apiPath: `banner`,
        request: {
            method: "GET",
            mode: 'no-cors',
        }
    }
}

export const addBanner = () => {
    return {
        apiPath: `banner`,
        request: {
            method: "POST",
            mode: 'no-cors',
        }
    }
}

export const editBanner = () => {
    return {
        apiPath: `banner`,
        request: {
            method: "PUT",
            mode: 'no-cors',
        }
    }
}


export const delBanner = () => {
    return {
        apiPath: `banner`,
        request: {
            method: "DELETE",
            mode: 'no-cors',
        }
    }
}


export const showMessageList = (id) => {
    return {
        apiPath: `BMessage/${id}`,
        request: {
            method: "GET",
            mode: 'no-cors',
        }
    }
}