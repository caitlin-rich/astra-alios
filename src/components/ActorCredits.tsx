import { useEffect, useState } from "react"
import { Card, Typography } from "@material-ui/core"
import { getCreditsForMedia, getActorCredits } from "../queries"

   //TODO
   //get star trek character info
   //how to combine duplicates but also show all star treks they were in
   //how to combine all shows into one line per actor
   //formatting babey!!!!! 
   //can i get their picture? (yes, see new query)
   //oh i should link to their TMDB page
   //goal should be to have 'so and so was in DS9!' with their picture, and then you accordion display the details of each searched show and star trek they were in, maybe like in a little grid


//TODO fix this type
type CreditsForMediaType = {
        id: string,
        name: any,
        roles: any
        character: any,
        totalEpisodeCount: any,
        trekIds: number[]
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
    const [actors, setActors] = useState<CreditsForMediaType[]>([])


    const trekSeriesIds: TrekIdsType = {
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
                const {id, name, character, roles, totalEpisodeCount} = credit
                return {
                    id,
                    name,
                    character,
                    roles,
                    totalEpisodeCount: totalEpisodeCount
                }
            })
            castData && setCreditsForMedia(castData)
          }

         
        }
        getCredits()
    }
      }, [seriesInfo])

    useEffect(()=>{

        //I think this has gotten wildly convoluted and out of hand. I also think this could be its own module. 
        //let's rewrite this whole thing. i bet a million doll hairs this could be way simpler. 

        creditsForMedia && creditsForMedia.map(async credit => {
            credit.trekIds = []
            const actorId = credit.id
            const actorCredits = await getActorCredits(actorId)
            
            actorCredits && actorCredits.cast.map((show: any) => {
                const showId = show.id.toString()
                
                if (trekSeriesIds.hasOwnProperty(showId)) {   
                    if (actors.some((each: CreditsForMediaType) => each.id === credit.id)) {
                        if (!credit.trekIds.find(each => each === showId)) credit.trekIds.push(showId)
                        return
                    }
                    credit.trekIds.push(showId)
                    actors.push(credit)
                    setActors([...actors])
                }
            })
        })
    }, [creditsForMedia])




  return (  
    <div>{actors.length > 0 ? actors.map((actor: CreditsForMediaType) => 
            {
                const { name, roles, totalEpisodeCount, trekIds } = actor

                const characters = (actor && roles) ? roles.map((role: any) => role.character).join(' and ') : "a role"
                const treks = trekIds.map((id: number) => `Star Trek: ${trekSeriesIds[id as unknown as keyof TrekIdsType]}`).join(' and ')

                return (
                    <>
                        <Card variant="outlined">
                                <Typography>
                                    {`${name}, who played ${characters} in ${totalEpisodeCount || ""} episodes of ${seriesTitle}, was in ${treks}`}
                                    
                                </Typography>
                            
                        </Card>
                        <br></br>
                    </>
                )
            }
        ) : "LOADING"}</div>
  )
}
