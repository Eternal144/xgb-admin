

export const getNaviInfo = ()=> {
    return{
        apiPath:`admin/nav`,
        request:{
            method:'GET',
            mode:'no-cors',

        }
    }
}

export const addNav = (body)=>{
    return{
        apiPath:'admin/addnav',
        request:{
            body:body,
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            mode:'no-cors',

        }
    }
}

export const deleteNavi = (id)=>{
    return{
        apiPath:`admin/delnav/${id}`,
        request:{
            method:'GET',
            mode:'no-cors',
        }
    }
}
export const getSecNaviList = (id) => {
    return{
        apiPath:`admin/secNav/${id}`,
        request:{
            method:'GET',
            mode:'no-cors'
        }
    }
}

export const getmessageList = (id,page)=>{
    return{
        apiPath:`admin/messageList/${id}/${page}`,
        request:{
            method: 'GET',
            mode: 'no-cors'
        }
    }
}

export const updateNav = (body)=>{
    return{
        apiPath:`admin/updatenav`,
        request:{
            body:JSON.stringify(body),
            method: 'POST',
            mode: 'no-cors',
            headers:{
                'Content-Type':'application/json',
            },
        }
    }
}


