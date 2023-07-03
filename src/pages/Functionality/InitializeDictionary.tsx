const Dictionary: { date: string; content: string }[] = JSON.parse(localStorage.getItem('dictionary') || '[]');

export default Dictionary;

