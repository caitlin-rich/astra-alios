//so this is to get an aggregate list of every person_id for every actor that has appeared in the searched show
//seems like best practice will be to return the whole object and then parse elsewhere? 
import { axiosGet } from "./axiosInstances"


export const getCreditsForMedia = async (series_id: string) => {
    try {
      const currentSeason = await axiosGet(`/3/tv/${series_id}/credits`)
      const aggregateSeason = await axiosGet(`/3/tv/${series_id}/aggregate_credits`)

      //so then we need to get the person_id list for each response, then turn that into a big array. and then compare to all Star Trek person_ids. Did i think that through already? 
      
      
    }
      catch(e: any) {
        console.log("Unable to search database.")
    }

  
  }

