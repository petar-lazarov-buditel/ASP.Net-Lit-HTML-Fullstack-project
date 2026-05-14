const host = 'http://localhost:5297';

export async function getRequest(url){
const options = {
        method: 'GET'
    };
    try {
        const responseObject = await fetch(host + url, options);
        
        if (responseObject.ok != true) {
            const error = await responseObject.json();
            throw new Error(error.message);
        }
        //console.log('response');
        //console.log(await responseObject.json());
        return responseObject.json();
    } catch (error) {
        throw error;
    }
}