var Book = require('../models/Books');
var _ = require('underscore');
/**
 * GET /
 */
exports.index = function (req, res) {
    Book.fetch(function (err, books) {
        if (err) {
            console.log(err)
        }
        res.render('home', {
            title: 'Home',
            books: books
        });
    });
};

exports.detail = function (req, res) {
    var id = req.params.id;
    Book.findById(id, function (err, book) {
        res.render('detail', {
            title: 'TransBook ' + book.title,
            book: book
        });
    })
};

exports.admin = function (req, res) {
    res.render('admin', {
        title: 'TransBook后台录入页面',
        book: {
            title: '',
            country: '',
            year: '',
            author: '',
            summary: '',
            cover: ''
        }
    });
};

//update book
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Book.findById(id, function (err, book) {
            res.render('admin', {
                title: 'TransBook后台更新页',
                book: book
            })
        })
    }
};

//post book
exports.add = function (req, res) {
    var id = req.body.book._id;
    var bookObj = req.body.book;
    var _book;
    if (id !== 'undefined') {
        Book.findById(id, function (err, book) {
            if (err) {
                console.log(err)
            }
            _book = _.extend(book, bookObj);
            _book.save(function (err, book) {
                if(err) {
                    console.log(err)
                }
                res.redirect('/book/' + book._id)
            })
        })
    } else {
        _book = new Book({
            title: bookObj.title,
            author: bookObj.author,
            country: bookObj.country,
            year: bookObj.year,
            cover: bookObj.cover,
            summary: bookObj.summary
        });
        _book.save(function (err, book) {
            if(err) {
                console.log(err)
            }
            res.redirect('/book/' + book._id)
        })
    }
};

exports.list = function (req, res) {
    Book.fetch(function (err, books) {
        if (err) {
            console.log(err)
        }
        res.render('list', {
            title: 'TransBook后台列表',
            books: books
        });
    });
};

exports.delete = function (req, res) {
    var id = req.query.id;

    if (id) {
        Book.remove({_id: id}, function (err, book) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        })
    }
};