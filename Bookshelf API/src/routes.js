const {
  addBooks,
  getAllBooksHandler,
  getBooksById,
  editBooks,
  deleteBooks,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBooks,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooks,
  },
]

module.exports = routes;