const http = require("http");

export default function updateData(app) {

    http.get('http://127.0.0.1:5000/', (res) => {
        const { statusCode } = res;

        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                'Status Code: ${statusCode}\nIts possible the server hasnt started yet');
        }
        if (error) {
            console.error(error.message);
            // consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                app.setState(JSON.parse(rawData));
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });

}
