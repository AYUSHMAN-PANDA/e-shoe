const errors = require("restify-errors");
const issues = require("../models/issues");

module.exports = (server) => {
  //get all issues
  server.get("/allIssues", async (req, res, next) => {
    try {
      const all_issues = await issues.find({});
      res.send(all_issues);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  //add an issue

  server.post("/addIssue", async (req, res, next) => {
    const new_issue = new issues({
      title: req.body.title,
      description: req.body.description,
      assignees: req.body.assignees,
      tags: req.body.tags,
      state: req.body.state,
    });

    try {
      const added_issue = await new_issue.save();
      res.send(201);
      next();
    } catch (err) {
      next(new errors.InternalError(err));
    }
  });

  //update issue by id

  server.put("/update-issue/:id", async (req, res, next) => {
    try {
      const found_issue = await issues.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.send(201);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `No user with the id of ${req.params.id}`
        )
      );
    }
  });

  //delete single issue by id
  server.del("/del-issue/:id", async (req, res, next) => {
    try {
      const deleted_user = await issues.findByIdAndRemove(req.params.id);
      res.send(deleted_user);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `No user with the id of ${req.params.id}`
        )
      );
    }
  });

  //delete all issues
  server.del("/del-all-issues", async (req, res, next) => {
    try {
      const found_user = await issues.deleteMany();
      res.send(`${found_user.deletedCount}`);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `No user with the matching condition found`
        )
      );
    }
  });
};
