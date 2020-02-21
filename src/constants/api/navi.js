

export const getNaviInfo = () => {
    return {
        apiPath: `admin/navigation`,
        request: {
            method: 'GET',
            // mode: 'no-cors',

        }
    }
}

export const addNav = (body) => {
    return {
        apiPath: 'admin/addnav',
        request: {
            body: body,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // mode: 'no-cors',

        }
    }
}



export const getSecNaviList = (id) => {
    return {
        apiPath: `admin/secNav/${id}`,
        request: {
            method: 'GET',
            // mode: 'no-cors'
        }
    }
}

//分页获取所有文章的第一页的内容。
export const getmessageList = (id, page) => {
    return {
        apiPath: `admin/messageList/${id}/${page}`,
        request: {
            method: 'GET',
            // mode: 'no-cors'
        }
    }
}
//获取二级导航下所有文章
export const getNavAllArtivle = (id) => {
    return {
        apiPath: `admin/allMessage/${id}`,
        request: {
            method: 'GET',
            // mode: 'no-cors'
        }
    }
}

export const updateNav = (body) => {
    return {
        apiPath: `admin/updatenav`,
        request: {
            body: JSON.stringify(body),
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
}
//获取该二级导航下所有文章的title和它的id。
export const getArticleTitle = (nav_id) => {
    return {
        apiPath: `admin/list/${nav_id}`,
        request: {
            method: 'GET',
            // mode: 'no-cors'
        }
    }
}


//修改以后

// 获取所有的导航信息
export const getNaviLists = () => {
    return {
        apiPath: `admin/menu`,
        request: {
            method: 'GET',
        }
    }
}

// 添加新导航
export const addNewNavi = (body) => {
    return {
        url: `admin/menu`,
        request: {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
}

// 删除导航
export const deleteNavi = (id) => {
    return {
        apiPath: `admin/delMenu/${id}`,
        request: {
            method: 'GET',
        }
    }
}

// 更新导航
export const updateNavi = (id, body) => {
    return {
        apiPath: `admin/menu/${id}`,
        request: {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
}

export const saveSecNavSort = (body) => {
    return {
        apiPath: `admin/rankMenu`,
        request: {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
}



