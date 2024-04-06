const postData = async () => {
    const data = "Hello, World";

    const response = await fetch('http://localhost:8003', {
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