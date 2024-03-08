import { create, enforce, test } from "vest";

const suite = create((cabin) => {
  //mode('edge');
  test("name", () => {
    enforce(cabin.name)
      .message("Name is required!")
      .isNotEmpty()
      .message("The name must be less than 255 characters")
      .shorterThan(255)
      .message("The name is too short")
      .longerThan(2);
  });

  test("maxCapacity", () => {
    enforce(cabin.maxCapacity)
      .message("The max capacity is required!")
      .isNotEmpty()
      .message("The max capacity must be a number")
      .isNumeric()
      .message("The max capacity can not be negative or zero")
      .greaterThan(0);
  });

  test("regularPrice", () => {
    enforce(cabin.regularPrice)
      .message("The price is required!")
      .isNotEmpty()
      .message("The price must be a number")
      .isNumeric()

      .message("The price can not be negative")
      .isPositive();
  });

  test("discount", () => {
    enforce(cabin.discount)
      .message("The discount must be a number")
      .isNumeric()

      .message("The discount can not be negative")
      .greaterThanOrEquals(0)

      .message("The discount is greater than the cabin's price")
      .lessThanOrEquals(cabin.regularPrice || 0);
  });
  test("description", () => {
    enforce(cabin.description)
      .message("The description is required!")
      .isNotEmpty();
  });

  test("image", () => {
    enforce(cabin.image).condition((value) => {
      return {
        pass: typeof value === "string" || value[0] instanceof File,
        message: "You must upload an image",
      };
    });
  });
});

export default suite;
