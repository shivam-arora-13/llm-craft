export const schemas = `
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
`;
