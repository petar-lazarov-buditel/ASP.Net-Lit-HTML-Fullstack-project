const host = 'http://localhost:5297';

export async function deleteMethod(url, user) {

    const userData = user; //localStorage.getItem('authData'));
    let isLoggedin = userData != null;
    console.log('userData ' + userData);

    if (isLoggedin) {
   

        const options = {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }

        return await fetch(host+url, options);

    }
    return
}