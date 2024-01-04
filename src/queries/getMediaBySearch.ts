import { axiosGet } from "./axiosInstances"

const getMediaBySearch = async (searchTerm: string) => {

  try {
    const res = await axiosGet(`/3/search/tv?query=${searchTerm}&include_adult=false&language=en-US&page=1`)
    return res.data
  }
    catch(e: any) {
      console.log("Unable to search database.")
  }

}

export default getMediaBySearch
