
# Personal Project Notes

What a cool task to work on! It's so nice to get to experience working with different file structures, frameworks and data.

I've made some personal notes below explaining my implementation and understanding of the task!

## Views and File structure

I kept the handout structure pretty intact, the only significant structure change I added was `sites-view.jsx`. This is because it felt like the main page of the app, so i used this as the "foundation" of the project.

## State management

To keep the data present for the user (when refreshing or changing pages) I decided to go with `localStorage`. I went with this approach because of the reliabily of data, with it being static and not fetching new updates. For more complex and larger projects, a better approach would be to use React Redux or similar.

For the sake of this point in the handout: _Use loading indicators whenever appropriate_ - I have set a 2 second delay when pressing the `Load Sites` button in the `SitesView` component. Had the data been fetched from a remote server or DB, this would not have been necessary.

## Design

The overall design and UI is not super complex, this was mainly because of the decision to focus on a proper implementation of the data and components. It was nice to have a Storybook for referencing and I've used some of the components available there as well as styling some myself. 

The choice of color and style was purely based on personal associations with the data the task revolved around. Industrial and raw. The cards are purposly styled without any shadows, transitions and fancy hover effects - to keep the styling professional (personal association). The bold fonts are clearly stating key headers throughout the app.

Although the UI lacks color, I've still built it with proper color palettes and contrasts in mind. I always have this in mind when building products, as I strive to make the web accessible for everyone!

## Technical details

The components are built to be responsive and accessible. Current structure would allow for further implementation of for example keyboard navigation and for the use of screen readers. 

The application handles various edge cases. When no sites or oil rigs are available, the user will see informative empty state messages rather than broken interfaces. Each component has proper fallback rendering to prevent crashes if data is malformed or missing. Issues in one component won’t crash the entire application and the data is validated before rendering to prevent display errors. 
