Simple Login, Registration and Dashboard User Profile using React + Laravel

#### Clone Step:

-   Clone this project `git clone git@github.com:baadillahnabil/simple-user-profile.git` (for SSH) **or** `https://github.com/baadillahnabil/simple-user-profile.git` (for HTTPS)
-   Run `composer install`
-   Run `yarn` **or** `npm install`
-   Run `yarn dev` **or** `npm run dev`
-   Rename file `.env.example` to `.env`
-   Run command `php artisan key:generate`
-   Create a database with whatever name you want and input the database name in `.env` file after `DB_DATABASE=`{your database name}
-   Don't forget about your `DB_USERNAME=` **and** `DB_PASSWORD=` with your database connection credentials
-   Run `php artisan migrate`
-   Run `php artisan passport:install`
-   Copy the `Client Secret` of **Client Id: 2** to `.env` file to `PASSPORT_CLIENT_SECRET=`{your client secret}
-   Run `php artisan serve`

#### Done :)

#### License: MIT
