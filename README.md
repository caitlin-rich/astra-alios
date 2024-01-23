# Ad Astra per Alios
###### To the stars, through others

### Finally, an app that answers the age old question: "Hey, was that actor in Star Trek?" 

Utilizes the [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) to pull actor credits and show data. 

Currently at the very earliest stages of function - it's ugly, there are bugs I'm still discovering, but it works. 

## Known Issues/Bugs/Updates Needed

* The API has rate limits on searches, but I need to search very high volumes of data. I've solved this by adding a timer so I can only run so many searches at once, but there are a lot of cons to this approach - namely, I don't know when the search is finished, and I'm struggling to figure out how to switch the Loading indicator to 'No Results' if there are truly no results. 
* TV Shows only - movies are coming soon. 
* In dire need of a layout update now that the majority of the information I want comes through. 
