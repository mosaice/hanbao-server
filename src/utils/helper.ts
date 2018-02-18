export const unless = (paths, middleware) => (req, res, next) =>
  paths.includes(req.path) ? next() : middleware(req, res, next)

