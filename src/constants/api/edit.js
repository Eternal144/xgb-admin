export const postNewsMessage = (nav_id, title, pic, icon, content, appendix, remark) => {
    let formdata = new FormData();
    formdata.append("nav_id", nav_id);
    formdata.append("title", title);
    formdata.append("picture", pic);
    formdata.append("icon", icon);
    formdata.append("content", content);
    formdata.append("appendix", appendix);
    formdata.append("remark", remark);

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

export const postActivityMessage = (nav_id, title, pic, icon, details, speaker, locate, time, date, appendix, remark) => {
    let formdata = new FormData();
    formdata.append("nav_id", nav_id);
    formdata.append("title", title);
    formdata.append("picture", pic);
    formdata.append("icon", icon);
    formdata.append("details", details);
    formdata.append("speaker", speaker);
    formdata.append("location", locate);
    formdata.append("start_time", time);
    formdata.append("start_date", date);
    formdata.append("appendix", appendix);
    formdata.append("remark", remark);
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

export const editMessage = (nav_id, id) => {
    return {
        apiPath: `admin/message/${nav_id}/${id}`,
        request: {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    }
}

export const editNewsMessage = (id, nav_id, title, pic, icon, content, appendix, remark) => {
    let formdata = new FormData();
    formdata.append("id", id);
    formdata.append("nav_id", nav_id);
    formdata.append("title", title);
    formdata.append("picture", pic);
    formdata.append("icon", icon);
    formdata.append("content", content);
    formdata.append("appendix", appendix);
    formdata.append("remark", remark);

    return {
        apiPath: `admin/update/${id}`,
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

export const editActivityMessage = (id, nav_id, title, pic, icon, details, speaker, locate, time, date, appendix, remark) => {
    let formdata = new FormData();
    formdata.append("id", id);
    formdata.append("nav_id", nav_id);
    formdata.append("title", title);
    formdata.append("picture", pic);
    formdata.append("icon", icon);
    formdata.append("details", details);
    formdata.append("speaker", speaker);
    formdata.append("location", locate);
    formdata.append("start_time", time);
    formdata.append("start_date", date);
    formdata.append("appendix", appendix);
    formdata.append("remark", remark);
    return {
        apiPath: `admin/update/${id}`,
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