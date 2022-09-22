function startCommercial(broadcaster_id, length, options) {
    switch (length) {
        case 30,60,90,120,150,180:
            fetch(`https://api.twitch.tv/helix/channels/commercial`, {
                broadcaster_id: broadcaster_id,
                length: length,
                headers: {
                    options
                },
                method: "POST"
            })
            .then(res => res.json())
            .then(data => {return data});
            break;
        default:
            throw new Error('Commercial length must be 30, 60, 90, 120, 150 or 180 value.');
    }
}