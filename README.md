# Jiak Simi 
"Jiak Simi" is a mobile app designed to address these challenges by providing a platform for friends to share genuine food recommendations. Users can easily add and edit reviews for dishes they’ve tried at different restaurants. Reviews include the dish name, its picture, price, rating, and any comments or tips. The app features a "search by cuisines" page, allowing users to filter dishes according to their preferred cuisine or find inspiration for what to eat next.

## Approach
* Plan user stories and features of the app (e.g. being mobile-friendly since users will most likely be using it on the go)
* Create wireframe, ERD, workflow diagram and Figjam (to keep track of tasks)
* Set up frontend and backend repositories
* Code including testing and debugging, followed by polishing of the UI
* Deploy

## Live URL
 https://jiak-simi.onrender.com/

# User stories
AAU, I would like to:
* sign up for an account
* log in to my account to see my notes
* log out to keep my account secure
* find food based on cuisines
* be shown reviews of food at an eatery
* add reviews on an eatery
* edit reviews on an eatery
* find more about a dish at an eatery when I click on it

## Source Repositories
* [Backend API](https://github.com/ehdahm/backend-jiak-simi)
* [Frontend Application](https://https://github.com/jjjtmy/frontend-jiak-simi)

## Screenshots
### Landing Page
  ![Landing Page](https://github.com/jjjtmy/frontend-jiak-simi/blob/main/images/Home%20Page.png)
### Dish Details Page
  ![Dish Details Page](https://github.com/jjjtmy/frontend-jiak-simi/blob/main/images/Dish%20Details%20page.png)
### Log In Page 
  ![Log In Page](https://github.com/jjjtmy/frontend-jiak-simi/blob/main/images/Log%20In%20Page.png)
### Filter By Cuisine
  ![Filter By Cuisine](https://github.com/jjjtmy/frontend-jiak-simi/blob/main/images/Filter%20by%20cuisine.png) 
### Filtered Results
  ![Filtered Results](https://github.com/jjjtmy/frontend-jiak-simi/blob/main/images/Filtered%20results.png)
### Profile Page
  ![Profile Page](https://github.com/jjjtmy/frontend-jiak-simi/blob/main/images/Profile%20Page.png)
### Add Review Page
  ![Add Review Page](https://github.com/jjjtmy/frontend-jiak-simi/blob/main/images/Add%20review.png)
### Edit Review Page
  ![Edit Review Page](https://github.com/jjjtmy/frontend-jiak-simi/blob/main/images/Edit%20review.png)
  
  
  

  
## Technologies Used
### Backend API/DB
* [Mongo DB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Express](https://expressjs.com/)

### Frontend Application
* [React](https://react.dev/)
* [React router dom](https://reactrouter.com/en/main) -Routing system
* [Chakra](https://v2.chakra-ui.com/) -UI Library

### Other packeges used
* [Cloudinary](https://cloudinary.com/) - Image uploading
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [bcrypt](https://www.npmjs.com/package/bcrypt)

### PaaS
* [Render](https://render.com/)

## Product Design Documentations
* [Figjam + ERD](https://www.figma.com/board/0eadeDavnWvkIEU9P9e1Yu/ga-seif-project-3?node-id=87-618&t=8FLO0bAMzABYc7Xd-0)
* [Wireframe](https://www.figma.com/proto/FlTi8G0WoYpv3CN6JlJKUu/JIAK-SIMI---mobile?t=hCDeVb4wS8zZRfWm-1)
* [Workflow Diagram](https://app.diagrams.net/#G1TPK1Dzs6Vetz13UbjRI2xwY9F28nF26n#%7B%22pageId%22%3A%22C5RBs43oDa-KdzZeNtuy%22%7D)


## Key Challenges/takeaways
* Using the right methods and parameters for CRUD operations using Mongoose
* Try to ensure all pull requests are approved first, and communicate to see which files each other are working on before making new changes to reduce the chances of a merge conflict.
* Try to create utility functions that can be re-used to increase efficiency of coding process and readibility of code


## Next Steps
* Add Google API in the Food Card page to render map, addresses, links to more reviews 
* Enhance form validation rules (e.g. required fields)
* Allow user to delete their reviews and accounts
