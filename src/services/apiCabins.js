import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select();
  if (error) throw new Error("Sorry, we could'n get the cabins");

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error(`Sorry, we could not delete the cabin`);

  return data;
}

export async function createEditCabin(cabin, id = null) {
  const hasImgPath = cabin.image.startsWith?.(supabaseUrl);

  // Create Path img
  const path = `${supabaseUrl}/storage/v1/object/public/cabin-images`;
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imageURL = hasImgPath ? cabin.image : `${path}/${imageName}`;

  let query = supabase.from("cabins");

  // CREATE
  if (!id) query = query.insert([{ ...cabin, image: imageURL }]);
  // EDIT
  else query = query.update({ ...cabin, image: imageURL }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) throw new Error(`Sorry, the cabin couldn't be created`);

  // Upload Image
  if (hasImgPath) data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (storageError) {
    await deleteCabin(data.id);
    throw new Error("Faild to upload the image, so the cabin was not created");
  }

  return data;
}
