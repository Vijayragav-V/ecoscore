require("dotenv").config();
require("../config/db")();
const Action = require("../models/Action");
const mongoose = require("mongoose");

const actions = [
  {
    actionName: "Discussing Climate Change",
    description:
      "Raise awareness about climate change and its impact on the environment.",
    CO2Saved: 0,
  },
  {
    actionName: "Composting",
    description:
      "Turn organic waste into compost to reduce landfill waste and create nutrient-rich soil.",
    CO2Saved: 10,
  },
  {
    actionName: "Planting Trees",
    description: "Plant trees to absorb CO2 and provide oxygen.",
    CO2Saved: 20,
  },
  {
    actionName: "Reducing Meat Consumption",
    description:
      "Reduce meat consumption to lower greenhouse gas emissions from livestock.",
    CO2Saved: 15,
  },
  {
    actionName: "Using Public Transport",
    description:
      "Take public transportation instead of driving alone to reduce carbon emissions.",
    CO2Saved: 30,
  },
  {
    actionName: "Recycling",
    description:
      "Recycle paper, plastic, and glass to reduce waste and save energy.",
    CO2Saved: 5,
  },
  {
    actionName: "Using Energy-efficient Appliances",
    description:
      "Switch to energy-efficient appliances to reduce energy consumption.",
    CO2Saved: 25,
  },
  {
    actionName: "Switching to LED Bulbs",
    description:
      "Use LED light bulbs to reduce electricity use and lower emissions.",
    CO2Saved: 8,
  },
  {
    actionName: "Walking Instead of Driving",
    description:
      "Walk instead of driving for short distances to reduce emissions.",
    CO2Saved: 12,
  },
  {
    actionName: "Biking",
    description:
      "Cycle instead of driving to reduce carbon emissions and improve health.",
    CO2Saved: 18,
  },
  {
    actionName: "Using a Clothesline",
    description: "Air-dry your clothes to save electricity from dryers.",
    CO2Saved: 6,
  },
  {
    actionName: "Installing Solar Panels",
    description:
      "Install solar panels on your home to generate clean, renewable energy.",
    CO2Saved: 20,
  },
  {
    actionName: "Eating Local Foods",
    description:
      "Buy local food to reduce the carbon footprint of transportation.",
    CO2Saved: 7,
  },
  {
    actionName: "Using a Smart Thermostat",
    description:
      "Use a smart thermostat to optimize heating and cooling and reduce energy waste.",
    CO2Saved: 12,
  },
  {
    actionName: "Buying Energy-efficient Cars",
    description:
      "Buy hybrid or electric cars to reduce carbon emissions from transportation.",
    CO2Saved: 40,
  },
  {
    actionName: "Avoiding Single-use Plastics",
    description:
      "Reduce single-use plastic consumption by using reusable alternatives.",
    CO2Saved: 9,
  },
  {
    actionName: "Switching to Green Energy",
    description:
      "Switch to renewable energy providers to reduce dependence on fossil fuels.",
    CO2Saved: 35,
  },
  {
    actionName: "Reducing Water Usage",
    description:
      "Conserve water by fixing leaks, using water-efficient appliances, and limiting water waste.",
    CO2Saved: 5,
  },
  {
    actionName: "Using Rechargeable Batteries",
    description:
      "Switch to rechargeable batteries to reduce waste from single-use batteries.",
    CO2Saved: 3,
  },
  {
    actionName: "Using Cloth Bags",
    description: "Use reusable cloth bags to reduce plastic waste.",
    CO2Saved: 2,
  },
  {
    actionName: "Turning Off Unused Lights",
    description:
      "Turn off lights when not in use to reduce energy consumption.",
    CO2Saved: 4,
  },
  {
    actionName: "Upcycling",
    description:
      "Repurpose old items into new ones instead of throwing them away.",
    CO2Saved: 7,
  },
  {
    actionName: "Sharing Rides",
    description:
      "Carpool with others to reduce the number of vehicles on the road and cut emissions.",
    CO2Saved: 25,
  },
  {
    actionName: "Eating Plant-based Meals",
    description:
      "Incorporate more plant-based meals into your diet to reduce emissions from animal farming.",
    CO2Saved: 20,
  },
  {
    actionName: "Switching to Digital Bills",
    description: "Opt for electronic billing to reduce paper usage.",
    CO2Saved: 1,
  },
  {
    actionName: "Installing Low-flow Faucets",
    description:
      "Install low-flow faucets to reduce water usage and energy consumption for heating water.",
    CO2Saved: 4,
  },
  {
    actionName: "Using Natural Cleaning Products",
    description:
      "Switch to natural cleaning products to reduce the chemical impact on the environment.",
    CO2Saved: 2,
  },
  {
    actionName: "Avoiding Fast Fashion",
    description:
      "Buy fewer, higher-quality clothes that last longer instead of fast fashion items.",
    CO2Saved: 12,
  },
  {
    actionName: "Maintaining Your Vehicle",
    description:
      "Keep your car well-maintained to ensure it runs efficiently and uses less fuel.",
    CO2Saved: 10,
  },
  {
    actionName: "Planting a Garden",
    description:
      "Grow your own fruits and vegetables to reduce the carbon footprint of food production.",
    CO2Saved: 8,
  },
  {
    actionName: "Choosing Energy-efficient Windows",
    description:
      "Install energy-efficient windows to reduce heating and cooling needs.",
    CO2Saved: 20,
  },
  {
    actionName: "Donating Unused Items",
    description:
      "Donate unused items instead of throwing them away to reduce waste.",
    CO2Saved: 6,
  },
  {
    actionName: "Taking Shorter Showers",
    description:
      "Take shorter showers to conserve water and reduce energy used to heat it.",
    CO2Saved: 3,
  },
  {
    actionName: "Using a Water Filter",
    description:
      "Use a water filter instead of buying bottled water to reduce plastic waste.",
    CO2Saved: 5,
  },
  {
    actionName: "Growing Native Plants",
    description:
      "Plant native species in your garden to reduce the need for water and chemicals.",
    CO2Saved: 6,
  },
  {
    actionName: "Switching to E-books",
    description:
      "Switch from printed books to e-books to reduce paper consumption.",
    CO2Saved: 1,
  },
  {
    actionName: "Encouraging Carpooling",
    description:
      "Encourage others to carpool or use public transport to reduce emissions.",
    CO2Saved: 15,
  },
  {
    actionName: "Using a Water-saving Showerhead",
    description: "Install a low-flow showerhead to reduce water consumption.",
    CO2Saved: 4,
  },
  {
    actionName: "Using Eco-friendly Paint",
    description:
      "Choose non-toxic, eco-friendly paints to reduce harmful chemicals in the environment.",
    CO2Saved: 2,
  },
  {
    actionName: "Switching to Eco-friendly Diapers",
    description:
      "Use cloth diapers or biodegradable diapers instead of disposables.",
    CO2Saved: 7,
  },
  {
    actionName: "Reusing Containers",
    description: "Reuse glass jars and containers to reduce plastic waste.",
    CO2Saved: 3,
  },
  {
    actionName: "Using Paperless Office Practices",
    description:
      "Reduce paper waste by using digital documents and communication in the workplace.",
    CO2Saved: 10,
  },
  {
    actionName: "Commuting by Electric Bike",
    description:
      "Use an electric bike for commuting to reduce carbon emissions from cars.",
    CO2Saved: 12,
  },
  {
    actionName: "Switching to Digital Magazines",
    description:
      "Subscribe to digital magazines instead of printed versions to save paper.",
    CO2Saved: 2,
  },
  {
    actionName: "Using a Clothes Dryer Efficiently",
    description:
      "Use your clothes dryer efficiently, cleaning the lint filter regularly to save energy.",
    CO2Saved: 4,
  },
  {
    actionName: "Unplugging Devices",
    description:
      "Unplug electronics when not in use to save energy and reduce emissions.",
    CO2Saved: 5,
  },
  {
    actionName: "Support Eco-friendly Businesses",
    description:
      "Choose to support businesses with sustainable practices and products.",
    CO2Saved: 8,
  },
  {
    actionName: "Eliminating Junk Mail",
    description: "Opt-out of unwanted mail to reduce paper waste.",
    CO2Saved: 2,
  },
  {
    actionName: "Using Green Cleaning Services",
    description:
      "Choose eco-friendly cleaning services that use non-toxic, biodegradable products.",
    CO2Saved: 3,
  },
  {
    actionName: "Buying in Bulk",
    description: "Buy products in bulk to reduce packaging waste.",
    CO2Saved: 6,
  },
  {
    actionName: "Using Eco-friendly Insulation",
    description:
      "Insulate your home with eco-friendly materials to reduce energy consumption.",
    CO2Saved: 18,
  },
  {
    actionName: "Switching to Biodegradable Trash Bags",
    description: "Use biodegradable trash bags to reduce plastic waste.",
    CO2Saved: 5,
  },
  {
    actionName: "Growing a Tree for Every Purchase",
    description:
      "Commit to planting a tree for every significant purchase to offset carbon emissions.",
    CO2Saved: 10,
  },
  {
    actionName: "Reducing Food Waste",
    description:
      "Be mindful of food expiration dates and portion sizes to reduce waste.",
    CO2Saved: 8,
  },
  {
    actionName: "Using Digital Invitations",
    description:
      "Send digital invitations instead of paper ones for events to reduce paper waste.",
    CO2Saved: 2,
  },
  {
    actionName: "Choosing Secondhand Items",
    description:
      "Buy secondhand clothing, furniture, and electronics to reduce demand for new resources.",
    CO2Saved: 10,
  },
  {
    actionName: "Installing a Rainwater Collection System",
    description:
      "Collect rainwater to use for irrigation and reduce water usage.",
    CO2Saved: 6,
  },
  {
    actionName: "Switching to a Plant-based Diet",
    description:
      "Switch to a plant-based diet to minimize the environmental impact of food production.",
    CO2Saved: 30,
  },
  {
    actionName: "Eating Seasonal Foods",
    description:
      "Consume foods that are in season to reduce the carbon footprint associated with food transportation.",
    CO2Saved: 8,
  },
  {
    actionName: "Using an Electric Car",
    description:
      "Drive an electric car to reduce carbon emissions from conventional vehicles.",
    CO2Saved: 40,
  },
  {
    actionName: "Building with Sustainable Materials",
    description:
      "Use sustainable materials like bamboo, reclaimed wood, and low-VOC paints when building or renovating.",
    CO2Saved: 15,
  },
  {
    actionName: "Installing a Wind Turbine",
    description:
      "Install a small wind turbine on your property to generate clean, renewable energy.",
    CO2Saved: 50,
  },
  {
    actionName: "Composting Toilets",
    description:
      "Use composting toilets to reduce water and chemical waste while recycling organic waste.",
    CO2Saved: 12,
  },
  {
    actionName: "Using a Clothes Dryer Line",
    description:
      "Opt for an outdoor clothesline instead of a dryer to conserve energy and reduce emissions.",
    CO2Saved: 6,
  },
  {
    actionName: "Choosing Organic Products",
    description:
      "Buy organic products to support farming practices that are more sustainable and reduce chemical usage.",
    CO2Saved: 10,
  },
  {
    actionName: "Reducing Packaging Waste",
    description:
      "Buy products with minimal packaging or use your own reusable packaging.",
    CO2Saved: 7,
  },
  {
    actionName: "Supporting Renewable Energy Projects",
    description:
      "Invest in or support renewable energy projects to help reduce reliance on fossil fuels.",
    CO2Saved: 30,
  },
  {
    actionName: "Switching to a Low-carbon Diet",
    description:
      "Adopt a low-carbon diet by eating fewer processed foods and more locally grown produce.",
    CO2Saved: 18,
  },
  {
    actionName: "Using a Solar Water Heater",
    description:
      "Install a solar water heater to reduce the need for electricity or gas to heat water.",
    CO2Saved: 20,
  },
  {
    actionName: "Upgrading to an Energy-efficient HVAC System",
    description:
      "Install an energy-efficient HVAC system to lower energy consumption for heating and cooling.",
    CO2Saved: 25,
  },
  {
    actionName: "Choosing Eco-friendly Packaging",
    description:
      "Opt for eco-friendly packaging, such as biodegradable or recyclable options.",
    CO2Saved: 10,
  },
  {
    actionName: "Participating in Local Clean-ups",
    description:
      "Volunteer for local environmental clean-ups to reduce pollution and preserve local ecosystems.",
    CO2Saved: 5,
  },
  {
    actionName: "Planting a Vertical Garden",
    description:
      "Grow a vertical garden to produce your own food while saving space and improving air quality.",
    CO2Saved: 12,
  },
  {
    actionName: "Choosing Energy-efficient Lighting Systems",
    description:
      "Use smart lighting systems with energy-efficient LED bulbs to reduce electricity use.",
    CO2Saved: 10,
  },
  {
    actionName: "Avoiding Chemical Pesticides",
    description:
      "Use natural pest control methods instead of chemical pesticides to reduce environmental harm.",
    CO2Saved: 8,
  },
  {
    actionName: "Opting for Natural Fabrics",
    description:
      "Choose clothing made from natural fibers, such as cotton, hemp, or wool, instead of synthetic fabrics.",
    CO2Saved: 6,
  },
  {
    actionName: "Reducing Air Travel",
    description:
      "Limit air travel and choose alternative transportation methods like trains or buses for shorter trips.",
    CO2Saved: 40,
  },
  {
    actionName: "Buying Recycled Products",
    description:
      "Choose products made from recycled materials to support recycling initiatives and reduce the need for new raw materials.",
    CO2Saved: 10,
  },
  {
    actionName: "Using Biodegradable Cleaning Products",
    description:
      "Switch to biodegradable cleaning products that are less harmful to the environment.",
    CO2Saved: 5,
  },
  {
    actionName: "Supporting Local Artisans",
    description:
      "Support local artisans and businesses to reduce the environmental impact of mass production and transportation.",
    CO2Saved: 7,
  },
  {
    actionName: "Taking Public Transport to Work",
    description:
      "Commute using public transport to reduce the number of individual cars on the road.",
    CO2Saved: 15,
  },
  {
    actionName: "Investing in Green Bonds",
    description:
      "Invest in green bonds to support projects that focus on environmental sustainability.",
    CO2Saved: 20,
  },
  {
    actionName: "Switching to a Virtual Work Environment",
    description:
      "Promote working from home to reduce the carbon footprint of commuting.",
    CO2Saved: 12,
  },
  {
    actionName: "Growing Edible Plants Indoors",
    description:
      "Grow your own herbs and small vegetables indoors to reduce food transportation emissions.",
    CO2Saved: 5,
  },
  {
    actionName: "Supporting Forest Conservation",
    description:
      "Donate to or volunteer with organizations that focus on forest conservation to help offset CO2 emissions.",
    CO2Saved: 20,
  },
  {
    actionName: "Using a Water-efficient Dishwasher",
    description:
      "Use a water-efficient dishwasher to save water and reduce energy consumption during washing.",
    CO2Saved: 6,
  },
];

async function createActions() {
  try {
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const newAction = new Action({
        actionName: action.actionName,
        description: action.description,
        CO2Saved: action.CO2Saved,
      });
      await newAction.save();
    }
    console.log("Actions created successfully");
  } catch (error) {
    console.error("Error creating actions:", error);
  }
}

createActions().then(() => {
  console.log("Actions created successfully");
  mongoose.connection.close();
  process.exit(0);
});
