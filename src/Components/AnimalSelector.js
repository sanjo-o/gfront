import React, { useEffect, useState } from "react";
import "../CSS/Aminal.css";
import Header from "./Header";
import { saveUserInfo, fetchUserInfoById } from "../api/userinfo";

import lion from "../assets/LION.png";
import bear from "../assets/BEAR.png";
import panda from "../assets/PANDA.png";
import cat from "../assets/CAT.png";
import rabbit from "../assets/RABBIT.png";
import dog from "../assets/DOG.png";

const animals = [
  { id: 1, src: dog, name: "Нохой", value: "dog" },
  { id: 2, src: cat, name: "Муур", value: "cat" },
  { id: 3, src: panda, name: "Панда", value: "panda" },
  { id: 4, src: bear, name: "Баавгай", value: "bear" },
  { id: 5, src: lion, name: "Арслан", value: "lion" },
  { id: 6, src: rabbit, name: "Туулай", value: "rabbit" },
];

const AnimalSelector = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [userInfoId, setUserInfoId] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadUserInfo = async () => {
      if (!currentUser?.id) return;

      const result = await fetchUserInfoById(currentUser.id); // Must call correct API path

      if (!result || result.error) {
        setMessage("📭 UserInfo not found. Та мэдээллээ бөглөнө үү.");
        return;
      }

      setUserInfoId(result._id);
      setNickname(result.nickname || "");
      setBio(result.bio || "");

      const matched = animals.find((a) => a.value === result.favoriteAnimal);
      if (matched) setSelectedAnimal(matched);
    };

    loadUserInfo();
  }, [currentUser?.id]);

  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(animal);
  };

  const handleSave = async () => {
    if (!nickname || !selectedAnimal || !bio) {
      setMessage("⚠️ Бүх талбарыг бөглөнө үү.");
      return;
    }

    const body = {
      userId: currentUser.id,
      nickname,
      email: currentUser.email,
      favoriteAnimal: selectedAnimal.value,
      bio,
    };

    const result = await saveUserInfo(body, userInfoId);

    if (result.error) {
      setMessage(`❌ Алдаа: ${result.error}`);
    } else {
      setMessage("✅ Амжилттай хадгалагдлаа!");
      if (result._id) setUserInfoId(result._id);
    }
  };

  return (
    <>
      <Header />
      <div className="animal-container">
        <div className="animal_choose_background">
          <h2 className="choose_text">Өөрийн амьтнаа сонгоно уу</h2>

          <div className="input_section">
            <label className="input_label">Никнэйм:</label>
            <input
              className="input_text"
              placeholder="Никнэйм"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />

            <label className="input_label">Танилцуулга:</label>
            <textarea
              className="input_textarea"
              placeholder="Өөрийгөө товч танилцуулаарай"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="animal_grid">
            {animals.map((animal) => (
              <div
                key={animal.id}
                className={`animal_item ${selectedAnimal?.id === animal.id ? "selected" : ""}`}
                onClick={() => handleAnimalSelect(animal)}
              >
                <img src={animal.src} alt={animal.name} className="animal_img" />
                <p className="name_text">{animal.name}</p>
              </div>
            ))}
          </div>

          <div className="button_container">
            <button className="cancel_button" onClick={() => setSelectedAnimal(null)}>
              Цуцлах
            </button>
            <button className="save_button" onClick={handleSave}>
              Хадгалах
            </button>
          </div>

          {message && <p className="status-text">{message}</p>}
        </div>

        <div className="info_card">
          <h2 className="title">Таны булан</h2>
          <div className="selected_animal">
            <img src={selectedAnimal?.src || panda} alt="Selected Animal" className="animal_img" />
          </div>
          <div className="email_box">
            {nickname || currentUser?.nickname || currentUser?.email || "Нэвтрээгүй хэрэглэгч"}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimalSelector;
