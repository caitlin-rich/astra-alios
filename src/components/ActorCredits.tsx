import { useEffect, useState } from "react"
import { getCreditsForMedia } from "../queries/getCreditsForMedia"
import getActorCredits from "../queries/getActorCredits"
import { Box } from "@material-ui/core"

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

type ActorInfoType = { actor: CreditsForMediaType; id: string }

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
    const [actors, setActors] = useState<any>([])


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

          setCreditsForMedia(data as unknown as CreditsForMediaType[])
        }
        getCredits()
    }
      }, [seriesInfo])

    useEffect(()=>{

        creditsForMedia && creditsForMedia.map(async credit => {
            const actorCredits = await getActorCredits(credit.id)
            

            actorCredits && actorCredits.cast.map((show: any) => {
                const id = show.id.toString()
                const info = {actor: credit, id: id}
                if (trekIds.hasOwnProperty(id)) {
                   setActors([...actors, actors.push(info)])
                }
            })
        })
    }, [creditsForMedia])

   //TODO
   //how to combine duplicates 
   //how to combine all shows into one line per actor
   //get star trek character info
   //formatting babey!!!!! 
   //can i get their picture? 


  return (
    <div>{actors.length > 0 ? actors.map((info: any) => 
            {
                const { actor, id } = info
                return (
                    <Box>
                        {actor && `${actor.name}, who played [CHARACTER] in ${seriesTitle} was in Star Trek ${trekIds[id as keyof TrekIdsType]}`}
                    </Box>
                )
                // add actors.length-1 thing so if we're still going through the list it's loading? 
            }
        ) : "LOADING"}</div>
  )
}
