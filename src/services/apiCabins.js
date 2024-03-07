import supabase, { supabaseUrl } from "./supabase";
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

export async function createCabin(cabin) {
  const path = `${supabaseUrl}/storage/v1/object/public/cabin-images`;
  const imageName = `${cabin.image}`.replaceAll("/", "");
  const imagePath = `${path}/${imageName}`;
  console.log(imagePath);

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }])
    .select();

  if (error) throw new Error(`Error creating new cabin`);
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (storageError) {
    await deleteCabin(data.at(0).id);
    throw new Error("Faild to upload the image, so the cabin w as not created");
  }

  return data;
}
