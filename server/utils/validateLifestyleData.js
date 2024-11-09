const validateLifestyleData = (lifestyleData) => {
    const {
      transportationMiles,
      vehicleType,
      energyConsumption,
      dietType,
      flyingFrequency,
      recycling,
    } = lifestyleData;
  
    return (
      transportationMiles !== undefined &&
      vehicleType &&
      energyConsumption !== undefined &&
      dietType &&
      flyingFrequency !== undefined &&
      recycling !== undefined
    );
  };

module.exports = validateLifestyleData;