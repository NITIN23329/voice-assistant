# Code documentation for frontend:
“Apps.js” : This files contains all the pages that our application has. We have 4 different kind of pages : Home Page, Recipe List Page, Recipe Info Page and Contact Page.

“Home.js”: This handles the Home Page of our Applications. It has Routes for all the different pages.

“Home.css”: Styling of our home pages is done in this file

“RecipeList.js” : This file loads the list of all recipies particular to user Transcript by making an api call to backend.

“RecipeList.css”: Styling done for Recipe List Page.

“RecipeInfo.js” : This page renders all the information of a particular recipe in a Recipe Info page using some API calls to get the information about a recipe.

“RecipeInfo.css”: Styling done for Recipe Info Page.

“Contact.js”: This page renders all the Contact Us page.

“Contact.css”: Styling for the Contact Us page.

“Header.js” : Handles the Header in all of our pages. Header contains 3 navigation items in it.

Go to Home Page of our Application
Go to Contact Us Page .
Go to CoSyLab Website.
“Header.css”: Styling sheet for header.

“Footer.js” : This file handles the footer across all the pages.

“Footer.css”: Styling sheet for footer.

“Columns.js” : Contains the column meta data for our Recipe List Table.

“BasicTable.js”: This create and set different table properties of the Recipe List Table.

“BasicTable.css”: Styling done to our Recipe List Table.

Backend : TechStack : Flask, Python

Whenever you click on SUBMIT button the request gets forwarded to recipeDB backend which internally calls recipeDB api to fetch the recipes based on the entities extracted from the query.

For example - A query like "Show me some pakistani recipes having ginger" . For this type of query the entities extracted will be {country: pakistani , ingredient : ginger} , So we will display the recipes from Pakistan that have ingredient ginger present.

The voice based queries can be made on recipeDB based on cuisine (country) , ingredients(its category) , cookingProcess , continent,utensils etc.

For entity extraction we used the original ner dictionaries already of CosyLab. We used the nltk module for finding and extracting important information from the text received from frontend after the user clicks the SUBMIT button.
