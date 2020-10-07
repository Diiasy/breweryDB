## Table of contents
* [Title](#title)
* [Setup](#setup)
* [General info](#general-info)
* [Stack](#stack)
* [How it works](#how-it-works)
* [Pictures of the app](#pictures-of-the-app)
* [Improvements](#improvements)


## Title

Find your beer


## Setup

Please install node modules first with npm i.

In the project directory, you can run: npm start.

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## General info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br />
This project uses [BreweryDB API](https://www.brewerydb.com/).<br />
The app was made as an assignment from PXL.Widgets Heroes.


## Stack

The project was developped with Javascript (React framework), HTML and CSS (Bootstrap framework).


## How it works

The beer searching is available from the navbar or the home page.
When first arriving on the page, the app is calling all the beers from the API.

The details of the beers are shown on the same page to allow to go from one beer to another easily.
It is possible to navigate through the newt page button.

Three search patterns are available and can be combined:
1. **Search by country**: the app is searching the countries when the page is loading from the /locations endpoint and show the beers by countries when selected.
2. **Search by type**: the app is searching the different types when the page is loading frmo the categories endpoint and show the beers by type when selected.
3. **Seach by name**: the API allows us to search for full words only. I decided to do a responsive search, which means that on every character added, the search will happened.

**Warning**: I decided to create a list for beers and only show the beers bby country and type without updating the list when the search is done. This allows the user to search by country and type but not by name and country or name and type.


## Pictures of the app

**Computer verion**

<div style="display: flex; justify-content: center">
    <img src="https://res.cloudinary.com/diiasy/image/upload/v1602075251/pxlassignment/home_aavd7k.png" />
</div>

<div style="display: flex; justify-content: center">
    <img src="https://res.cloudinary.com/diiasy/image/upload/v1602075249/pxlassignment/beers-search_ikvghq.png" />
</div>

<div style="display: flex; justify-content: center">
    <img src="https://res.cloudinary.com/diiasy/image/upload/v1602075249/pxlassignment/beer-detail_f27qyk.png" />
</div>

**Mobile version**

<div style="display: flex; justify-content: center">
    <img src="https://res.cloudinary.com/diiasy/image/upload/v1602075250/pxlassignment/home-mobile_wxkpsl.png" />
</div>

<div style="display: flex; justify-content: center">
    <img src="https://res.cloudinary.com/diiasy/image/upload/v1602075249/pxlassignment/beers-search-mobile_btn0t3.png" />
</div>

<div style="display: flex; justify-content: center">
    <img src="https://res.cloudinary.com/diiasy/image/upload/v1602075249/pxlassignment/beer-detail-mobile_eascdc.png" />
</div>


## Improvements

* The biggest bug of the app is related to pages. When a selection for country or type is done, it automatically swithces to the next page. The total number of pages is also not updates.
* The second glitch is that it is not possible to search by name at the same time as bu country or type. To make it possible, I should create a state for the beers by country and another one for the beers by type and then each in these lists.