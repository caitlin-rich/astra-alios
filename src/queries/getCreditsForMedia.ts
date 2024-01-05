//so this is to get an aggregate list of every person_id for every actor that has appeared in the searched show
//seems like best practice will be to return the whole object and then parse elsewhere? 
import { axiosGet } from "./axiosInstances"


export const getCreditsForMedia = async (seriesId: string) => {
    try {
      const currentSeason = await axiosGet(`/3/tv/${seriesId}/credits`)
      const aggregateSeason = await axiosGet(`/3/tv/${seriesId}/aggregate_credits`)

      const credits = [...currentSeason.data.cast, ...aggregateSeason.data.cast]
      const creditIds = credits.map(credit => credit.id.toString())

      return creditIds
    }
      catch(e: any) {
        console.log("Unable to get credits.")
    }

  
  }

