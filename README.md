## Events platform

A platform to run events, courses or workshops

## Requirements

- nodejs@16

You may install [asdf](https://asdf-vm.com/guide/getting-started.html) and then

```sh
asdf install nodejs 16.5.0
```

## Development

Clone the repository and then run

```sh
npm install
cp .env.example .env
npm run dev
```

visit localhost:4000 (make sure a course is added via [admin](https://github.com/compassionprojects/events-admin))

## Tech stack

- [Next.js](http://nextjs.org/)
- [React](https://reactjs.org/)

## Deployment

Using heroku through github workflows. The master brnach is configured to deploy continuously, for more details checkout [`.github/workflows/`](/.github/workflows)
