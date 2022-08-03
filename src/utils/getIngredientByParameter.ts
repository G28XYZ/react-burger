import { Ingredient } from './types';

export const getIngredientByParameter = (
  parameterName: string,
  value: string,
  ingredients: Ingredient[]
): Ingredient | undefined => {
  const findIngredient = ingredients.find(
    (ingredient: Ingredient): boolean => ingredient[parameterName as keyof Ingredient] === value
  );
  return findIngredient;
};
