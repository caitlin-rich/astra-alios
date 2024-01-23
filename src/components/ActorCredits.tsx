import { useEffect, useState } from "react"
import { Card, Typography } from "@material-ui/core"
import { getCreditsForMedia, getActorCredits } from "../queries"
import { trekSeriesIds, TrekIdsType } from "./trekInfo"

   //TODO
   //formatting babey!!!!! 
   //can i get their picture? (yes, see new query)
   //oh i should link to their TMDB page
   //goal should be to have 'so and so was in DS9!' with their picture, and then you accordion display the details of each searched show and star trek they were in, maybe like in a little grid



type CreditsForMediaType = {
        id: string,
        name: string,
        roles: string[]
        character: string,
        totalEpisodeCount?: number,
        total_episode_count?: number
        trekIds: {id: number, character: string}[]
}

//TODO fix this type
export default function ActorCredits({seriesInfo}: any) {

   const { seriesId, seriesTitle } = seriesInfo

    const [creditsForMedia, setCreditsForMedia] = useState<CreditsForMediaType[] | undefined>()
    const [actors, setActors] = useState<CreditsForMediaType[]>([])

    useEffect(() => {
        if (seriesInfo) {
            const getCredits = async () => {
          const data = await getCreditsForMedia(seriesId)

          if (data) {
            const castData = data.map((credit: CreditsForMediaType) => {
                const {id, name, character, roles, total_episode_count} = credit
                return {
                    id,
                    name,
                    character,
                    roles,
                    totalEpisodeCount: total_episode_count
                }
            })
            castData && setCreditsForMedia(castData)
          }

         
        }
        getCredits()
    }
      }, [seriesInfo])

    useEffect(()=>{

        creditsForMedia && creditsForMedia.map(async credit => {
            credit.trekIds = []
            const actorId = credit.id
            const actorCredits = await getActorCredits(actorId)

            
            
            actorCredits && actorCredits.cast.map((show: any) => {
                const showId = show.id.toString()
                
                if (trekSeriesIds.hasOwnProperty(showId)) { 
                    const character = show.character
                    if (actors.some((each: CreditsForMediaType) => each.id === credit.id)) {
                        if (!credit.trekIds.find(each => each === showId)) credit.trekIds.push({id: showId, character})
                        return
                    }
                    credit.trekIds.push({id: showId, character})
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
                const treks = trekIds.map((trek: {id: number, character: string}) => `Star Trek: ${trekSeriesIds[trek.id as unknown as keyof TrekIdsType]} as ${trek.character}`).join(' and ')


                return (
                    <>
                        <Card variant="outlined">
                                <Typography>
                                    {`${name}, who played ${characters} in ${totalEpisodeCount || ""} ${totalEpisodeCount && totalEpisodeCount > 1 ? "episodes of" : "episode of"} ${seriesTitle}, was in ${treks}`}
                                    
                                </Typography>
                            
                        </Card>
                        <br></br>
                    </>
                )
            }
        ) : "LOADING"}</div>
  )
}
