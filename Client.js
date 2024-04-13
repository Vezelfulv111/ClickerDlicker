import fetch from "node-fetch";

const postData = async () => {
    const data = "Albania:1";

    const response = await fetch('http://localhost:8004', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: data
    });

    const responseData = await response.text();
    console.log(responseData);
};

setInterval(postData, 1000);