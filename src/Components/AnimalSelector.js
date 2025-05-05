import React from "react";
import "./Aminal.css"; // Fixed relative path
import lion from "../assets/LION.png";
import bear from "../assets/BEAR.png";
import panda from "../assets/PANDA.png";
import cat from "../assets/CAT.png";
import rabbit from "../assets/RABBIT.png";
import dog from "../assets/DOG.png";
import saveButton from "../assets/SAVE-BUTTON.png";
import cancelButton from "../assets/X-BUTTON.png";
import animalBack from "../assets/animal.png";
import Header from "../Components/Header"; // Fixed import

const animals = [
  { src: lion, name: "Арслан" },
  { src: bear, name: "Баавгай" },
  { src: panda, name: "Панда" },
  { src: cat, name: "Муур" },
  { src: rabbit, name: "Туулай" },
  { src: dog, name: "Нохой" },
];

const AnimalSelector = () => {
  return (
    <>
      <Header /> {/* Header is now correctly imported */}
      <div
        className="animal-container"
        style={{
          backgroundImage: `url(${animalBack})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh", // Make sure it fills the screen
        }}
      >
        <div className="animal_choose_background">
          <h2 className="choose_text">Өөрийн амьтнаа сонгоно уу</h2>
          <div className="animal_grid">
            {animals.map((animal, index) => (
              <div key={index} className="animal_item">
                <img src={animal.src} alt={animal.name} className="animal_img" />
                <p className="name_text">{animal.name}</p>
              </div>
            ))}
          </div>
          <div className="button_container">
            <button className="cancel_button">
              <img src={cancelButton} alt="Цуцлах" />
              <p className="cancel_text">Цуцлах</p>
            </button>
            <button className="save_button">
              <img src={saveButton} alt="Хадгалах" />
              <p className="save_text">Хадгалах</p>
            </button>
          </div>
        </div>
        <div className="info_card">
          <h2 className="title">Таны булан</h2>
          <div className="username">Хэрэглэгчийн нэр</div>
          <div className="email_box">Email</div>
          <div className="selected_animal">
            <img src={panda} alt="Selected Animal" className="panda_img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimalSelector;
