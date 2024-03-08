import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin copy";
import { useEditCabin } from "./useEditCabin";
import suite from "./validationSuiteCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  // react query hooks
  const { isEditing, editCabin } = useEditCabin();
  const { isCreating, createCabin } = useCreateCabin();

  // react form hooks
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
    resolver: vestResolver(suite),
  });

  const { errors } = formState;
  // event handlers
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
    else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => reset(),
        }
      );
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={suite.get().getError("name")}>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow label="Max Capacity" error={suite.get().getError("maxCapacity")}>
        <Input id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow
        label="Regular Price"
        error={suite.get().getError("regularPrice")}
      >
        <Input id="regularPrice" {...register("regularPrice")} />
      </FormRow>

      <FormRow label="Discount" error={suite.get().getError("discount")}>
        <Input id="discount" defaultValue={0} {...register("discount")} />
      </FormRow>

      <FormRow
        label="Description for the Website"
        error={suite.get().getError("description")}
      >
        <Textarea id="description" {...register("description")} />
      </FormRow>

      <FormRow label="Image" error={suite.get().getError("image")}>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {isEditSession ? "Edit" : "Create"} Cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
