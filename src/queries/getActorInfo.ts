import { axiosGet } from "./axiosInstances"

const getActorInfo = async (personId: string) => {

  try {
    const res = await axiosGet(`/3/person/${personId}`)
    return res.data
  }
    catch(e: any) {
      console.log("Unable to search database for Actor Information.")
  }

}

export default getActorInfo

