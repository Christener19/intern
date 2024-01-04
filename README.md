
# Intern
A dashboard powered by data from Zoom's APIs and SDK's to help with the day to day running of a the School of Codes software development bootcamp.

Called Intern. Simply because interns do all the grunt work so the main team can get on with their jobs.

## Development
You can view our deployment here: https://intern-soc.vercel.app/

## Contributors
<a href="https://github.com/Christener19">
        <img src="https://github.com/Christener19.png" width="100" height="100" alt="Mart510">
</a>
<a href="https://github.com/Kit2345">
        <img src="https://github.com/Kit2345.png" width="100" height="100" alt="Mart510">
</a>
<a href="https://github.com/radswar">
        <img src="https://github.com/radswar.png" width="100" height="100" alt="Mart510">
</a>
<a href="https://github.com/zlabban">
        <img src="https://github.com/zlabban.png" width="100" height="100" alt="Mart510">
</a>
<a href="https://github.com/humiraa">
        <img src="https://github.com/humiraa.png" width="100" height="100" alt="Mart510">
</a>
<a href="https://github.com/Mart510">
        <img src="https://github.com/Mart510.png" width="100" height="100" alt="Mart510">
</a>

## Features
- Authentication: provided by Supabase to keep personal data locked away so only authorized users can access it.
- Attendance tracking: See current attendance information instantly, including alerts for absesnces catergorized by severity and the ability to download the data as a CSV for off site manipulation and reporting.
- Thumbometer: For quick meaursable moral/comprehension checking. The poll is whether the boot campers feel thumbs-up, thumbs-down, or thumbs-sideway based on the activity, demo, instructions, etc that they were given. Following this, they have 3 minutes to answer and the dashboard will display a chart depicting the data, during the 3 minutes it is refreshed every 10 seconds after the click to send out the poll survey.
- Engagement Tracking/Logging: Using a simple traffic light system to give an overview of how enveaged individual bootcampers are. This extra information gives the coaches the ability to make informed interventions early.
- Random name picker: With 70+ bootcampers on each call over a 16 week period the same names can come up again for questions. This ensures it's always spread out evenly, removes effort and unconcious bias.

## Installation

Install intern with npm

```bash
  npm install
```

## Dependencies

- Supabase: for Authentication and PostGreSQL database
- NextJs
- React
- Tailwind
- Chart.js
- A Zoom API key

## Environment Variables
Below is an example of a .env.local file you will need to create to run intern

```bash
  # Authentication Variables
  # Supabase project URL 
  NEXT_PUBLIC_SUPABASE_URL=https://{myProjectURL}.supabase.co
  # Supabase anon key
  NEXT_PUBLIC_SUPABASE_ANON_KEY={mySupabaseAnonKey}

  # Database Variables
  # PostGreSQL URL (We recommend Supabase for this)
  DATABASE_URL={myPostgreSQLDatabaseURL}

  # Zoom Variables
  # Zoom API token
  MEETING_ID={api token number}
  # Zoom API secret
  SECRET_TOKEN={ZoomToken}

  # DEV Variables
  #NGROK for local webhook testing
  PERSONAL_NGROK_TOKEN={myPersonalNGROK}
  # Dev or live flag - used to automatically switch api calls from running on your local dev and deployed environment
  DEVORLIVE=development
```

## Project Reflections

This project involved learning new concepts on the job such as Chart.js, Webhooks, and AuthTokens. We also learned more from the tech stack we used which was Next.js, TypeScript, Tailwind, Superbase, Elephant SQL, and Chart.js. Some of the features from above involved a lot of planning and working out the different algorithms for engagement logger, and attendance tracker.

As a team, we made sure that we didn't just code 9-5 and beyond. We did energizers and took breaks. We often swapped the teams around which meant everyone had an understanding of what we had all been doing. At the start of every day, we have our retros and discuss the plan for that day. At the end of the day, we plan out what we are going to do the following day.

## Development Journey of 4 weeks.

Before the 4 week started: Friday before the 27th of November we were introduced to our teams. Our first few steps were coming up with the team name and manifesto, everyone wrote down what was important to them for the manifesto and we grouped them based on similarity. We were told to come up with an idea that we would want to do. Through dot notation, we decided on a lonely adults app. We were then told that we could have the opportunity to work with a stakeholder. SoC gave us six repos to read through. We then had to say what our top three would be, again we did this through dot notation.

### Week one
Monday the 27th arrives. We were told which project we could do, ours was one the School of Code had come up with which was delivering a Zoom dashboard to assist the School of Code in its business operations. Working with a stakeholder meant organizing weekly meetings to present our sprints, we came prepared having created slides documenting everything we had done, this was their opportunity to ask questions and ours too. They wanted to be able to track the attendance of their boot campers as their current method is labor intensive.

Given this information, we created a FigJam board and started planning. To do this we took on an empathise approach. This meant understanding the problem by doing the five W's - Who, What, When, Where, and Why. We also needed to understand the possible users which might be the CEO of the company, the coaches, and the admin. Finally, we looked at how this problem is already being solved. 

With all this information we created three UX personas, refined the problem statement, and began the Disney ideation phase. Once we had completed this we moved on to the critic phase and began writing our MVPs' and MVEs'. We came up with three "Star", "Showman", and "Light". From this, we created User Stories for them all and wrote down what kind of features the different MVPs' would have. Then came low-fi, we created three low-fi dashboards to show our stakeholder. We then discussed the feasibility of each of the features and gave them T-shirt sizes. The two mandatory t-shirts were authentication and attendance tracking, they could then choose two medium and a small, or a medium, large, and small.

### Week two
After all the planning was done in week one, we came onto building the front end with dummy data. This was following the advice of a partner from the School of Code. He also said that it would be a good idea if we deployed our website straight away, which we did. To make sure that we were organised at all times we started a Trello board and wrote down all the tickets that needed to be done. This was updated every day. Before we started coding our front end we did the final hi-fis with the features our stakeholder chose. We visited our FigJam board and did some top-level Epic planning before splitting into teams.

One team worked on getting "Hello World" deployed and the others worked on setting up authentication using Superbase. Once this was complete we worked on completing the front-end component tree, and learning how to create graphs with data in JavaScript. Before commencing the actual build, we discussed what our tech stack would be: Next.JS, Tailwind, TypeScript, ELephant SQL, and Chart.js. Then began coding. We started with developing the skeleton of the dashboard. We then split into teams, this was always done via a random name picker online, or someone stating they wanted to do a specific ticket. In teams of three we created the frontend using dummy data.

### Week three
We had finished all of our tickets for week two which meant we could start on the backend. This involved learning how to get the auth token from Zoom so we could use the APIs' and WebHooks'.
