import React from 'react';

export default function RecipeModal({ recipe, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>{recipe.title}</h2>
                <h3>Ingredients:</h3>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h3>Instructions:</h3>
                <p>{recipe.instructions}</p>
            </div>
        </div>
    );
}
