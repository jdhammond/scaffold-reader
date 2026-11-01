## Data problems

- A duplicate scaffold id (s-08), and a missing s-09, that don't affect this implementation
- Different scaffold anchor formats: some index-based, some quote-string-based
- Mixed data types in student levels: I assumed the odd one out was a WIDA level and mapped accordingly.
- Overlapping annotations. Currently, I'm resolving based on confidence, but that's not obviously always the right choice. E.g., Amara doesn't get a Spanish scaffold for 'water vapor' in this implementation.
- Mixed references to languages: Without more data points to infer patterns, I mapped home-language names to scaffold language codes with a lookup table
- Should annotation targets be case sensitive? I leaned toward yes, because capitalization can matter in a vocab context (e.g. Mercury the planet vs mercury the element).
- Semi-clear distinction between glossary and simplify scaffolds. Glossary has 'term' and 'definition', and simplify has 'text', but they have similar purposes so I render their content the same way apart from the label.

## Scaffold design

Scaffolds are lightly highlighted and display on hover or focus, so they are easily available but don't appear until the student seeks their help. They are labeled according to their scaffold type. They can be accessed with the tab key and closed with escape. Support text is linked by `aria-describedby`. Translations have `lang` attached.

Scaffolds are selected based on a student's language and their level relative to the scaffold's level. Only scaffolds matching a minimum confidence level are displayed. I chose .5 as an arbitrary threshold; the one obviously low-confidence scaffold has a confidence of .31

When in doubt, I aimed for the better/safer student experience:

- A student whose level can't be resolved definitively gets scaffolds as though their level was 1.
- Where two scaffolds overlap, the higher-confidence one is displayed.
- A learner who gets no scaffolds (Jonah) doesn't see a message to that effect, because that's just his learning experience.

## Next steps

- Tidy up scaffold types - there are things that I could do with unions and generics that would more precisely reflect the data, although in a full project I would tend to push some of that validation toward the backend.
- Figure out a better way to handle overlapping scaffolds. The system I have works well enough for this passage, but more complex data could cause problems.
- Tap-to-open for touch devices.
- Create a logging utility. Right now, I'm using console.warn, but ideally, the data discrepancies that are warned in this way should be sent to an observability service so that we can see and address them.
- Spend time working on getting screen-reader functionality ironed out
- Introduce some React Testing Library tests in higher-level components to test things like tooltip interactions
- Introduce axe a11y testing
- Additional visual polish. Scaffold tooltips color-coded based on their type would look nice.
- I imagined a teacher dialog where they could have a chance to address data discrepancies, either in the moment or from a teacher portal later on (the latter would require backend work outside the scope of this task)

## AI usage & time

I used Claude to bounce my general architectural approach off of. I also used it to generate code, largely in a step-by-step way (E.g. 'let's do X now, bearing in mind Y and Z'), and for debugging passes. I leaned on it for the boilerplate in the README.

This took me ~3 hrs of active work across ~3h45 of wall-clock time, with a few short pauses to take care of dog and chores.
