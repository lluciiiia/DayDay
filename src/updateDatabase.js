import connection from './data/db'; // Import the MySQL connection

async function updateDatabase() {
  try {
    await connection.execute('TRUNCATE TABLE word_counts'); // Clear existing word counts

    const insertQuery = 'INSERT INTO word_counts (word, count) VALUES (?, ?)';

    for (const { word, count } of wordCount) {
      await connection.execute(insertQuery, [word, count]);
    }

    console.log('Word counts updated in the database.');
  } catch (error) {
    console.error('Error updating word counts in the database:', error);
  }
}
