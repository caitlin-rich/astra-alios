import { axiosGet } from "./axiosInstances"

const getActorCredits = async (personId: string) => {

  try {
    const res = await axiosGet(`/3/person/${personId}/tv_credits`)
    return res.data
  }
    catch(e: any) {
      console.log("Unable to search database.")
  }

}

export default getActorCredits

