import { useSelector, useDispatch } from 'react-redux';
import counterSlice from '../stores/slices/counterSlice';
import { useEffect } from 'react';
import { getPost } from '../stores/middlewares/postMiddleware';
function Counter() {
    const { increment, decrement } = counterSlice.actions
    const count = useSelector((state) => state.counter.value);
    const status = useSelector(state => state.counter.status);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPost());
    }, []);
    const postList = useSelector(state => state.counter.postList);
    console.log(postList);
    if (status === 'error') {
        return <h3>Error</h3>
    }
    return (<>
        <div style={{
            background: "#FFF",
            height: "100vh",
        }}>
            <h1>{count}</h1>
            <button onClick={() => dispatch(increment(10))}>Increment</button>
            <button onClick={() => dispatch(decrement(10))}>Decrement</button>
            <h1>postList</h1>
            {((status !== 'idle') && (status === 'pending')) ? (
                <h2>loading...</h2>
            ) : (
                <ul>
                    {postList.map(({ id, title }) => (
                        <li key={id}>{title}</li>
                    ))}
                </ul>
            )}
        </div>
    </>);
}

export default Counter;
