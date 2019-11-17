//上传图片
export const uploadPic = (file) => {
    let formdata = new FormData();
    formdata.append("file", file)
    return {
        apiPath: 'uploadPic',
        request: {
            body: formdata,
            method: "POST",
        }
    }
}

//上传附件
export const uploadApp = (file) => {
    let formdata = new FormData();
    formdata.append("file", file)
    return {
        apiPath: 'uploadApp',
        request: {
            body: formdata,
            method: "POST",
        }
    }
}

