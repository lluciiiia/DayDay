const wordCount: { count: number; word: string }[] = JSON.parse(localStorage.getItem('wordCount') || '[]');

export default wordCount;

