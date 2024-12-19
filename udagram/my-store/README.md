 # Homework Project 3

 ## Project commands
 - Build and run (will start listening on port 3000)
 `ng serve --port 3000`
 - Run backend (will start listening on port 3001)
`cd ../my-store-backend && docker compose up && db-migrate up && npm run watch`
 
  ## Project features
  - The MyStore website displays a list of available products (http://127.0.0.1:3000/product-list). Each product is shown with its image, name and price. Users can select a quantity from a drop-down menu and add the product to their cart by clicking the button below the product. A notification will be displayed upon adding the product to the cart. This page can be viewed without signing in.
  - Clicking on the image of the product, user will be navigated to the product details, where they can also see the enlarged picture of the product, as well as its price,
  name and description. User can also select the quantity of the product and it to their cart. This page can also be viewed without signing in. Link "Back to the product list" returns user to the previous page.
  - Users can navigate to their cart page  (http://127.0.0.1:3000/cart). They need to be logged in to access this page. If they are not signed in, they will be redirected to the sign-in page. 
    - On the sign-in page, the user can either sign in or sign up by providing their full name and password. Both fields are required and won't let the user proceed unless they are filled out. If the "Create new user" check-box is checked, a new user will be created (signed-up). The submit button is disabled until all fields are properly filled out. User functionality is very simplistic – e.g., name duplication checks are not implemented.
    - On the cart page, users can see the list of products (image, name, and price) they have added, as well as the number of items for each product. This number is editable and can be adjusted. If adjusted to 0, the item disappears from the list and the user gets notified that the product has been removed from the cart. The total amount of the order is displayed under the list and updated accordingly.
    - When ready to proceed with their purchase, users have to provide their full name (2-4 parts, each capitalized), address (minimum 10 characters), and credit card number. The submit button is disabled until all fields are properly filled out. Once ready, clicking the submit button will send the order to the backend and a confirmation page will be shown.
  - Confirmation page:
    - In case of a successful submission, a message is shown with the user name, total order amount, and the number of days when to expect delivery.
    - In case of an error, the respective message is shown.

  ## Misc
 - Backend DB structure is very simplistic and by no means production-ready. In particular, user name uniqueness is not ensured
 - Backend has been taken from the Homework Assignment 2, with some small modifications:
    - User data has been (for simplicity) reduced to fullname/password.
    - Product data has been extended to contain image URL and description
    - cors support added  
 - Before the first building of the projects run `npm install`