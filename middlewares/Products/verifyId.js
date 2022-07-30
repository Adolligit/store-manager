module.exports = (req, res, next) => {
  const { id } = req.params;

  if (Number.isNaN(+id)) {
    throw new Error(
      'O id informado é inválido',
      { cause: { status: 422 } },
    );
  }

  // nem precisava passar, mas queria usar o 'locals' ;)
  res.locals.id = id;
  
  next();
};