import React from "react";
import "./CategoryLists.css";
export default function CategoryLists(props) {
  const { SelectedTab } = props;
  const CatList = {
    Home: [
      [
        "Cooking Appliances",
        "LED Flood Lights",
        "LED Street Lights",
        "LED Outdoor Wall Lights",
        "LED Outdoor Lighting",
        "LED Flood Lights",
        "LED Street Lights",
        "LED Outdoor Wall Lights",
      ],
      [
        "Air Conditioning Appliances",
        "Laser Lights",
        "Follow Spot Lights",
        "Moving Lights",
        "LED Fountain Lights",
        "Stage Lights",
        "Laser Lights",
        "Follow Spot Lights",
        "Moving Lights",
        "LED Fountain Lights",
      ],
      [
        "Cleaning Appliances",
        "LED Stage Lights",
        "LED Cabinet Lights",
        "LED Explosion-proof Lights",
        "LED Landscape Lamps",
        "LED Stage Lights",
        "LED Cabinet Lights",
        "LED Explosion-proof Lights",
      ],
      [
        "Home Appliance Parts",
        "LED Stage Lights",
        "LED Headlamps",
        "LED Aquarium Lights",
        "LED Professional Lighting",
        "LED Stage Lights",
        "LED Headlamps",
        "LED Aquarium Lights",
      ],
    ],
    Machine: [
      [
        "Energy Mineral Equipment",
        "LED Flood Lights",
        "LED Street Lights",
        "LED Outdoor Wall Lights",
        "LED Outdoor Lighting",
        "LED Flood Lights",
        "LED Street Lights",
        "LED Outdoor Wall Lights",
      ],
      [
        "Food Beverage Machinery",
        "Laser Lights",
        "Follow Spot Lights",
        "Moving Lights",
        "LED Fountain Lights",
        "Stage Lights",
        "Laser Lights",
        "Follow Spot Lights",
        "Moving Lights",
        "LED Fountain Lights",
      ],
      [
        "General Industrial Equipment",
        "LED Stage Lights",
        "LED Cabinet Lights",
        "LED Explosion-proof Lights",
        "LED Landscape Lamps",
        "LED Stage Lights",
        "LED Cabinet Lights",
        "LED Explosion-proof Lights",
      ],
      [
        "Home Product Making Machinery",
        "LED Stage Lights",
        "LED Headlamps",
        "LED Aquarium Lights",
        "LED Professional Lighting",
        "LED Stage Lights",
        "LED Headlamps",
        "LED Aquarium Lights",
      ],
    ],
    Light: [
      [
        "LED Outdoor Lighting",
        "LED Flood Lights",
        "LED Street Lights",
        "LED Outdoor Wall Lights",
        "LED Outdoor Lighting",
        "LED Flood Lights",
        "LED Street Lights",
        "LED Outdoor Wall Lights",
      ],
      [
        "Stage Lights",
        "Laser Lights",
        "Follow Spot Lights",
        "Moving Lights",
        "LED Fountain Lights",
        "Stage Lights",
        "Laser Lights",
        "Follow Spot Lights",
        "Moving Lights",
        "LED Fountain Lights",
      ],
      [
        "LED Landscape Lamps",
        "LED Stage Lights",
        "LED Cabinet Lights",
        "LED Explosion-proof Lights",
        "LED Landscape Lamps",
        "LED Stage Lights",
        "LED Cabinet Lights",
        "LED Explosion-proof Lights",
      ],
      [
        "LED Professional Lighting",
        "LED Stage Lights",
        "LED Headlamps",
        "LED Aquarium Lights",
        "LED Professional Lighting",
        "LED Stage Lights",
        "LED Headlamps",
        "LED Aquarium Lights",
      ],
    ],
    Auto: [
      [
        "Motorcycle Parts",
        "LED Flood Lights",
        "LED Street Lights",
        "LED Outdoor Wall Lights",
        "LED Outdoor Lighting",
        "LED Flood Lights",
        "LED Street Lights",
        "LED Outdoor Wall Lights",
      ],
      [
        "Valve Train",
        "Laser Lights",
        "Follow Spot Lights",
        "Moving Lights",
        "LED Fountain Lights",
        "Stage Lights",
        "Laser Lights",
        "Follow Spot Lights",
        "Moving Lights",
        "LED Fountain Lights",
      ],
      [
        "Vehicle Equipment",
        "LED Stage Lights",
        "LED Cabinet Lights",
        "LED Explosion-proof Lights",
        "LED Landscape Lamps",
        "LED Stage Lights",
        "LED Cabinet Lights",
        "LED Explosion-proof Lights",
      ],
      [
        "Air Intakes",
        "LED Stage Lights",
        "LED Headlamps",
        "LED Aquarium Lights",
        "LED Professional Lighting",
        "LED Stage Lights",
        "LED Headlamps",
        "LED Aquarium Lights",
      ],
    ],
  };
  console.log(CatList.SelectedTab)
  
  return (
    <div className="CategoryLists">
      <div className="CategoryLists-container">
        <div className="list-wrapper">
          {CatList[SelectedTab]?.map((list, i) => (
            <ul key={i}>
              {list.map((sub, p) => (
                <li key={p}>{sub}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
