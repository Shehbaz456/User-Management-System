import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/users/userSlice';

const UserList = () => {
    const { users, status, error } = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (status === 'loading') return <p>Loading...</p>;
    if (error) return <p className="text-red-400">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-3">User List</h2>
            <ul>
                {users.map((user,index) => (
                    <li key={index} className="bg-gray-100 p-2 mb-2 flex justify-between gap-4 ">
                        <span>{user.username} {user.age}</span>
                        <button onClick={() => dispatch(deleteUser(user._id))} className="bg-red-400 text-white px-2 py-1 rounded">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
