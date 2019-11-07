import React from 'react';

export default () => (
  <form className="container mx-auto">
    <div className="form-group">
      <label className="w-100" htmlFor="name">Your Name:
        <input className="form-control"  type="text" id="name" />
      </label>
    </div>
    <div className="form-group">
      <label className="w-100" htmlFor="comments">Comments:
        <textarea className="form-control" id="comments" />
      </label>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
);
