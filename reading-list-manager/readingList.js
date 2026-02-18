import fs from 'fs';
import chalk from 'chalk';

const readingListPath = './books.json';

function loadBooks() {
  try {
    const data = fs.readFileSync(readingListPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create empty array
      return [];
    } else if (error instanceof SyntaxError) {
      // Invalid JSON, notify user and return empty array
      console.warn('Invalid JSON in books.json, starting with empty array');
      return [];
    } else {
      throw error;
    }
  }
}

function saveBooks(books) {
  try {
    fs.writeFileSync(readingListPath, JSON.stringify(books, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving books:', error.message);
    throw error;
  }
}

function addBook(book) {
  const books = loadBooks();
  books.push(book);
  saveBooks(books);
}

function getUnreadBooks() {
  const books = loadBooks();
  return books.filter((book) => !book.read);
}

function getBooksByGenre(genre) {
  const books = loadBooks();
  return books.filter((book) => book.genre === genre);
}

function markAsRead(id) {
  const books = loadBooks();
  const updatedBooks = books.map((book) =>
    book.id === id ? { ...book, read: true } : book
  );
  saveBooks(updatedBooks);
}

function getTotalBooks() {
  const books = loadBooks();
  return books.length;
}

function hasUnreadBooks() {
  const books = loadBooks();
  return books.some((book) => !book.read);
}

function printAllBooks() {
  const books = loadBooks();
  books.forEach((book) => {
    const status = book.read ? chalk.green('✓ Read') : chalk.yellow('✗ Unread');
    console.log(`${chalk.cyan(book.title)} by ${book.author} [${status}]`);
  });
}

function printSummary() {
  const books = loadBooks();
  const totalBooks = books.length;
  const readCount = books.filter((book) => book.read).length;
  const unreadCount = totalBooks - readCount;

  console.log(chalk.bold('\n🌈 Reading List Summary 🌈'));
  console.log(chalk.bold('Total Books: ') + totalBooks);
  console.log(chalk.bold('Read: ') + chalk.green(readCount));
  console.log(chalk.bold('Unread: ') + chalk.yellow(unreadCount));
}

export {
  loadBooks,
  saveBooks,
  addBook,
  getUnreadBooks,
  getBooksByGenre,
  markAsRead,
  getTotalBooks,
  hasUnreadBooks,
  printAllBooks,
  printSummary,
};
