export const getLogin = (user, psw) => {
    let formdata = new FormData();
    formdata.append("username", user);
    formdata.append("password", psw);
    return {
        apiPath: `admin/login`,
        request: {
            method: "POST",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: formdata,
        }
    }
}

export const getModify = (user, old_psw, new_psw) => {
    let formdata = new FormData();
    formdata.append("username", user);
    formdata.append("old_pwd", old_psw);
    formdata.append("new_pwd", new_psw);
    return {
        apiPath: `admin/modify`,
        request: {
            method: "POST",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: formdata,
        }
    }
}
