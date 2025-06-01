export interface StravaAccessToken {
    access_token: string
}

export interface Athlete {
    id: number
    username: string
    firstName: string
    lastName: string
}

export interface AthleteRun {
    distance: number
    movingTime: number
    elapsedTime: number
    totalElevationGain: number
    type: 'Run'
    averageSpeed: number
    maxSpeed: number
    averageCadence: number | null
    averageWatts: number | null
    maxWatts: number | null
    weightedAverageWatts: number | null
    kilojoules: number | null
    averageHeartrate: number | null
    maxHeartrate: number | null
    elevHigh: number | null
    elevLow: number | null
}

export interface StravaAPIResponseAuthenticatedAthlete {
    id: number
    username: string
    resource_state: number
    firstname: string
    lastname: string
    city: string
    state: string
    country: string
    sex: 'M' | 'F'
    premium: boolean
    created_at: string
    updated_at: string
    badge_type_id: number
    profile_medium: string
    profile: string
    friend: null | string
    follower: null | string
    follower_count: number
    friend_count: number
    mutual_friend_count: number
    athlete_type: number
    date_preference: string
    measurement_preference: 'feet' | 'meters'
    clubs: any[]
    ftp: number | null
    weight: number
    bikes: {
        id: string
        primary: boolean
        name: string
        resource_state: number
        distance: number
    }[]
    shoes: {
        id: string
        primary: boolean
        name: string
        resource_state: number
        distance: number
    }[]
}

export interface StravaAPIResponseActivity {
    id: number
    name: string
    distance: number
    moving_time: number
    elapsed_time: number
    total_elevation_gain: number
    type: string
    sport_type: string
    start_date: string
    start_date_local: string
    timezone: string
    utc_offset: number
    location_city: string | null
    location_state: string | null
    location_country: string | null
    achievement_count: number
    kudos_count: number
    comment_count: number
    athlete_count: number
    photo_count: number
    map: {
        id: string
        summary_polyline: string
        resource_state: number
    }
    trainer: boolean
    commute: boolean
    manual: boolean
    private: boolean
    visibility: string
    flagged: boolean
    gear_id: string | null
    average_speed: number
    max_speed: number
    average_cadence: number | null
    average_watts: number | null
    max_watts: number | null
    weighted_average_watts: number | null
    kilojoules: number | null
    device_watts: boolean
    has_heartrate: boolean
    average_heartrate: number | null
    max_heartrate: number | null
    heartrate_opt_out: boolean
    display_hide_heartrate_option: boolean
    elev_high: number | null
    elev_low: number | null
    upload_id: number
    upload_id_str: string
    external_id: string
    from_accepted_tag: boolean
    pr_count: number
    total_photo_count: number
    has_kudoed: boolean
}

export interface StravaAPIResponseHeartRateZone {
    min: number
    max: number
    time: number
}

export interface StravaAPIResponseHeartRateZones {
    custom_zones: boolean
    zones: StravaAPIResponseHeartRateZone[]
}
