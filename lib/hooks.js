import useSWR from "swr"

export function useTopic(topic, host, username) {
    const { data, error } = useSWR(`${host}/${topic}`, url => fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username
        })
    }).then(res => res.json()))

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        title: topic.toUpperCase().charAt(0) + topic.slice(1)
    }
}

export function useMedia(host, username) {
    var media = [useTopic("documents", host, username),
    useTopic("images",host , username),
    useTopic("videos", host, username)]
    const isLoading=media.map(m => m.isLoading).reduce((a, b) => a || b)
    return {
        media: Object.fromEntries(new Map(media.map(m => [m.title, isLoading?m.data:(m.data.media)]))),
        userMedia: Object.fromEntries(new Map(media.map(m => [m.title, isLoading?m.data:(m.data.user_media)]))),
        isLoading,
        isError: media.map(m => m.isError).reduce((a, b) => a || b)
    }
}