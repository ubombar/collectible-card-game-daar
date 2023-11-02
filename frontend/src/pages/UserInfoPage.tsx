import { useParams } from 'react-router-dom';

const usersData = [
    { id: 1, name: 'User 1', otherInfo: '...'},
    { id: 2, name: 'User 2', otherInfo: '...'},
    { id: 3, name: 'User 3', otherInfo: '...'},
  ];

export const UserInfoPage = () => {
    const { ID } = useParams();
    console.log(ID)
    if (ID === undefined){
        return (
            <div>
              <p>Utente non trovato.</p>
            </div>
          ); 
    }
    const user = usersData.find((user) => user.id === parseInt(ID, 10));
    return (
        <div>
        <h2>User Details</h2>
        <p>ID: {user.id}</p>
        <p>Name: {user.name}</p>
        <p>Other Info: {user.otherInfo}</p>
        </div>
    );
   
};