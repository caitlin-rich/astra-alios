import { Box, Button } from "@material-ui/core";
import getMediaBySearch from "../queries/getMediaBySearch";
import { useState } from "react";
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup'

interface MediaProps {
  
}

export default function Home() {

  const [media, setMedia] = useState<object[]>()

  const handleClick = async (searchTerm: string) => {
    const response = await getMediaBySearch(searchTerm)
    console.log('in home page', response)
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

  console.log(media)


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
        {media && (media.length > 1 ? "multiple" : "one response")}
    </div>
  )
}
