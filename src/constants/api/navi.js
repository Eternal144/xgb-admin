

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
            method:'PUT',
            mode:'no-cors',
        }
    }
}

