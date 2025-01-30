import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import RecipeItem from '../components/RecipeItem'
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';
export default function Home()
{
    const navigate=useNavigate()
    const[isOpen,setIsOpen]=useState(false)
    const addRecipe=()=>{
        let token=localStorage.getItem("token")
        if(token)
        navigate("/addRecipe")
        else{
        setIsOpen(true)
    }
    }



    return(
        <>
     
        <section className='home'>
            <div className='left'>
                <h1>Food Recipe</h1>
                
            <h5>A food recipe blog is a platform where delicious recipes, cooking tips, and food stories are shared. It includes step-by-step instructions, ingredient lists, and cooking techniques for various cuisines. High-quality images and videos enhance the reader’s experience, making it easy to follow. Many blogs also provide nutritional information, dietary alternatives, and meal-planning ideas. Engaging content and personal anecdotes create a community of food lovers and home chefs.</h5>
            <button onClick={addRecipe}>Share your Recipe</button>
            </div>
            <div className='right'></div>
            <img src={foodRecipe}width="370px" height="350px"></img>
        </section>
        <div className='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,32L15,48C30,64,60,96,90,144C120,192,150,256,180,277.3C210,299,240,277,270,250.7C300,224,330,192,360,165.3C390,139,420,117,450,133.3C480,149,510,203,540,192C570,181,600,107,630,106.7C660,107,690,181,720,202.7C750,224,780,192,810,181.3C840,171,870,181,900,197.3C930,213,960,235,990,224C1020,213,1050,171,1080,128C1110,85,1140,43,1170,64C1200,85,1230,171,1260,202.7C1290,235,1320,213,1350,192C1380,171,1410,149,1425,138.7L1440,128L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"></path></svg>
        </div>
         {(isOpen) && <Modal onClose={()=>setIsOpen(false)}> <InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}

        <div className='recipe'>
            <RecipeItem/>
        </div>
      
        </>

    )
}