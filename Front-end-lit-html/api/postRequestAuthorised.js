const host = 'http://localhost:5297';

export async function postRequestAuthorized(url, user, data) {
    if (user) {
        const options = {
            method: 'POST'
        };
        
        if (data != undefined) {
            options.headers = { 'Content-Type': 'application/json' };
            options.body = JSON.stringify(data);
        }
        if (!options.headers) {
            options.headers = {};
        }
        
        const token = user.token;
        options.headers['Authorization'] = `Bearer ${token}`;
        //console.log(options);

        try {
            const responseObject = await fetch(host + url, options);

            if (responseObject.ok != true) {
                const error = await responseObject.json();
                throw new Error(error.message);
            }
            return responseObject.json();
        } catch (error) {
            throw error;
        }
    }
    else {
        return
    }

}
