# Hostfully project - Eduardo

Hi Hostfully team this is my project for the frontend position!!

it was bootstraped from remix ![Blues Stack](https://github.com/remix-run/blues-stack)

Learn more about [Remix Stacks](https://remix.run/stacks).

There is also a [live demo](https://hostfully-remix-88ab.fly.dev/) 

There is already seeded testdata for local and the demo

- Email: `eduardo704@gmail.com`
- Password: `edu12345`

## Development

- Start the Postgres Database in [Docker](https://www.docker.com/get-started):

  ```sh
  npm run docker

  or

  docker run -d -e POSTGRES_DB=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -p "5432:5432" postgres

  ```
  If you have any problems please check if your port 5432 is being used.

- Initial setup:

  ```sh
  npm run setup
  ```

- Run the first build:

  ```sh
  npm run build
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.


### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Prisma and Remix. The main functionality is creating users, logging in and out, and creating and deleting notes.

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)
- creating, and deleting notes [./app/models/note.server.ts](./app/models/note.server.ts)


## Testing

I have focused mostly on unit testing as I feel it is more consistent

to run int run:

  ```sh
  npm run test
  ```

  ## Project considerations

I have chose to use Remix since it is a technology I have always wanted to check-out, my latest react projects have been with next and it is kind of opinionated torwards Vercel, and I heard good things about Remix. I currently work as a frontend lead and like to keep up to date with all frontend technologies as possible.

I also used tailwind for styling, the project should look good in all resolutions. 

I tried making the app look like a real world app, I used Airbnb as a base for design. 

Also I created it as a surfing booking travel to add some flavour.

Please let me know if you have questions or problems running the app.

Thanks, Edu.
