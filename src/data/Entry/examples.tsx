// Example usage of EntryService methods
const category: Category = {
  category: "Your Category",
  entries: [
    {
      content: [{ type: "text" }],
      date: new Date(),
      title: "Your Entry Title",
    },
  ],
};

EntryService.addEntryByCategory(category, {
  content: [{ type: "image" }],
  date: new Date(),
  title: "Another Entry",
});

const allEntries = EntryService.getAllEntries();
console.log("All Entries:", allEntries);

const entryById = EntryService.getEntryByTitle("123");
console.log("Entry by ID:", entryById);

const entryByDate = EntryService.getEntryByDate(new Date());
console.log("Entry by Date:", entryByDate);

const updated = EntryService.updateEntry(category, "123", {
  content: [{ type: "video" }],
  date: new Date(),
  title: "Updated Entry",
});
console.log("Update Status:", updated);

const deleted = EntryService.deleteEntry(category, "123");
console.log("Deletion Status:", deleted);

const searchResults = EntryService.searchEntries(category, "keyword");
console.log("Search Results:", searchResults);
