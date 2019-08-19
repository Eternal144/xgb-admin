
export const getBannerInfo = ()=> {
    return{
        apiPath:`admin/banner`,
        request:{
            method:"GET",
            mode:'no-cors',
        }
    }
}
