import { useEffect, useState } from "react"
import { Card, Typography } from "@material-ui/core"
import { getCreditsForMedia, getActorCredits } from "../queries"

   //TODO
   //get star trek character info
   //how to combine duplicates but also show all star treks they were in
   //how to combine all shows into one line per actor
   //formatting babey!!!!! 
   //can i get their picture? 
   //oh i should link to their TMDB page
   //goal should be to have 'so and so was in DS9!' with their picture, and then you accordian display the details of each searched show and star trek they were in, maybe like in a little grid


//TODO fix this type
type CreditsForMediaType = {
    id: any,
    name: any,
    roles: any
    character: any,
    total_episode_count: any
}

type ActorInfoType = { 
    actor: CreditsForMediaType; 
    id: string 
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
            const actorCredits = await getActorCredits(credit.id)

            actorCredits && actorCredits.cast.map((show: any) => {
                const id = show.id.toString()
                const info = {actor: credit, id: id}

                //okay info is where we need the full information. let's change the display so it makes more sense. 
                
                if (trekIds.hasOwnProperty(id)) {
                    if (!actors.some((each: ActorInfoType) => each.actor && each.actor.id === credit.id)) setActors([...actors, actors.push(info)])
                }
            })
        })
    }, [creditsForMedia])

  return (
    <div>{actors.length > 0 ? actors.map((info: any) => 
            {
                const { actor, id } = info
                const characters = (actor && actor.roles) ? actor.roles.map((role: any) => role.character).join(' and ') : "a role"
                return (
                    <>
                        <Card variant="outlined">
                            {actor && 
                                <Typography>
                                    {`${actor.name}, who played ${characters} in ${actor.totalEpisodeCount || ""} episodes of ${seriesTitle}, was in Star Trek: ${trekIds[id as keyof TrekIdsType]}`}
                                </Typography>
                            }
                        </Card>
                        <br></br>
                    </>
                )
                // add actors.length-1 thing so if we're still going through the list it's loading? 
            }
        ) : "LOADING"}</div>
  )
}
