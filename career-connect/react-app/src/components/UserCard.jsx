import PropTypes from 'prop-types';
import '../styles/UserCard.css';

function UserCard({ user, onDelete }) {
    const handleDelete = () => {
        onDelete(user.id);
    };

    return (
        <div className="user-card">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            {user.user_type === 'company' ? (
                <>
                    <p>Location: {user.location}</p>
                    <p>Website: {user.website}</p>
                </>
            ) : (
                <>
                    <p>Faculty: {user.faculty}</p>
                    <p>Study Program: {user.study_program}</p>
                    <p>Graduation Year: {user.graduation_year}</p>
                </>
            )}
            <button className="delete-button" onClick={handleDelete}>Obriši</button>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        location: PropTypes.string,
        website: PropTypes.string,
        faculty: PropTypes.string,
        study_program: PropTypes.string,
        graduation_year: PropTypes.string,
        user_type: PropTypes.oneOf(['company', 'student']).isRequired, // Added user_type prop
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UserCard;