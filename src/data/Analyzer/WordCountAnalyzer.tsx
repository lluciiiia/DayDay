import { removeStopwords, eng } from 'stopword';
import connection from '../db.js'; // Import the MySQL connection

const ignoredWords = [
  'the',
  'when',
  'where',
  'how',
  'why',
  'what',
  'who',
  'that',
  'day',
  'today',
  'yesterday',
  'tomorrow',
  'really',
  'not',
  'no',
  'bit',
  'wasn',
  'isn',
  't',
  'm',
  's',
];

export class WordCountAnalyzer implements IAnalyzer<PlotableAnalysis> {
    async analyze(entries: Entry[]): Promise<PlotableAnalysis> {
      const wordCount = new Map<string, number>();
  
      for (const entry of entries) {
        const content = entry.content.map((c) => c.text).join(' ');
  
        const words = content
          .toLowerCase()
          .split(/\s+|(?=[^\w\s])|(?<=[^\w\s])/)
          .filter((word) => word.trim() !== '');
  
        const filteredWords = removeStopwords(words, eng).map((word) =>
          word.replace(/[^a-zA-Z]+/g, '')
        );
  
        filteredWords.forEach((word) => {
          if (!ignoredWords.includes(word)) {
            wordCount.set(word, (wordCount.get(word) || 0) + 1);
          }
        });
      }
  
      await this.updateDatabase(wordCount);
  
      const data: { label: string; value: number }[] = Array.from(wordCount.entries()).map(([word, count]) => ({
        label: word,
        value: count,
      }));
  
      return {
        name: 'Word Count Analysis',
        data: data,
      };
    }

    
  private async updateDatabase(wordCount: Map<string, number>) {
    try {
      await connection.execute('TRUNCATE TABLE word_counts'); // Clear existing word counts

      const insertQuery = 'INSERT INTO word_counts (word, count) VALUES (?, ?)';

      for (const [word, count] of wordCount.entries()) {
        await connection.execute(insertQuery, [word, count]);
      }

      console.log('Word counts updated in the database.');
    } catch (error) {
      console.error('Error updating word counts in the database:', error);
    }
  }
}
