import "./App.css";
import Fuse from 'fuse.js'
import { useEffect, useState } from "react";

function App() {
  const symptoms = ["itching", "skin_rash", "nodal_skin_eruptions", "dischromic _patches", "continuous_sneezing", "shivering", "chills", "watering_from_eyes", "stomach_pain", "acidity", "ulcers_on_tongue", "vomiting", "cough", "chest_pain", "yellowish_skin", "nausea", "loss_of_appetite", "abdominal_pain", "yellowing_of_eyes", "burning_micturition", "spotting_ urination", "passage_of_gases", "internal_itching", "indigestion", "muscle_wasting", "patches_in_throat", "high_fever", "extra_marital_contacts", "fatigue", "weight_loss", "restlessness", "lethargy", "irregular_sugar_level", "blurred_and_distorted_vision", "obesity", "excessive_hunger", "increased_appetite", "polyuria", "sunken_eyes", "dehydration", "diarrhoea", "breathlessness", "family_history", "mucoid_sputum", "headache", "dizziness", "loss_of_balance", "lack_of_concentration", "stiff_neck", "depression", "irritability", "visual_disturbances", "back_pain", "weakness_in_limbs", "neck_pain", "weakness_of_one_body_side", "altered_sensorium", "dark_urine", "sweating", "muscle_pain", "mild_fever", "swelled_lymph_nodes", "malaise", "red_spots_over_body", "joint_pain", "pain_behind_the_eyes", "constipation", "toxic_look_(typhos)", "belly_pain", "yellow_urine", "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding", "acute_liver_failure", "swelling_of_stomach", "distention_of_abdomen", "history_of_alcohol_consumption", "fluid_overload", "phlegm", "blood_in_sputum", "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion", "loss_of_smell", "fast_heart_rate", "rusty_sputum", "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool", "irritation_in_anus", "cramps", "bruising", "swollen_legs", "swollen_blood_vessels", "prominent_veins_on_calf", "weight_gain", "cold_hands_and_feets", "mood_swings", "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties", "abnormal_menstruation", "muscle_weakness", "anxiety", "slurred_speech", "palpitations", "drying_and_tingling_lips", "knee_pain", "hip_joint_pain", "swelling_joints", "painful_walking", "movement_stiffness", "spinning_movements", "unsteadiness", "pus_filled_pimples", "blackheads", "scurring", "bladder_discomfort", "foul_smell_of urine", "continuous_feel_of_urine", "skin_peeling", "silver_like_dusting", "small_dents_in_nails", "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"];
  const [item, setItem] = useState([]);
  const [inputItem, setInputItem] = useState('');
  const [result, setResult] = useState([]);
  const [Disease, setDisease] = useState("");
  const [description, setDescription] = useState("");
  const [precautions, setPrecautions] = useState([]);
  const [prediction, setPrediction] = useState();
  const [show, setShow] = useState(false);
  const fuse = new Fuse(symptoms, {
    includeScore: true,
    shouldSort: true,
    ignoreLocation: true,
  });
  function handleChange(event) {
    setInputItem(event.target.value)
    setResult(fuse.search(event.target.value))
  }
  function handleClick(event) {
    setItem([...item, event.target.innerText])
    // JSON.stringify(item)
  }
  function removeButton(event) {
    setItem(item.filter((i) => i !== event.target.innerText))
  }
  const searchResults = result.slice(0, 5).map((i) => {
    if (!item.includes(i.item) && inputItem.length > 0)
      return (<div className="resultbutton">
        <button key={i.item} onClick={handleClick} className="searchresultbuttons">{i.item}</button>
        <hr />
      </div>)
  });
  const selectedItems = item.map((i) => {
    return <button key={i} onClick={removeButton} className="selecteditemsbuttons" >{i}</button>
  });
  function Predict() {
    setShow(true)
    let symptoms_string = "";
    for (let i = 0; i < item.length; i++) {
      symptoms_string += item[i] + '-';
    }
    // console.log('http://localhost:8000/predict/' + symptoms_string);
    fetch('http://localhost:8000/predict/' + symptoms_string)
      .then(response => response.json())
      .then(data => setPrediction(data));
  }
  function PredictAgain() {
    setShow(false)
    setItem([])
    setInputItem('')
    setResult([])
    setDisease("")
    setDescription("")
    setPrecautions([])
    setPrediction()
  }
  useEffect(() => {
    if (prediction) {
      setDisease(prediction.disease);
      setDescription(prediction.description);
      setPrecautions([prediction.precaution1, prediction.precaution2, prediction.precaution3, prediction.precaution4]);
    }
  }, [prediction])
  const precautionsList = precautions.map((i) => {
    if (i !== "")
      return <li key={i}>{i}</li>
  })
  const h = "Precautions"
  return (
    <div className="App">
      <h1>Disease Prediction</h1>
      {!show && <div class="searching-data">
        <div className="search">
          <input type="text" onChange={handleChange} placeholder="Enter symptoms " />
          <div class="result-block">{inputItem != "" && <div className="searchresults">{searchResults}</div>}</div>
          <div class="selctedsymptoms">
            {item.length > 0 && <span>Selected symptoms   </span>}
            <div className="selecteditems">{selectedItems}</div>
          </div>
          {item.length > 0 && <button className="predict" onClick={Predict} >Predict</button>}
        </div>
      </div>}
      {show && <div className="prediction-data">
        {!Disease && <div class="loader">
          <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>}
        {Disease && <div className="pred">
          <h2>{Disease}</h2>
          <p>{description}</p>
          <h3>{Disease && h}</h3>
          <ul>{precautionsList}</ul>
          <button className="predict predict-again" onClick={PredictAgain} >Predict Again</button>
        </div>}
      </div>}
    </div>
  );
}

export default App;
