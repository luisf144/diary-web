## Setup
```
Go inside client and server folder, run `npm install`
```

## Create .env file base on .env.example
```
Replace with your MySQL connection
```

## Run project
```
Go inside client and server folder, run `npm start`
```

## Run INSERT SQL query to create the user 'Admin'
```
INSERT INTO `users` (`id`, `email`, `password`, `role`, `token`)
VALUES
	(1,'admin@admin.com','$2b$10$kkjJJHDT/8NLg.sSSylwjO/KhuY6xfQLHEF2JjglOzPS4Jbb2fny2',2, NULL);
```