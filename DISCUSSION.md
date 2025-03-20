Want to leave some notes and thoughts about the coding challenge.

### Time Spent

I spent about 2 hours and 30 minutes on coding and maybe around 10 minutes writing this doc. The coding wasn't done in one go, though. It were 30 ~40-minutes sessions.

### Focus areas

I tried to focus on imprving patient experience, rather than on specific part of the stack (front-end or backend). I think I spent more time on the client-side: I think in this specific case it gave more improvements for the patient.

### Next steps and thoughts

For a real application we will have to use the database to store the advocates data. So the squering and sorting login on the BE will be replaced with queries to the data-base. Although, I think the overal structure of the app won't change that much: we still might want to keep the client-side "cache" and filter and sort it, to provide a fast feedback for the users.

As we get more data, we probably should start thinking about pagination of some sort. However, I think for the search interface it is more important to have a good quering and sorting (ranking) logic, rather than pagination: people very rarely go to the second page (or even to the end of the first page) of google search, but rather update their query.

Some improvements there might include using some LLM techniques to let patients use more natural language for their search, and then use LLM and vector data-base to find the best matching advocate. This approach will help to solve the problem of unknown-unknows for the patients, when they not exactly know what are they looking for (how their specific probmlem is called, or what jargon-word to use to findbest results).
