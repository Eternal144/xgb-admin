export const getCateLists = () => {
    return {
        apiPath: 'admin/category',
        request: {
            method: 'GET'
        }
    }
}

//有别的组件在使用
export const getCategory = () => {
    return {
        apiPath: `admin/category`,
        request: {
            method: 'GET',
            mode: 'no-cors',
        }
    }
}

export const getAllCat = () => {
    return {
        url: 'admin/allCat',
        request: {
            method: 'GET',
        }
    }
}

export const addCate = (body) => {
    return {
        url: 'admin/addCat',
        request: {
            body: body,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
}

export const updateCate = (body, id) => {
    return {
        url: `admin/upCat/${id}`,
        request: {
            body: body,
            method: 'POST',
        }
    }
}

export const deleteCate = (id) => {
    return {
        url: `admin/delCat/${id}`,
        request: {
            method: 'GET'
        }
    }
}
