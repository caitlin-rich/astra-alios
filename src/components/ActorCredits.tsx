import { useEffect, useState } from "react"
import { getCreditsForMedia } from "../queries/getCreditsForMedia"
import getActorCredits from "../queries/getActorCredits"

type ActorCreditsType = {
    seriesId: string
}

type TrekIdsType = {
    '253': string,
    '1992': string,
    '655': string,
    '580': string,
    '1855': string,
    '314': string,
    '67198': string,
    '85949': string,
    '85948': string,
    '103516': string,
    '106393': string,
    '82491': string 
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
        const trekIds: TrekIdsType = {
            '253': 'TOS',
            '1992': 'TAS',
            '655': 'TNG',
            '580': 'DS9',
            '1855': 'VOY',
            '314': 'ENT',
            '67198': 'DIS',
            '85949': 'PIC',
            '85948': 'LWD',
            '103516': 'SNW',
            '106393': 'PRO',
            '82491': 'STT' 
         }

        creditsForMedia && creditsForMedia.map(async credit => {
            const actorCredits = await getActorCredits(credit)
            actorCredits && actorCredits.cast.map((show: any) => {
                const id = show.id
                Object.keys(trekIds).forEach(key => {
                    id === key && window.alert(trekIds[key as keyof TrekIdsType])
                })
            })
        })
    }, [creditsForMedia])

   


  return (
    <div>{seriesId}</div>
  )
}
