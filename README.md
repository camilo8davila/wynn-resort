
# Wynn Al Marjan island

This project is a technical test for the frontend developer position of Wynn Al Marjan island




![Logo](https://download.logo.wine/logo/Wynn_Resorts/Wynn_Resorts-Logo.wine.png)


## Assumption

- I follow the figma but I design more screens such as Homepage and  Loginpage where I took overt the design of those pages.

- The Register form did't show a password input so I decided register each user with she same password ```123456```, I belive the App send a randon password or code to create the password in next steps.


## Tech Stack

**Client:** React, Nextjs v15, Zustand, TailwindCSS

**Server:** Nextjs, Prisma, JWT

**Database:** PostgreSQL


## Features

- Login and register
- Fullscreen mode
- Cross platform


## folder structure

```
wynn-resorts/
├── public/                         # Public archives 
│   ├── photo.jpg
│   ├── icons/
│   │   └── icons.svg
├── src/                            # Source of Next (frontend/backend)
│   ├── actions/                    # Server components split up in features
│   │   ├── auth/
│   │   └── miscelanius/
│   │     index.ts 
│   ├── app/                        # AppRouter
│   │   ├── auth/                   # Modules of the app split in features
│   │   └── (home)/
│   │     page.tsx 
│   │     layout.tsx 
│   ├── components/                 # Reusable components (ej. React, Vue)
│   │   ├── auth/                   # Split in feature where IU is the place to put components that you will use in all the app
│   │   └── ui/
│   │     index.ss
│   ├── config/                     # Folder where you set up global configs
│   │   └─── fonts/
│   │     fonts.ts
│   ├── middlewares/                # Folder where you set up your middlewares split in features
│   │     authMiddleware.ts
│   │     registerMiddleware.ts
│   ├── store/                      # App Store with zustand in this case
│   │   ├── auth/                   # Split in features
│   │   └── ui/
│   │     index.ss
│   ├── utils/                      # Utils folder
│   │   ├── auth                    # Save files with code that can help you in your app
│   │   └── ui
│   │     index.ss
│   └── middlware.js                # GlobalMidddleware where you called the other middlewares
├── .env                            # Variables de entorno
├── .gitignore
├── package.json                    # Configuración de Node.js
├── package-lock.json
├── docker-compose.yml              # File to set up the local database
└── README.md
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/camilo8davila/wynn-resort
```

Go to the project directory

```bash
  cd wynn-restor
```

Set up Docker, inside the root folder run

```bash
  docker compose up -d
```

Install dependencies, I recommend use ```node v20.xx.xx``` 

```bash
  npm install
```

Set up Environment variables

```bash
  Create a copy of .template.env end rename to .env and replace the enviroments
```

Execute the next prisma commands

```bash
    npx prisma migrate dev
    npx prisma generate
```

Start the server

```bash
  npm run dev
```


## Prisma commands

```
  npx prisma init
  npx prisma migrate dev
  npx prisma generate
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## API Reference

#### Get otp code

```http
  POST /auth/otp/send-otp-code
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `sendTo`  | `"phone" or "email"` | **Required**. method to get the otp code  |
| `contact` | `string` | **Required**. Email or Phone |


#### Verify otp code

```http
  POST /auth/otp/verify-code
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `otp` | `string` | **Required**. Code sent to the user |


#### Get countries

```http
  GET /miscelanium/countries
```

#### Verify otp code

```http
  GET /miscelanium/subscribe-newsletter
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email to subscribe |



## Author

- [@camilo8davila](https://github.com/camilo8davila/wynn-resort)

