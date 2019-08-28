//上传图片
export const uploadPic = (file) => {
    return {
        apiPath: 'uploadPic',
        request: {
            file: file,
            method: "POST",
        }
    }
}

//上传附件
export const uploadApp = (file) => {
    return {
        apiPath: 'uploadApp',
        request: {
            file: file,
            method: "POST",
        }
    }
}

