# Nori Pomodoro

### Website:

[Nori Pomodoro](https://nori-pomodoro.vercel.app/)

### Video Demo:

[Video](https://youtu.be/8hqRyN0fOeI)

<hr>

## Description:

Nori Pomodoro is a full stack web app greatly inspired by the Pomodoro studying technique. As someone who has a passion for continous learning and wants to study for longer sessions, this is extremely helpful. The theme of this web app is that of zen with a backdrop of Mt Fuji; in addition, a soothing bell rings at each completed session.

Not only does this web app enables for better studying, it also has some unique quirks such as enabling the parallax effect on the background and being able to retain your progress if the web app exits for whatever reason. In addition, you'll be able to access the same kind of progress if you login to the same account on a different computer or even your phone! This is all possible by injecting and extracting data into and from the database when needed. Also, you will be able to view all your Pomodoro sessions via the history page, where the data is provided through API calls to the database.

<hr>

## Concepts and Tech Stack:

<details open>
<summary><b>Click to expand/collapse</b></summary>

#### <b>Concepts applied on this web app</b>

- Authentication via Database
- Web Workers
- Web Hooks
- Router
- Full Stack
- APIs

#### <b>Languages</b>

- Typescript
- Javascript
- CSS, Tailwind
- SQL

#### <b> Deployment Tools </b>

- NextJS
- React
- Vercel

#### <b> Database Tools </b>

- Prisma
- MongoDB

</details>

<hr>

## Main Files

<details open>

<summary><b>Click to expand/collapse</b></summary>

- `app/actions `

  - This folder consists of Prisma adapted SQL queries to extract data from the database using Prisma Client.

- `app/api `

  - This folder consists POST API calls and routes to create/update data in the database.

<div>

- `app/components/ `
  - Consists of the main componenets of the web app.
  - `app/components/background `
    - Background.tsx: Contains the Parallax effect for y-axis movement as well as the component that helps render the backdrop properly.
    - MoveButton.tsx: Allows enabling and disabling the Parrallax effect.
  - `app/components/Inputs `
    - Input.tsx: Formats a nice box for input in the Login and Register Modal.
    - RangeSlider.tsx: Utilizes the @mui/material/Slider library to have a sleek looking slider .input used in the Settings Modal.
  - `app/components/modal `
    - Modal.tsx: General Modal layout to be used in the subsequent Modals.
    - RegisterModal.tsx:
      - Utilizes the hooks for reusable parts like onOpen,isOpen etc...
      - Submits a POST call with app/api/register to create a user once the user has successfully. inputed the required fields.
      - Upon successfuly registration, a success toast will pop up, and the user will be created under the "User" table in the database.
    - LoginModal.tsx:
      - Utilizes the hooks for reusable parts like onOpen,isOpen etc...
      - Utilizes signIn from "next-auth/react" to authenticate a login.
      - Upon successful login, a success toast will pop up indicating the user that they have successfully login.
    - SettingsModal.tsx:
      - Utilizes the range slider input from above to allow easy Pomodoro set-up.
      - Shows Total Time that will be spent.
      - Submits a POST call with app/api/register to create a user once the user has successfully.
  - `app/components/navbar `
    - Logo.tsx: Logo of the web app, clicking on it will redirect you to home page.
    - MenuItem.tsx: General layout of what a menu item will look like in UserMenu.
    - UserMenu.tsx: Depending on whether you login'd or not, it will show different menu items. It sees if the user is login'd taking a look at the currentUser that was fed into as props from layout.tsx
    - Navbar.tsx: What the navbar will look like at the top of the web app, contains Logo and UserMenu.
  - `app/components/timer `
    - PlayPauseButton.tsx: A responsive button that switches to play or pause when clicked.
    - ResetButton.tsx: A responsive reset button.
    - SettingsButton.tsx: A responsive settings button.
    - SoundButton.tsx: A responsive button that switches to bell or cross-belled when clicked.
    - PomodoroTimer.tsx:
      - Utilizes the 4 buttons above
      - Utilizes a web worker script to accurately record time elapsed since using useEffect() setInterval normally will get throttled when the active tab on your browswer is not the web app.
      - Has a uploadData function that submits POST call with app/api/elapsedTime to update the elapsed data points of the current Pomodoro session.
        - Currently, data is updated every second the Pomodoro session is active.
      - Upon switching to a different Pomodoro Type, such as "Study","Break","Complete", a bell rings to signal a complete.
      - Utilizes 2 useEffect(), one for the web worker and one for uploading the new elapsed data points to the database.
      - Has the Settings button to set up a new pomodoro session.
      - Has the Reset button to create a new pomodoro session.
      - Both the reset and settings button will make sure the last elapsed data points are uploaded.
      - Contains the general layout of the Pomodoro Timer that is responsive to different viewports.
  - `app/Avatar.tsx `
    - Default image of the user's avatar.
  - `app/Button.tsx `
    - General layout of what a button looks like.
  - `app/ClientOnly.tsx `
    - Client only component that uses Mount.
  - `app/EmptyState.tsx `
    - Default look of the history page if there are Pomodoro History of current user.
  - `app/Heading.tsx `
    - General layout of what a heading looks like.

</div>

- `app/history `

  - This outputs a HTML page that makes up what you see in the history page of the web app.
  - It utilizes the app/action files like getTime.ts to fill the page with data from the database.

- `app/hooks `

  - This folder consists of the hook files that contains the reusable parts from their respectiv components.

- `app/libs/prismadb.ts `

  - This file exports a prisma client instance, which is used to interact with a database.

- `app/providers/ToastProvider.tsx`

  - This file exports a generic React component, Toaster.

- `app/types`

  - As dates could not be read properly in this version of NextJS, I created SafeUser and SafeHistory to convert the dates to strings.

- `app/Container.tsx `

  - This is a generic element to format data nicely in it.

- `app/globals.css`

  - Contains styles for elements as well as specs for specific elements in the background to enable the Parallax effect to render properly.

- `app/layout.tsx `

  - This is the root that contains the main componenets of the web app.

- `app/page.tsx `

  - This the home page that renders the Pomodoro Timer properly as well as feed in the correct data points for auto-save functionality.

- `pages/api/auth/[...nextauth].ts`

  - Contains the logic to allow succesfully logging into the web app and connecting to your respective data.

- `prisma/schema.prisma `

  - Contains the database schema that is pushed to the MongoDB server.

- `public`
  - Contains the seperate images and for the backdrop as well as the completion bell sound.

</details>

<hr>

## How to Run:

First, install all the dependencies for the web app:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```
