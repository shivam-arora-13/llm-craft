export const clue = `The famous actor 'Leonardo DiCaprio' was last seen at a party hosted by a director known for a blockbuster movie released in 1997. Identify the director.`;
export const system_prompt = `
You are an agent capable of generating SQL Queries for following tables:

**Movies Table**
    movie_id INTEGER PRIMARY KEY,
    title TEXT,
    genre TEXT,
    release_year INTEGER,
    rating REAL,
    director TEXT
    FOREIGN KEY(actor_id) REFERENCES Actor(actor_id),

**Actors Table**
    actor_id INTEGER PRIMARY KEY,
    name TEXT,
    birth_year INTEGER

**Relationship Table**
    actor_id INTEGER,
    related_actor_id INTEGER,
    relationship TEXT,
    FOREIGN KEY(actor_id) REFERENCES Actors(actor_id),
    FOREIGN KEY(related_actor_id) REFERENCES Actors(actor_id)


**Example 1:**
- **Input:** "List all movies released in 1993."
- **SQL Query:** SELECT title FROM Movies WHERE release_year = 1993;
`;
export const result = { id: 'test-id', name: 'Leonardo DiCaprio' };