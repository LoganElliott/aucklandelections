# Auckland Elections

A website that pulls [Generation Zero](http://wwww.generationzero.org) Auckland Elections candidate score data and displays each candidate as a card

See live site here http://www.aucklandelections.nz

## Technologies

This is a [React](https://facebook.github.io/react/) website
Which uses [ECMAScript 2016](http://www.ecma-international.org/ecma-262/7.0/)
The transpiling & SCSS compiling is handled by [Webpack](https://webpack.github.io/) which also autoprefixes css vendor prefixes 

## Candidate Score Data

It pulls the candidate data straight from a [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1qK6ph0ZU1dGsTjkeIiPLjVRpyRQKo_ItDrnqMZmRjUU/edit#gid=2126234327) this allows live data updates by non-technical people 

## Ward & Board Lookup

1. When an address is entered it queries [Google GeoCode API](https://developers.google.com/maps/documentation/geocoding/intro) to get latitude and longitude values.
2. It then queries a [Koordindate API](https://koordinates.com) to find [Ward Locations](https://koordinates.com/layer/1349-auckland-council-wards-july-2010) as well as [Local Board Locations](https://koordinates.com/layer/1513-auckland-council-boards-july-2010)
3. It then filters the Candidate data by your Ward & Local Board result

## Design

This is a custom design care of a Generation Zeroite, but uses some [Material Design Components](http://www.material-ui.com)

It is a desktop & mobile friendly website which will dynamically reconfigure when you're screen is less than 1000px

## Continuous Deployment & Hosting

Deployment is handled by [Travis](http://www.travis-ci.org)
This site is hosted on [Amazon S3](https://aws.amazon.com/s3/)

#### Deployment process
1. Push code to master branch
2. Travis builds the code
3. Travis deploys the code and images to S3
4. Done

## Prerequisites

```
npm install
```

## Run

```
npm start
```

## Build
```
npm run build
```