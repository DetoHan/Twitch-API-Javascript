/**
 * Starts a commercial on a specified channel.
 * @param {string} client_id Twitch Application public Client-ID
 * @param {string} bearerCode Twitch logined Acces Token
 * @param {string} broadcaster_id 	ID of the channel requesting a commercial Minimum: 1 Maximum: 1
 * @param {integer} length Desired length of the commercial in seconds. Valid options are 30, 60, 90, 120, 150, 180.
 */

 function startCommercial(client_id, bearerCode, broadcaster_id, length) {
    switch (arguments.length) {
        case 3:
            switch (length) {
                case 30 || 60 || 90 || 120 || 150 || 180:
                    return fetch(`https://api.twitch.tv/helix/channels/commercial`, {
                        headers: {
                            Authorization: `Bearer ${bearerCode}`,
                            "Client-Id": client_id,
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({
                            'broadcaster_id': broadcaster_id,
                            'length': length
                        })
                    })
                    .then(response => {console.log(response); response.json()})
                    .then(data => {console.log(data); return data})
                default:
                    throw "Desired length of the commercial in seconds. Valid options are 30, 60, 90, 120, 150, 180.";
            }
    }
}

/**
 * Gets a URL that Extension developers can use to download analytics reports (CSV files) for their Extensions. The URL is valid for 5 minutes. If you specify a future date, the response will be “Report Not Found For Date Range.” If you leave both started_at and ended_at blank, the API returns the most recent date of data
 * @param {string} client_id Twitch Application public Client-ID
 * @param {string} bearerCode Twitch logined Acces Token
 * @param {string} after Cursor for forward pagination: tells the server where to start fetching the next set of results, in a multi-page response. This applies only to queries without extension_id. If an extension_id is specified, it supersedes any cursor/offset combinations. The cursor value specified here is from the pagination response field of a prior query.
 * @param {string} ended_at Ending date/time for returned reports, in RFC3339 format with the hours, minutes, and seconds zeroed out and the UTC timezone: YYYY-MM-DDT00:00:00Z. The report covers the entire ending date; e.g., if 2018-05-01T00:00:00Z is specified, the report covers up to 2018-05-01T23:59:59Z. If this is provided, started_at also must be specified. If ended_at is later than the default end date, the default date is used. Default: 1-2 days before the request was issued (depending on report availability).
 * @param {string} extension_id Client ID value assigned to the extension when it is created. If this is specified, the returned URL points to an analytics report for just the specified extension. If this is not specified, the response includes multiple URLs (paginated), pointing to separate analytics reports for each of the authenticated user’s Extensions.
 * @param {integer} first Maximum number of objects to return. Maximum: 100. Default: 20.
 * @param {string} started_at Starting date/time for returned reports, in RFC3339 format with the hours, minutes, and seconds zeroed out and the UTC timezone: YYYY-MM-DDT00:00:00Z. This must be on or after January 31, 2018. If this is provided, ended_at also must be specified. If started_at is earlier than the default start date, the default date is used.  The file contains one row of data per day.
 * @param {string} type Type of analytics report that is returned. Currently, this field has no affect on the response as there is only one report type. If additional types were added, using this field would return only the URL for the specified report. Limit: 1. Valid values: "overview_v2".
 */

function getExtensionAnalytics(client_id, bearerCode, after, ended_at, extension_id, first, started_at, type) {
    let options = {
        headers: {
            Authorization: `Bearer ${bearerCode}`,
            "Client-Id": client_id
        }
    };
    switch (arguments.length) {
        case 2:
            break;
        case 3:
            options['after'] = after;
            break;
        case 4:
            options['after'] = after;
            options['ended_at'] = ended_at;
            break;
        case 5:
            options['after'] = after;
            options['ended_at'] = ended_at;
            options['extension_id'] = extension_id;
            break;
        case 6:
            options['after'] = after;
            options['ended_at'] = ended_at;
            options['extension_id'] = extension_id;
            options['first'] = first;
            break;
        case 7:
            options['after'] = after;
            options['ended_at'] = ended_at;
            options['extension_id'] = extension_id;
            options['first'] = first;
            options['started_at'] = started_at;
            break;
        case 8:
            options['after'] = after;
            options['ended_at'] = ended_at;
            options['extension_id'] = extension_id;
            options['first'] = first;
            options['started_at'] = started_at;
            options['type'] = type;
            break;
        default:
            throw "Parameter Problems."
    }
    return fetch("https://api.twitch.tv/helix/analytics/extensions", options)
    .then(response => response.json())
    .then(data => {return data})
}

/**
 * 
 * @param {string} client_id
 * @param {string} bearerCode 
 * @param {string} broadcaster_id 
 * @param {string} game 
 * @param {string} title 
 * @param {integer} delay 
 * @param {string} language 
 */

 function modifyChannelInformation(client_id, bearerCode, broadcaster_id, game_id, title, delay, language) {
    let data;
	switch (arguments.length) {
		case 4:
            data = {
                "game_id": game_id,
                "title": title
            }
			break;
		case 5:
            data = {
                "game_id": game_id,
                "title": title,
                "delay": delay
            }
			break;
        case 6:
            data = {
                "game_id": game_id,
                "title": title,
                "delay": delay,
                "broadcaster_language": language
            }
            break;
        default: 
            throw "Parameter problems."
	}
	fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${broadcaster_id}`, {
		headers: {
			Authorization: `Bearer ${bearerCode}`,
			'Client-Id': client_id,
			'Content-type': 'application/json; charset=UTF-8'
		},
		method: 'PATCH',
		body: JSON.stringify(data)
	})
}