import React from 'react';
import { post } from '../utils/helper';
import Message from './Message';

const formatErrorMessages = errors => Object.entries(errors)
  .map(([field, msg]) => `${field} ${msg}`)
  .reduce((acc, val) => acc.concat(val), [])
  .map((text) => { return { text, type: 'error' }; });

export default () => {
  const defaultFormValues = { name: '', comments: '' };
  const [formValues, setFormValues] = React.useState(defaultFormValues);
  const [messages, setMessages] = React.useState([]);

  const onChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormValues((vals) => { return { ...vals, [key]: value }; });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    post('/api/feedbacks', {
      name: formValues.name,
      comments: formValues.comments
    }).then(() => {
      setMessages([{ text: 'Thank you for your feedback!' }]);
      setFormValues(defaultFormValues);
    }).catch(({ data }) => {
      setMessages(formatErrorMessages(data.errors));
    });
  };

  return (
    <form
      className="container mx-auto"
      onSubmit={onSubmit}
    >
      <div className="form-group">
        <label className="w-100" htmlFor="name">Your Name:
          <input
            onChange={onChange}
            value={formValues.name}
            className="form-control"
            type="text"
            id="name"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="w-100" htmlFor="comments">Comments:
          <textarea
            onChange={onChange}
            value={formValues.comments}
            className="form-control"
            id="comments"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      {messages
        .map(({ text, type }) => (
          <Message
            key={text}
            className="mt-3"
            message={text}
            type={type}
          />
        ))}
    </form>
  );
};
