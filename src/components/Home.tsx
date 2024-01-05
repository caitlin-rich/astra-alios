import { Button } from "@material-ui/core";
import getMediaBySearch from "../queries/getMediaBySearch";
import { useEffect, useState } from "react";
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup'
import ActorCredits from "./ActorCredits";

interface MediaProps {
  id: string
}

export default function Home() {

  const [media, setMedia] = useState<MediaProps[]>()
  const [seriesId, setSeriesId] = useState<string>("000")
  console.log('series id', seriesId)

  useEffect(() => {
    media && media.length === 1 && setSeriesId(media[0].id)
  }, [media])

  const handleClick = async (searchTerm: string) => {
    const response = await getMediaBySearch(searchTerm)
    setMedia(response.results)
  }

  const searchSchema = yup.object({
    searchTerm: yup.string().required()
  })

  //we just get the entire array back regardless of if it finds the right one or not
  //then if array.length > 1 we can list them all and have user click on correct one
  //if array length is one then we can skip that step
  //either way that sets the hook with the show ID and we can move onto the next step
  //obviously this isn't ideal UX but it's a start
  //unless material UI has a box that'll do the work for me



  return (
    <div>
        <h1>AD ASTRA PER ALIOS</h1>
        <Formik
      initialValues={{
        searchTerm: ''
      }}
      validationSchema={searchSchema}
      onSubmit={(values) => {
        handleClick(values.searchTerm)
      }}
    >
      <Form>
          <label htmlFor="searchTerm">Which show?</label> 
          <Field id="searchTerm" name="searchTerm" placeholder="Magnifying Glass Icon" />
          <Button type="submit">Search</Button>
      </Form>
    </Formik>
        <br />
        {/** If media.length = 1, that's the ID we send onto getting credits. If it's longer, the user needs to pick which one they need. */}
        {media && (media.length > 1 ? "multiple response" : <ActorCredits seriesId={seriesId} />)}
    </div>
  )
}
