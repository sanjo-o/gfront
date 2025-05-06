import React, { useState } from "react";
import '../CSS/Aminal.css';
import Header from "./Header";

// Import your animal images here
import lion from "../assets/LION.png";
import bear from "../assets/BEAR.png";
import panda from "../assets/PANDA.png";
import cat from "../assets/CAT.png";
import rabbit from "../assets/RABBIT.png";
import dog from "../assets/DOG.png";

const animals = [
  { id: 1, src: dog, name: "Нохой" },
  { id: 2, src: cat, name: "Муур" },
  { id: 3, src: panda, name: "Панда" },
  { id: 4, src: bear, name: "Баавгай" },
  { id: 5, src: lion, name: "Арслан" },
  { id: 6, src: rabbit, name: "Туулай" },
];

const AnimalSelector = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(animal);
  };

  return (
    <>
      <Header />
      <div className="animal-container">
        <div className="animal_choose_background">
          <h2 className="choose_text">Өөрийн амьтнаа сонгоно уу</h2>
          <div className="animal_grid">
            {animals.map((animal) => (
              <div
                key={animal.id}
                className={`animal_item ${selectedAnimal?.id === animal.id ? 'selected' : ''}`}
                onClick={() => handleAnimalSelect(animal)}
              >
                <img 
                  src={animal.src} 
                  alt={animal.name} 
                  className="animal_img"
                />
                <p className="name_text">{animal.name}</p>
              </div>
            ))}
          </div>
          <div className="button_container">
            <button className="cancel_button">
              Цуцлах
            </button>
            <button className="save_button">
              Хадгалах
            </button>
          </div>
        </div>

        <div className="info_card">
          <h2 className="title">Таны булан</h2>
          <div className="selected_animal">
            <img 
              src={selectedAnimal?.src || panda} 
              alt="Selected Animal" 
              className="animal_img"
            />
          </div>
          <div className="email_box">
            Хэрэглэгчийн нэр
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimalSelector;
