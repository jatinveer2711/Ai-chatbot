import { History} from "../model/History.model.js";


//save history

export const saveHistory = async (req, res) => {
  try {
    const userID= req.userID; // From middleware
    const { content, response } = req.body;

    const newHistory = new History({
      userID,
      content,
      response
    });

    const saved = await newHistory.save(); //this line used to store the data mongodb
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving history:", err);
    res.status(500).json({ error: "Failed to save history" });
    console.log(err);
  }
  
};
// Get history 

export const getHistoryByUser = async (req, res) => {
  try {
    const userID= req.userID
       const history = await History.find({ userID}).sort({ createdAt: -1 });//sort({createdAt: -1}) means jiska last prompt h usko history me sbse pehke dikhayo

    console.log(getHistoryByUser)

    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

