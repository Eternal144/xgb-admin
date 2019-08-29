
export const getNaviInfo = () => {
    return {
        apiPath: `admin/nav`,
        request: {
            method: "GET",
            mode: 'no-cors',
        }
    }
}

export const addNav = (body) => {
    return {
        apiPath: 'admin/addnav',
        request: {
            body: body,
            method: "POST",
        }
    }
}
