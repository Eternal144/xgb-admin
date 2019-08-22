//上传图片
export const uploadPic = (body) => {
    return {
        apiPath: 'uploadPic',
        request: {
            body: body,
            method: "POST",
        }
    }
}

//上传附件
export const uploadApp = (body) => {
    return {
        apiPath: 'uploadApp',
        request: {
            body: body,
            method: "POST",
        }
    }
}

