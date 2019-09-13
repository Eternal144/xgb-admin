
export const getBannerInfo = () => {
    return {
        apiPath: `admin/banner`,
        request: {
            method: "GET",
            mode: 'no-cors',
        }
    }
}

export const addBanner = (pic, title, nav_id, mes_id, rank) => {
    let formdata = new FormData();
    formdata.append("picture", pic);
    formdata.append("title", title);
    formdata.append("nav_id", nav_id);
    formdata.append("mes_id", mes_id);
    formdata.append("rank", rank);
    return {
        apiPath: `admin/banner`,
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

export const editBanner = (pic, title, nav_id, mes_id, rank, id) => {
    let formdata = new FormData();
    formdata.append("picture", pic);
    formdata.append("title", title);
    formdata.append("nav_id", nav_id);
    formdata.append("mes_id", mes_id);
    formdata.append("rank", rank);
    return {
        apiPath: `admin/banner/` + id,
        request: {
            method: "PUT",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: formdata,
        }
    }
}


export const delBanner = (id) => {
    return {
        apiPath: `admin/delbanner/` + id,
        request: {
            method: "GET",
            mode: 'no-cors',
        }
    }
}


export const showMessageList = (id) => {
    return {
        apiPath: `admin/BMessage/${id}`,
        request: {
            method: "GET",
            mode: 'no-cors',
        }
    }
}