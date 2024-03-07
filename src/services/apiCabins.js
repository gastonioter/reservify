import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select();
  if (error) throw new Error("Error fetching cabins");

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error(`Error deleting cabin ${id}`);

  return data;
}
