import { axiosGet } from "./axiosInstances"

export const getMediaBySearch = async (searchTerm: string) => {
  try {
    const res = await axiosGet(`/3/search/tv?query=${searchTerm}&include_adult=false&language=en-US&page=1`)
    return res.data
  }
    catch(e: any) {
      console.log("Unable to search database.")
  }

}

export const getCreditsForMedia = async (seriesId: string) => {
    try {
      const currentSeason = await axiosGet(`/3/tv/${seriesId}/credits`)
      const aggregateSeason = await axiosGet(`/3/tv/${seriesId}/aggregate_credits`)

      const credits = currentSeason.data.cast.concat(aggregateSeason.data.cast)

      return credits
    }
      catch(e: any) {
        console.log("Unable to get credits.", e.message)
    }
  }


export const getActorInfo = async (personId: string) => {
    try {
      const res = await axiosGet(`/3/person/${personId}`)
      return res.data
    }
      catch(e: any) {
        console.log("Unable to search database for Actor Information.")
    }
  }

export const getActorImage = async (searchTerm: string) => {
    try {
      const res = await axiosGet(`/3/person/${searchTerm}/images`)
      return res.data
    }
      catch(e: any) {
        console.log("Unable to retrieve actor image.")
    }
  }

export const getActorCredits = async (personId: string) => {
    try {
      const res = await axiosGet(`/3/person/${personId}/tv_credits`)
      return res.data
    }
      catch(e: any) {
        console.log("Unable to search database for Actor Credits.", e.message)
    }
  }