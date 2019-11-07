import React from 'react';

export default () => (
  <form className="container mx-auto">
    <div className="form-group">
      <label htmlFor="name">Your Name:
        <input type="text" className="form-control" id="name" />
      </label>
    </div>
    <div className="form-group">
      <label htmlFor="comments">Comments:
        <textarea className="form-control" id="comments" />
      </label>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
);
