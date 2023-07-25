const { nanoid } = require('nanoid');
const books = require('./books');

const addBooks = (request, h) => {
  const { nama, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  if (!nama) {
    const response = h.response({
      status: "Fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: "Fail",
      message: 'Gagal menambahkan buku. Nilai readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  
  
  const newBooks = {
    id, nama, year, author, summary, publisher, pageCount, readPage, reading, createdAt, updatedAt
  };
  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else if (books.length === 0) {
    return h.response({
      status: 'success',
      message: 'Belum terdapat buku yang dimasukkan',
      data: {
        books: [],
      },
    }).code(200);
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;

};



const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books,
  },
});



// Kriteria 5 : API dapat menampilkan detail buku
const getBooksById = (request, h) => {
  const { id } = request.params;

  const book = books.find((n) => n.id === id);

  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book: book,
      },
    });
    response.code(200);
    return response;
  }


  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
}

// Edit
const editBooks = (request, h) => {
  const { id } = request.params;

  const book = books.find((n) => n.id === id);


  const { nama, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  
  if (readPage > pageCount ) {
    const response = h.response({
      status: "Fail",
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCoun',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      id,
      nama,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      createdAt,
      updatedAt
    };

    if (!nama) {
    const response = h.response({
      status: "Fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

    const response = h.response({
    status: 'success',
    message: 'Book berhasil diperbarui',
    });
    response.code(200);
    return response;
  };

  

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal perbaharui. Id tidak ditemukan',
  });
  response.code(404);
  return response;

  
}


// DELETE
const deleteBooks = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku Berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

module.exports = { addBooks, getAllBooksHandler, getBooksById, editBooks, deleteBooks };