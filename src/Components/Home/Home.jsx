import React, { useState } from 'react'
import banner from "../../Assets/barner.png";
import './home.css'
import { useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { UserAuth } from '../../Context/AuthContext';
import { auth } from '../../firebase';

const Home = () => {
  const [income, setIncome] = useState("");
  const [goals, setGoals] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { getUserData, dataCollectionRef } = UserAuth();

    const handleStartCalculation = async (e) => {
      e.preventDefault();
      try {
        await addDoc(dataCollectionRef, {
          name: name,
          income: Number(income),
          goals: goals,
          userId: auth?.currentUser?.uid,
        });
        getUserData();
        console.log("Userdata added succesfully:")
      } catch (err) {
        console.error(err);
      }
      navigate("/dashboard");
    }
    return (
        <div className="flex welcome w-[90%] mx-[auto] ">
          <div className="hidden md:block banner">
            <img src={banner} alt="banner" />
          </div>
          <div className="px-[40px] py-[20px]">
            <div className="grid income-input-section">
              <h2>
                Monthly <span>Budget</span>
              </h2>
              <div className="grid mt-[20px]">
                <input
                  type="number"
                  min="1"
                  placeholder="Insert Your Income"
                  required
                  onChange={(e) => setIncome(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Insert Your Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Insert Your Goals"
                  required
                  onChange={(e) => setGoals(e.target.value)}
                />
              </div>
            </div>
            <div className="btn mt-[60px]">
              <input
                type="submit"
                value="Start Your Calculation"
                onClick={handleStartCalculation}
              />
            </div>
          </div>
        </div>
      );
}

export default Home
