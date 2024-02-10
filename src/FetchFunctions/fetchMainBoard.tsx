import supabase from "../config/supabaseClient.js";

const fetchMainBoard = async (param) => {
  try {
    const { data } = await supabase
      .from("KanbanApp-Boards")
      .select()
      .eq("id", param);

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchMainBoard;
