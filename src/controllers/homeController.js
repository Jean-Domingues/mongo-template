const HomeModel = require('../models/HomeModel');

exports.paginaInicial = (req, res) => {
  res.render('index', {
    titulo: '<span style="color: red;">Olá mundo</span>',
    numeros: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  });
};

exports.postRequest = (req, res) => {
  res.send(req.body);
};
