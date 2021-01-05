ionic start
select:
framework : angular
name: ionic-sandbox
(..)

cd ionic-sndbox
code .
ionic serve --no-open --port=8100


# Deployment

### Common
> $ git clone git@github.com:pfouque06/ionic-sandbox.git  
> $ cd Angular-Material-Showroom  

### Dev
> $ npm install  
> $ npm run start  
or 
> $ ng serve  
or 
> $ ionic serve    

### Prod
> $ npm install  
> $ ng build --prod  
> $ cd dist/app-name  

front is available there !!!
but you might have a look overthere also : https:/ionic.demo.pfouque.fr

if you need to use onboard docker container to http serve the application, the instructions to add are :
> $ npm install  
> $ ng build --prod  
> $ sudo docker-compose up -d  

dump logs if needed :
> $ sudo docker-compose logs -f  --tail="0"

instructions for code level update :
> $ git pull  
> $ npm i  
> $ ng build --prod   
> $ sudo docker-compose restart; sudo docker-compose logs -f --tail="0"  

Convert to PWA :
> $ ng add @angular/pwa  
and fix icon with your required icons in manifest.webmanifest json file

Import FontAwesome, Emojis & Materials
> $ ng add @fortawesome/angular-fontawesome  
> $ ng add angular-emojis  
> $ ng add @angular/material    

and replace Module into shared.module.ts