import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { BsFillStopwatchFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function RecipeItem() {
    const recipes = useLoaderData(); // Load recipe data
    const [allRecipes, setAllRecipes] = useState(recipes);
    const [favItems, setFavItems] = useState(JSON.parse(localStorage.getItem("fav")) ?? []);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State for selected recipe details
    const path = window.location.pathname === "/myRecipe"; // Check if we're on the "myRecipe" page

    // Update recipes data when recipes prop changes
    useEffect(() => {
        setAllRecipes(recipes);
    }, [recipes]);

    // Delete recipe handler
    const onDelete = async (id) => {
        await axios.delete(`http://localhost:4000/recipe/${id}`);
        setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
        let filterItem = favItems.filter((recipe) => recipe._id !== id);
        localStorage.setItem("fav", JSON.stringify(filterItem));
        setFavItems(filterItem); // Update state of favorite items
    };

    // Handle adding/removing favorite recipes
    const favRecipe = (item) => {
        let updatedFavItems = [...favItems];
        const index = updatedFavItems.findIndex((recipe) => recipe._id === item._id);
        if (index === -1) {
            updatedFavItems.push(item); // Add to favorites if not already in it
        } else {
            updatedFavItems.splice(index, 1); // Remove from favorites if already in it
        }
        setFavItems(updatedFavItems);
        localStorage.setItem("fav", JSON.stringify(updatedFavItems)); // Save to localStorage
    };

    // Handle clicking on a recipe to view details in modal
    const handleRecipeClick = (item) => {
        setSelectedRecipe(item);  // Set the selected recipe for the modal
    };

    return (
        <>
            <div className="card-container">
                {allRecipes?.map((item, index) => {
                    return (
                        <div key={index} className="card">
                            <img
                                src={`http://localhost:4000/images/${item.coverImage}`}
                                alt={item.title}
                                width="120px"
                                height="100px"
                                onClick={() => handleRecipeClick(item)} // Click to view details
                            />
                            <div className="card-body">
                                <div className="title">{item.title}</div>
                                <div className="icons">
                                    <div className="timer">
                                        <BsFillStopwatchFill /> {item.time}
                                    </div>
                                    {(!path) ? (
                                        <IoMdHeart
                                            onClick={() => favRecipe(item)}
                                            style={{
                                                color: favItems.some((res) => res._id === item._id) ? "red" : "",
                                            }}
                                        />
                                    ) : (
                                        <div className="action">
                                            <Link to={`/editRecipe/${item._id}`} className="editIcon">
                                                <FaEdit />
                                            </Link>
                                            <MdDelete
                                                onClick={() => onDelete(item._id)}
                                                className="deleteIcon"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recipe Details Modal */}
            {selectedRecipe && (
                <div className="recipe-detail-modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSelectedRecipe(null)}>&times;</span>
                        <h2>{selectedRecipe.title}</h2>
                        <p><strong>Ingredients:</strong></p>
                        <ul>
                            {selectedRecipe.ingredients?.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <p><strong>Instructions:</strong></p>
                        <p>{selectedRecipe.instructions}</p>
                        <button onClick={() => setSelectedRecipe(null)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}
