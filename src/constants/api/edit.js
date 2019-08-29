export const postMessage = (nav_id, title, pic, icon, content, appendix) => {
    let formdata = new FormData();
    formdata.append("nav_id", nav_id);
    formdata.append("title", title);
    formdata.append("picture", pic);
    formdata.append("icon", icon);
    formdata.append("content", content);
    formdata.append("appendix", appendix);

    return {
        apiPath: `admin/add`,
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

export const delMessage = (nav_id, id) => {
    return {
        apiPath: `admin/del/${nav_id}/${id}`,
        request: {
            method: "POST",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
        }
    }
}