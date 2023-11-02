import { Button } from "@material-ui/core";
import getMediaBySearch from "../queries/getMediaBySearch";
import { useState } from "react";

export default function Home() {

  const [media, setMedia] = useState([])

  const handleClick = async () => {
    const response = await getMediaBySearch('stargate sg-1')
    response && setMedia(response)
  }

  //we just get the entire array back regardless of if it finds the right one or not
  //then if array.length > 1 we can list them all and have user click on correct one
  //if array length is one then we can skip that step
  //either way that sets the hook with the show ID and we can move onto the next step
  //obviously this isn't ideal UX but it's a start
  //unless material UI has a box that'll do the work for me


  return (
    <div>
        <h1>AD ASTRA PER ALIOS</h1>
        <Button onClick={handleClick}>Testing API Call Round One</Button>
        
    </div>
  )
}
