import { useEffect, useState } from "react"
import { getCreditsForMedia } from "../queries/getCreditsForMedia"
import getActorCredits from "../queries/getActorCredits"

type SeriesInfoType = {
    seriesInfo: {
        seriesId: string | undefined
        seriesTitle: string | undefined
    }
}

//TODO fix this type
type CreditsForMediaType = {
    id: any,
    name: any,
    roles: any
    character: any,
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

//TODO fix this type
export default function ActorCredits({seriesInfo}: any) {

   const { seriesId, seriesTitle } = seriesInfo

    const [creditsForMedia, setCreditsForMedia] = useState<CreditsForMediaType[] | undefined>()
    
    useEffect(() => {
        if (seriesInfo) {
            const getCredits = async () => {
          const data = await getCreditsForMedia(seriesId)

          if (data) {
            const castData = data.map((credit: CreditsForMediaType) => {
                const {id, name, character, roles} = credit
                return {
                    id,
                    name,
                    character,
                    roles
                }
            })
            setCreditsForMedia(castData)
          }

          console.log('IN USE EFFECT', data)
          setCreditsForMedia(data as unknown as CreditsForMediaType[])
        }
        getCredits()
    }
      }, [seriesInfo])

    useEffect(()=>{
        const trekIds: TrekIdsType = {
            '253': 'The Original Series',
            '1992': 'The Animated Series',
            '655': 'The Next Generation',
            '580': 'Deep Space Nine',
            '1855': 'Voyager',
            '314': 'Enterprise',
            '67198': 'Discovery',
            '85949': 'Picard',
            '85948': 'Lower Decks',
            '103516': 'Strange New Worlds',
            '106393': 'Prodigy',
            '82491': 'Short Treks' 
         }

        creditsForMedia && creditsForMedia.map(async credit => {
            const actorCredits = await getActorCredits(credit.id)
            

            actorCredits && actorCredits.cast.map((show: any) => {
                const id = show.id.toString()

            
                if (trekIds.hasOwnProperty(id)) console.log(`${credit.name}, who played ${credit.character} in ${seriesTitle} was in ${trekIds[id as keyof TrekIdsType]}`)
                
            })
        })
    }, [creditsForMedia])

   


  return (
    <div>Actors Go Here</div>
  )
}
