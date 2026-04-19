# Frontend Performance Take-Home

This exercise is designed to evaluate:

- independent problem solving
- React and JavaScript fundamentals
- code quality and coding practices and engineering judgment
- ability to reason about business logic and tradeoffs
- how you use AI as part of your workflow

## Overview

This repository contains a simplified itinerary results experience built with:

- Next.js
- React 19
- TypeScript

The app currently streams mock itinerary data and renders a list of itineraries with a details view.

The scenario is simple: users are reporting that the app feels slow, glitchy, and laggy, especially on lower-end devices. Your task is to improve the experience while implementing one product requirement.

## Tasks

Please complete the following:

- Build an airline search feature.
  - Users can type the name of an airline.
  - Show only itineraries that include that airline anywhere in the journey.
  - When the airline input is empty, itineraries should be sorted by `total`.
  - When the airline input has a value, itineraries should be sorted by the total duration the passenger flies on that airline across the entire itinerary.
- Fix performance issues in the app.
- Write a short explanation of the issues you found and why you implemented your solution the way you did.
- Include the chat history from any AI tooling you used for work related to this task.

## Constraints

- Show at most `150` itineraries on the home page.
- No pagination is required.
- You may refactor freely as long as existing functionality continues to work.
- Performance improvements are intentionally open-ended. There are several real issues in the app, solutions can be minor changes or major structural updates.
- The included mock dataset is relatively small, but evaluation will also consider behavior on much larger sets, 5,000 flights. Yes 5,000 itineraries stored in memory on client, make sure you handle them efficiently.

## What We Care About

We are primarily evaluating:

- how you identify performance bottlenecks
- whether your solution is correct and maintainable
- how you structure state, rendering, and data transformations
- your ability to explain tradeoffs clearly
- your overall React and JavaScript fluency

We care more about the quality of your reasoning than the absolute amount of code changed.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Run linting:

```bash
pnpm lint
```

Create a production build:

```bash
pnpm build
```

Then open [http://localhost:3000](http://localhost:3000).

## Submission

Please submit:

- your completed code
- a short write-up covering the issues you found and the changes you made
- the chat history from any AI tools used on this assignment

If you have time, sensible commits or PR-style breakdowns are a plus, this makes reviewing easy but they are optional.

## Notes

- You may use AI however you like.
- If business logic is unclear, you may ask.
- If you identify any issues, you may discuss them before putting in time and effort
- Do not optimize blindly. We are interested in how you reason about the problem, not just the end state.

