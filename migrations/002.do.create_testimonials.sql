CREATE TABLE testimonials (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  client TEXT NOT NULL,
  quote TEXT NOT NULL,
  author TEXT NOT NULL
);