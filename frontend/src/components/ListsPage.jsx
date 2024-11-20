import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import './ListsPage.css'; // External CSS for better styling

const ListsPage = () => {
  const [lists, setLists] = useState([]);

  // Fetch all lists on component mount
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get('/api/lists');
        setLists(response.data.data); // Set the fetched lists
      } catch (error) {
        console.error('Error fetching lists:', error);
        alert('Failed to fetch lists. Please try again later.');
      }
    };

    fetchLists();
  }, []);

  // Update the name of a list
  const handleEdit = async (id) => {
    const newName = prompt('Enter a new name for this list:');
    if (!newName) return;

    try {
      await axios.put(`/api/lists/${id}`, { name: newName });
      setLists((prev) =>
        prev.map((list) => (list._id === id ? { ...list, name: newName } : list))
      );
      alert('List updated successfully!');
    } catch (error) {
      console.error('Error updating list:', error);
      alert('Failed to update list. Please try again.');
    }
  };

  // Delete a list
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this list?')) return;

    try {
      await axios.delete(`/api/lists/${id}`);
      setLists((prev) => prev.filter((list) => list._id !== id));
      alert('List deleted successfully!');
    } catch (error) {
      console.error('Error deleting list:', error);
      alert('Failed to delete list. Please try again.');
    }
  };

  // Render the lists and their response codes with images
  return (
    <div className="lists-page-container">
      <h1>Saved Lists</h1>
      {lists.length > 0 ? (
        <div className="lists-container">
          {lists.map((list) => (
            <div className="list-card" key={list._id}>
              <h2>{list.name}</h2>
              <p>Created on: {new Date(list.creationDate).toLocaleString()}</p>
              <div className="list-actions">
                <button
                  onClick={() => handleEdit(list._id)}
                  className="edit-button"
                >
                  Edit Name
                </button>
                <button
                  onClick={() => handleDelete(list._id)}
                  className="delete-button"
                >
                  Delete List
                </button>
              </div>
              <div className="response-codes-container">
                {list.responseCodes.map((item) => (
                  <div className="response-code-item" key={item._id}>
                    <div className="response-code-info">
                      <p className="response-code-text">Response Code: {item.code}</p>
                      <img
                        src={item.imageUrl || '/images/default-image.jpg'} // Fallback to default image
                        alt={`${item.code} response code`}
                        className="response-code-image"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved lists found.</p>
      )}
    </div>
  );
};

export default ListsPage;
