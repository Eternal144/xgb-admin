//获取二级导航下所有文章
export const getNavAllArticle = (id) => {
    return {
        apiPath: `admin/allMessage/${id}`,
        request: {
            method: 'GET',
        }
    }
}

// //获取该二级导航下所有文章的title和它的id。
export const getArticleTitle = (nav_id) => {
    return {
        apiPath: `admin/list/${nav_id}`,
        request: {
            method: 'GET',
            // mode: 'no-cors'
        }
    }
}


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



