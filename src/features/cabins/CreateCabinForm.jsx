import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const queryClient = useQueryClient();
  const { errors } = formState;

  const { mutate: createCabin } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ newCabinData, id }) => {
      createEditCabin(newCabinData, id);
    },
    onError: handleError,
    onSuccess: handleSuccess,
  });

  function handleSuccess() {
    queryClient.invalidateQueries({
      queryKey: ["cabins"],
    });
    toast.success(
      `${
        isEditSession
          ? "Cabin succesfully edited!"
          : "New cabin succesfully created!"
      }`
    );
    reset();
  }
  function handleError(err) {
    toast.error(err.message);
  }

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      updateMutate({ newCabinData: { ...data, image }, id: editId });
    else {
      createCabin({ ...data, image });
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
            maxLength: {
              value: 255,
              message: "The name is too large",
            },
          })}
        />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "The capacity must be 1 at least",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 0,
              message: "The price must be grather than $0",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (discount) =>
              +discount <= +getValues().regularPrice ||
              "The discount must be less than price",
          })}
        />
      </FormRow>

      <FormRow label="Description">
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Image">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit" : "Create"} Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
