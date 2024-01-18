import { Button, Typography } from '@material-ui/core'

type MediaInfoType = {
    media: any,
    setMedia: any
}

export default function MultipleMediaSelection({media, setMedia}: MediaInfoType) {

  return (
    <div>
        <Typography>Did you mean...</Typography>
        <br></br>
        {media.map((show: any) => {
            return (
                <div>
                    <Button onClick={() => setMedia([show])}>
                        {show.name}
                    </Button>
                </div>
            )
        })}
    </div>
  )
}
