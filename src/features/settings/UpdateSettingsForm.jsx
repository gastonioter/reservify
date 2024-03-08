import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useFetchSettings } from "./useFetchSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useFetchSettings();

  const { isUpdating, updateSettings } = useUpdateSettings();

  const { register, formState } = useForm();
  const { errors } = formState;

  function handleUpdate(e, settingToUpdate) {
    const newValue = e.target.value;
    updateSettings({ [settingToUpdate]: newValue });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="minBookingLength"
          {...register("minBookingLength")}
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          {...register("maxBookingLength")}
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          {...register("maxGuestsPerBooking")}
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          {...register("breakfastPrice")}
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          defa
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
