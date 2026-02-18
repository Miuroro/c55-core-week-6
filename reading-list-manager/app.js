import chalk from 'chalk';
import {
  loadBooks,
  getUnreadBooks,
  getBooksByGenre,
  markAsRead,
  printAllBooks,
  printSummary,
} from './readingList.js';

console.log('📚 MY READING LIST 📚\n');

// 1. Load books on startup
const books = loadBooks();
console.log(`Loaded ${chalk.magenta(books.length)} books from library...\n`);

// 2. Display all books
console.log('🌸 ALL BOOKS 🌸');
printAllBooks();

// 3. Show summary statistics
printSummary();

// 4.1. Add example of filtering by read/unread status
console.log(chalk.bold('\n🍁 UNREAD BOOKS 🍁'));
const unreadBooks = getUnreadBooks();
if (unreadBooks.length > 0) {
  unreadBooks.forEach((book) => {
    console.log(chalk.yellow(`- ${book.title} by ${book.author}`));
  });
} else {
  console.log('No unread books!');
}

// 4.2. Add example of filtering by genre
console.log(chalk.bold('\n🍂 FICTION BOOKS 🍂'));
const fictionBooks = getBooksByGenre('Fiction');
if (fictionBooks.length > 0) {
  fictionBooks.forEach((book) => {
    console.log(
      `- ${book.title} by ${book.author} ${book.read ? chalk.green('✓') : chalk.yellow('✗')}`
    );
  });
} else {
  console.log('No fiction books found!');
}

// 5. Add example of marking a book as read
console.log(chalk.bold('\n✅ MARKING BOOK AS READ ✅'));
if (books.length > 0) {
  const bookToMark = books[0];
  if (!bookToMark.read) {
    console.log(`Marking "${bookToMark.title}" as read...`);
    markAsRead(bookToMark.id);
    console.log('✓ Updated!\n');
  } else {
    console.log(`"${bookToMark.title}" is already marked as read.\n`);
  }

  printSummary();
}
