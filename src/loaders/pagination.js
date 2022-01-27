function paginateResults(model, limit) {
  return (req, res, next) => {
    const page = Number(req.query.page);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    results.numberOfPages = Math.ceil(model.length / limit);
    results.results = model.slice(startIndex, endIndex);

    // first if statement makes sure that current page cannot be negative or greater than total number of pages

    if (page <= results.numberOfPages && page > 0) {
      if (startIndex > 0) {
        results.previousPage = page - 1;
      }
      if (endIndex < model.length) {
        results.nextPage = page + 1;
      }
    }

    res.paginatedResults = results;
    next();
  };
}

// no data so far

module.exports = (app) => {
  app.get("/projects", paginateResults((projects = []), 6), (req, res) => {
    res.json(res.paginatedResults);
  });
  app.get("/people", paginateResults((people = []), 10), (req, res) => {
    res.json(res.paginatedResults);
  });
  app.get("/clients", paginateResults((clients = []), 9), (req, res) => {
    res.json(res.paginatedResults);
  });
};
