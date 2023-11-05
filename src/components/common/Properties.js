export const properties = {
    apiUrl: "https://api.unsplash.com",
    loginUrl: "https://unsplash.com/oauth/token",
    dataUrls: {
        profile: "",
        portfolio: "/portfolio",
        collections: "/collections",
        likedPhotos: "/likes",
        photos: "/photos",
        stats: "/statistics"
    },
    like: "/like",
    self: "/me",
    userPublic: [
        {
            name: "Profile",
            path: "/public/profile"
        },
        {
            name: "Photos",
            path: "/public/photos"
        },
        {
            name: "Liked Photos",
            path: "/public/liked_photos"
        },
        {
            name: "Collections",
            path: "/public/collections"
        },
        {
            name: "Statistics",
            path: "/public/stats"
        }
    ],
    userPrivate: [
        {
            name: "Profile",
            path: "/profile"
        },
        {
            name: "Photos",
            path: "/photos"
        },
        {
            name: "Liked Photos",
            path: "/liked_photos"
        },
        {
            name: "Collections",
            path: "/collections"
        },
        {
            name: "Statistics",
            path: "/stats"
        }
    ]
}

