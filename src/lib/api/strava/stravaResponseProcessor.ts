import {
    Athlete,
    AthleteRun,
    StravaAPIResponseActivity,
    StravaAPIResponseAuthenticatedAthlete,
} from './interface'

// Let's use this response processor to normalize and filter down responses from the strava API
export const stravaResponseProcessor = () => {
    const processAthlete = (
        response: StravaAPIResponseAuthenticatedAthlete
    ): Athlete => {
        return {
            id: response.id,
            username: response.username,
            firstName: response.firstname,
            lastName: response.lastname,
        }
    }

    const processActivities = (
        response: StravaAPIResponseActivity[]
    ): AthleteRun[] => {
        return response
            .filter((activity) => activity.type === 'Run')
            .slice(0, 5)
            .map((activity) => {
                return {
                    distance: activity.distance,
                    movingTime: activity.moving_time,
                    elapsedTime: activity.elapsed_time,
                    totalElevationGain: activity.total_elevation_gain,
                    type: activity.type,
                    averageSpeed: activity.average_speed,
                    maxSpeed: activity.max_speed,
                    averageCadence: activity.average_cadence,
                    averageWatts: activity.average_watts,
                    maxWatts: activity.max_watts,
                    weightedAverageWatts: activity.weighted_average_watts,
                    kilojoules: activity.kilojoules,
                    averageHeartrate: activity.average_heartrate,
                    maxHeartrate: activity.max_heartrate,
                    elevHigh: activity.elev_high,
                    elevLow: activity.elev_low,
                } as AthleteRun
            })
    }

    return {
        processAthlete,
        processActivities,
    }
}
