import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGreeting } from './greetingSlice';

function Greeting() {
  const dispatch = useDispatch();
  const greeting = useSelector((state) => state.greeting.entity);
  const status = useSelector((state) => state.greeting.status);
  const error = useSelector((state) => state.greeting.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGreeting());
    }
  }, [status, dispatch]);

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' && <div>{greeting}</div>}
      {status === 'failed' && (
        <div>
          Error:
          {' '}
          {error}
        </div>
      )}
    </div>
  );
}

export default Greeting;
