### Uživatelé
###### Registrace
`POST localhost:3001/users/register`
```javascript
{
  "username":{String, required},
  "email":{String, required},
  "phone":{Number, required},
  "password":{String, required},
}
```
###### Přihlášení
`POST localhost:3001/users/login`
```javascript
{
  "username":{String, required},
  "password":{String, required},
}
```
###### Získání uživatele
`GET localhost:3001/users`
###### Úprava uživatele
`PUT localhost:3001/users`
```javascript
{
  "username":String,
  "email":String,
  "phone":Number,
}
```

### Inzeráty
###### Nahrání obrázku inzerátu
`POST localhost:3001/users/register`
```javascript
//Content-Type: application/x-www-form-urlencoded
img=data
```
###### Vytvoření inzerátu
`POST localhost:3001/users/register`
```javascript
{
  "name":{String, required},
  "description":{String, required},
  "price":{Number, required},
  "img":{String, required},
}
```
###### Získání všech inzerátů
`GET localhost:3001/listings`
###### Získání konkrétního inzerátu + uživatele
`GET localhost:3001/listings/:id`
###### Úprava inzerátu
`PUT localhost:3001/listings/:id`
```javascript
{
  "name":String,
  "description":String,
  "price":Number,
  "img":String,
}
```
###### Odstranění inzerátu
`DELETE localhost:3001/listings/:id`
