export const removeArticle = (now_nav, new_nav, body) => {
    return {
        apiPath: `admin/remove/${now_nav}/${new_nav}`,
        request: {
            body: JSON.stringify(body),
            method: 'POST',
            mode: 'no-cors',
        }
    }
}

export const deleteArticle = (now_nav, body) => {
    return {
        apiPath: `admin/del/${now_nav}`,
        request: {
            body: JSON.stringify(body),
            method: 'POST',
            mode: 'no-cors'
        }
    }
}