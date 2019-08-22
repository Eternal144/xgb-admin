
export const getBannerInfo = () => {
    return {
        apiPath: `admin/banner`,
        request: {
            method: "GET",
            mode: 'no-cors',
        }
    }
}

export const addBanner = () => {
    return {
        apiPath: `admin/banner`,
        request: {
            method: "POST",
            mode: 'no-cors',
        }
    }
}

export const editBanner = () => {
    return {
        apiPath: `admin/banner`,
        request: {
            method: "PUT",
            mode: 'no-cors',
        }
    }
}


export const delBanner = () => {
    return {
        apiPath: `admin/banner`,
        request: {
            method: "DELETE",
            mode: 'no-cors',
        }
    }
}


export const showMessageList = (id) => {
    return {
        apiPath: `admin/BMessage/${id}`,
        request: {
            method: "GET",
            mode: 'no-cors',
        }
    }
}