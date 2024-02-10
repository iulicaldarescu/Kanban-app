import supabase from "../config/supabaseClient.js";

const fetchData = async () => {
  try {
    const { data } = await supabase.from("KanbanApp-Boards").select();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchData;
