import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/users/userSlice';

const UserForm = () => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [hobby, setHobby] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const dispatch = useDispatch();

    const handleAddHobby = () => {
        if (hobby.trim()) {
            setHobbies([...hobbies, hobby]);
            setHobby('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !age || hobbies.length === 0) return;
        await dispatch(addUser({ 
            username,
            age: Number(age),
            hobbies
        }));
        setUsername('');
        setAge('');
        setHobbies([]);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-200 flex flex-col space-y-3">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-2 border rounded" required />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="p-2 border rounded" required />
            
            <div className="flex space-x-2">
                <input type="text" placeholder="Hobby" value={hobby} onChange={(e) => setHobby(e.target.value)} className="p-2 border rounded" />
                <button type="button" onClick={handleAddHobby} className="bg-green-500 text-white px-2 rounded">Add Hobby</button>
            </div>

            <ul className="text-gray-700">
                {hobbies.map((h, index) => <li key={index}>• {h}</li>)}
            </ul>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add User</button>
        </form>
    );
};
export default UserForm;