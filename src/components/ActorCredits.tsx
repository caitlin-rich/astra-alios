import { useEffect, useState } from "react"
import { getCreditsForMedia } from "../queries/getCreditsForMedia"
import getActorCredits from "../queries/getActorCredits"

type ActorCreditsType = {
    seriesId: string
}

export default function ActorCredits({seriesId}: ActorCreditsType) {

    const [creditsForMedia, setCreditsForMedia] = useState<string[]>()

    useEffect(() => {
        const getCredits = async () => {
          const data = await getCreditsForMedia(seriesId)
          setCreditsForMedia(data)
        }
        getCredits()
      }, [seriesId])

    // need to map through credits for media and get actor credits for each in a use effect!! 

    useEffect(()=>{
        creditsForMedia && creditsForMedia.map(async credit => {
            const actorCredits = await getActorCredits(credit)
            actorCredits && actorCredits.cast.map((show: any) => {
                console.log('in nested map: ', show.id)
            })
        })
    }, [creditsForMedia])

   


  return (
    <div>{seriesId}</div>
  )
}
