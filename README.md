# Spidey Invite 🕷️

A Spider-Man themed birthday party invitation application built with Next.js, TypeScript, and Tailwind CSS. This interactive RSVP app features comic-book styling, animations, and a multi-step form for guests to confirm their attendance.

## Features

- **Comic Book Styling:** Custom Tailwind CSS classes for a vibrant, comic-book aesthetic.
- **Interactive Animations:**
  - "Web Slinger" transition effect between steps.
  - "Pop" animations for UI elements.
  - Receipt printing animation for final confirmation.
- **Multi-step RSVP Flow:**
  1. Welcome & Name Entry
  2. Party Details & "Are you coming?" Check
  3. Guest Count (Adults & Kids)
  4. Kids' Names Input
  5. Final "Receipt" Confirmation with Countdown
- **Countdown Timer:** Displays time remaining until the event.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd spidey-invite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the Next.js app router files.
  - `page.tsx`: The main application logic and UI components (WebSlinger, Countdown, Forms).
  - `globals.css`: Global styles and custom animations.
  - `layout.tsx`: Root layout definition.
- `public/`: Static assets (images, etc.).

## Customization

To modify the event details (Date, Time, Location), edit the `app/page.tsx` file. Look for the content in the "STEP 2: DETAILS" section and the `targetDate` in the `Countdown` component.
